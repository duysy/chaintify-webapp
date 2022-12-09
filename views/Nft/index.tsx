import React from "react";
import { useState, useEffect } from "react";
import { Box, Stack, Button } from "@mui/material";
import Wrap from "../wrap";
import { useEther } from "../../contexts/useEther";
import { useQuery } from "react-query";
import { list as listAlbumPrivate } from "../../apis/private/models/album/get_album";
import SectionTitle from "../../components/SectionTitle";
import CarouselPlayAlbum, { TCarouselPlayAlbum } from "./components/CarouselPlayAlbum";
import config from "../../config";
import { Typography } from "@material-ui/core";

export default function NftView() {
  const { onClickConnect, onClickDisconnect, currentAccount, balance } = useEther();
  const [albums, setAlbums] = useState<TCarouselPlayAlbum[]>();
  const queryAlbum = useQuery(
    ["listAlbumPrivate_0_5_0"],
    async () => {
      return await listAlbumPrivate({ depth: 0, limit: 5, offset: 0 });
    },
    {
      onSuccess: (data: any) => {
        let albums = data.results.map((item: any) => {
          return {
            name: item.name,
            cover: `${config.baseMedia}${item.cover}`,
            isMint: item.isMint,
            clickHrefTo: `/nft/mint/${item.id}`,
          } as TCarouselPlayAlbum;
        });
        setAlbums(albums);
      },
    }
  );
  return (
    <Wrap>
      <Stack>
        <Typography>
          {currentAccount} : {balance}
        </Typography>
        <Button onClick={onClickDisconnect}>DisConnect wallet</Button>
      </Stack>
      <Box>
        <SectionTitle>Album</SectionTitle>
        {queryAlbum.isSuccess ? <CarouselPlayAlbum list={albums as TCarouselPlayAlbum[]} /> : <h1>Loading</h1>}
      </Box>
    </Wrap>
  );
}
