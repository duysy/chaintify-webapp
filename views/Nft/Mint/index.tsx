import React from "react";
import { useState, useEffect } from "react";
import { Grid, Box, Typography, Button, Stack, TextField } from "@mui/material";

import Image from "next/image";

import Wrap from "../../wrap";
import { detail as detailAlbumPublic } from "../../../apis/public/extends/album/get_album";
import { TMusicList } from "../../../components/MusicList/types";
import config from "../../../config";
type Props = {
  id: string | string[] | undefined;
};
export default function Mint(props: Props) {
  const id = props.id;
  const [album, setAlbum] = useState<any | {}>({});
  const [songs, setSongs] = useState<TMusicList[] | null>(null);

  useEffect(() => {
    const initAlbum = async () => {
      if (!id) return;
      const album_ = await detailAlbumPublic(+id, { depth: 2 });
      console.log(album_);
      setAlbum(album_);
    };
    initAlbum();
  }, [id]);
  useEffect(() => {
    const initSongs = async () => {
      if (!album || Object.keys(album).length === 0) return;
      let songs_: TMusicList[] = album.song.map((item: any, index: any) => {
        return {
          id: item.id,
          name: item.name,
          cover: `${config.baseMedia}${item.cover}`,
          artist: item?.artist && item.artist.map((item: any) => item.name).join("|"),
          album: album?.name,
          time: item.length,
          favorite: true,
          checkBoxStatus: false,
        } as TMusicList;
      });

      console.log(songs_);
      setSongs(songs_);
    };
    initSongs();
  }, [album]);
  return (
    <Wrap>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginTop="5rem">
            <Image
              src={`${config.baseMedia}${album.cover}`}
              alt="Image album"
              width={300}
              height={300}
              style={{
                borderRadius: "20px",
                objectFit: "cover",
              }}
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
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-around" marginTop="3rem" height={"90%"}>
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
              />
            </Box>
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
              />
            </Box>
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
              />
            </Box>
            <Stack direction={"row"}>
              <Button>Cancel</Button>
              <Button>Mint</Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Wrap>
  );
}
