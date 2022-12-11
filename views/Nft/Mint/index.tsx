import React from "react";
import { useState, useEffect } from "react";
import { Grid, Box, Typography, Button, Stack, TextField } from "@mui/material";
import { useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";

import config from "../../../config";
import Wrap from "../../wrap";
import { detail as detailAlbumPublic } from "../../../apis/public/extends/album/get_album";
import { updateStatus } from "../../../apis/private/nft/metadata/get_metadata";
import { useEther } from "../../../contexts/useEther";
import { ethers } from "ethers";
import { pinMetadata } from "../../../apis/private/nft/metadata/get_metadata";
import MyLoader from "./Loading";
type Props = {
  id: string | string[] | undefined;
};
export default function Mint(props: Props) {
  const id = props.id;
  const [album, setAlbum] = useState<any | {}>({});
  const { provider } = useEther();
  const { handleSubmit, reset, control } = useForm();

  const onSubmit = async (dataMint: any) => {
    if (!id) return;
    const metadata = await pinMetadata(+id);
    const { uri } = metadata;
    const address = config.chaintifyContract;
    const abi = ["function mint(address to_, uint256 id_, uint256 amount_, uint256 maxSupply_, string uri_, bytes data_)"];

    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, abi, signer);
      const tx = await contract.functions.mint(dataMint?.to, +id, dataMint?.amount, dataMint?.maxSupply, uri, "0x");
      const receipt = await tx.wait();
      // console.log("receipt", receipt);
      await updateStatus(+id);
      alert("SUCCESS");
    } catch (error: any) {
      console.log({ error });
    }
  };
  const queryAlbum = useQuery(
    ["album_detail_public", id],
    async () => {
      if (!id) return;
      return await detailAlbumPublic(+id, {});
    },
    {
      onSuccess: (data) => {
        setAlbum(data);
      },
    }
  );
  if (queryAlbum.isFetching)
    return (
      <Wrap>
        <MyLoader />
      </Wrap>
    );

  return (
    <Wrap>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginTop="5rem">
            <Image
              src={`${config.baseMedia}${album?.cover}`}
              alt="Image album"
              width={300}
              height={300}
              layout="responsive"
              style={{
                borderRadius: "20px",
                objectFit: "cover",
                aspectRatio: "1 / 1",
              }}
              // loading="lazy"
            />
            <Typography
              variant="h5"
              sx={{
                color: "text.primary",
                padding: "2rem 0",
              }}
            >
              {album?.name ? album.name : "Không có tên bài hát"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.primary",
              }}
            >
              {album?.description ? album.description : "Không có description"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <form>
            <Controller
              name={"to"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box sx={{ width: "100%", color: "text.primary", padding: "1rem 0" }}>
                  <Typography variant="h6">To Address</Typography>
                  <Typography variant="body1">Is the recipient's wallet address when the minting occurs</Typography>
                  <TextField
                    InputProps={{ inputProps: { min: 1, max: 1000000 } }}
                    label=""
                    variant="outlined"
                    type={"text"}
                    sx={{ width: "100%" }}
                    placeholder="0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1"
                    onChange={onChange}
                    value={value}
                  />
                </Box>
              )}
            />
            <Controller
              name={"amount"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box sx={{ width: "100%", color: "text.primary", padding: "1rem 0" }}>
                  <Typography variant="h6">Amount</Typography>
                  <Typography variant="body1">Is the recipient's amount token mint when the minting occurs</Typography>
                  <TextField
                    InputProps={{ inputProps: { min: 1, max: 1000000 } }}
                    label=""
                    variant="outlined"
                    type={"number"}
                    sx={{ width: "100%" }}
                    placeholder="1"
                    onChange={onChange}
                    value={value}
                  />
                </Box>
              )}
            />
            <Controller
              name={"maxSupply"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box sx={{ width: "100%", color: "text.primary", padding: "1rem 0" }}>
                  <Typography variant="h6">Max Supply</Typography>
                  <Typography variant="body1">Is the recipient's Max Supply token mint when the minting occurs</Typography>
                  <TextField
                    InputProps={{ inputProps: { min: 1, max: 1000000 } }}
                    label=""
                    variant="outlined"
                    type={"number"}
                    sx={{ width: "100%" }}
                    placeholder="1"
                    onChange={onChange}
                    value={value}
                  />
                </Box>
              )}
            />
            <Button
              onClick={() =>
                reset({
                  to: "",
                  amount: "",
                  maxSupply: "",
                })
              }
              variant={"outlined"}
            >
              Reset
            </Button>

            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          </form>
        </Grid>
      </Grid>
    </Wrap>
  );
}
