import React from "react";
import { useState, useEffect } from "react";
import { Grid, Box, Typography, Button, Stack, TextField, Link } from "@mui/material";
import { useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";

import config from "../../../config";
import Wrap from "../../wrap";
import { detail as detailAlbumPublic } from "../../../apis/public/extends/album/get_album";
import { updateStatus } from "../../../apis/private/nft/metadata/get_metadata";
import { pinMetadata } from "../../../apis/private/nft/metadata/get_metadata";
import MyLoader from "./Loading";
import { useMintNFT } from "../../../hooks/contracts/useMintNFT";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  id: string | string[] | undefined;
};
export default function MintView(props: Props) {
  const id = props.id;
  const [album, setAlbum] = useState<any | {}>({});
  const schema = yup.object().shape({
    to: yup.string().length(42).required(),
    amount: yup.number().min(1).max(10000).required(),
    maxSupply: yup.number().min(1).max(10000).required(),
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      to: "",
      amount: 1,
      maxSupply: 9999,
    },
  });
  const { mint, data, prepareError, isPrepareError, error, isError, isLoading, isSuccess, status, isOpenWallet } = useMintNFT();

  const onSubmit = async (dataMint: any) => {
    if (!id) return;
    const metadata = await pinMetadata(+id);
    const { uri } = metadata;
    mint(dataMint?.to, +id, dataMint?.amount, dataMint?.maxSupply, uri);
  };

  useEffect(() => {
    if (status == "success") {
      if (!id) return;
      updateStatus(+id);
    }
  }, [status]);
  const queryAlbum = useQuery(
    ["album_detail_public", id],
    async () => {
      if (!id) return;
      return await detailAlbumPublic(+id);
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
              src={`${config.IMAGE_URL}${album?.cover}`}
              alt="Image album"
              width={300}
              height={300}
              layout="responsive"
              style={{
                borderRadius: "20px",
                objectFit: "cover",
                aspectRatio: "1 / 1",
              }}
              placeholder="blur"
              blurDataURL="/assert/images/image-loading.gif"
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
                    placeholder="0x71CB05EE1b1F506fF321Da3dac38f25c0XXXXXXX"
                    onChange={onChange}
                    value={value}
                  />
                  <Typography color="red">{errors.to?.message as any}</Typography>
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
                  <TextField label="" variant="outlined" type={"number"} sx={{ width: "100%" }} placeholder="1" onChange={onChange} value={value} />
                  <Typography color="red">{errors.amount?.message as any}</Typography>
                </Box>
              )}
            />
            <Controller
              name={"maxSupply"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box sx={{ width: "100%", color: "text.primary", padding: "1rem 0" }}>
                  <Typography variant="h6">Max Supply</Typography>
                  <Typography variant="body1">
                    {album?.isMint ? "Max Supply not require" : "Is the recipient's Max Supply token mint when the minting occurs"}
                  </Typography>
                  <TextField
                    label=""
                    variant="outlined"
                    type={"number"}
                    sx={{ width: "100%" }}
                    placeholder="1"
                    onChange={onChange}
                    value={value}
                    disabled={album?.isMint}
                  />
                  <Typography color="red">{errors.maxSupply?.message as any}</Typography>
                </Box>
              )}
            />
            <Button
              onClick={() =>
                reset({
                  to: "",
                  amount: 1,
                  maxSupply: album.isMint ? 9999 : 1,
                })
              }
              variant={"outlined"}
            >
              Reset
            </Button>
            <Button disabled={isLoading || isSuccess || isOpenWallet} onClick={handleSubmit(onSubmit)}>
              {isLoading ? "Minting..." : isOpenWallet ? "Opening wallet" : "Mint"}
            </Button>

            {isSuccess && (
              <Box>
                <Typography color="text.primary">Successfully minted your NFT!</Typography>
                <Box>
                  <Link target="_blank" href={`${config.EXPLORER}/${data?.hash}`}>
                    Explorer scan
                  </Link>
                </Box>
              </Box>
            )}
            {(isPrepareError || isError) && <Typography color="red">Error: {(prepareError || error)?.message}</Typography>}
          </form>
        </Grid>
      </Grid>
    </Wrap>
  );
}
