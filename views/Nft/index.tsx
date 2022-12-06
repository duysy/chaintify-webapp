import React from "react";
import { useState, useEffect } from "react";
import { Box, Stack, Button } from "@mui/material";
import Wrap from "../wrap";
import { useEther } from "../../contexts/useEther";
import { useQuery } from "react-query";
import { list as listAlbumPrivate } from "../../apis/private/models/album/get_album";
import SectionTitle from "../../components/SectionTitle";
import CarouselPlayBasic, { TCarouselPlayBasic } from "../../components/CarouselPlayBasic";
import config from "../../config";

export default function NftView() {
  const { onClickConnect, onClickDisconnect, currentAccount } = useEther();
  const [albums, setAlbums] = useState<TCarouselPlayBasic[]>();
  const queryAlbum = useQuery(
    ["listAlbumPrivate_0_5_0"],
    async () => {
      return await listAlbumPrivate({ depth: 0, limit: 5, offset: 0 });
    },
    {
      onSuccess: (data: any) => {
        let albums = data.results.map((item: any, index: any) => {
          return {
            name: item.name,
            cover: `${config.baseMedia}${item.cover}`,
            clickHrefTo: `/nft/mint/${item.id}`,
          } as TCarouselPlayBasic;
        });
        setAlbums(albums);
      },
    }
  );
  return (
    <Wrap>
      <Stack>
        {currentAccount}
        <Button onClick={onClickDisconnect}>DisConnect wallet</Button>
      </Stack>
      <Box>
        <SectionTitle>Album</SectionTitle>
        {queryAlbum.isSuccess ? <CarouselPlayBasic list={albums as TCarouselPlayBasic[]} /> : <h1>Loading</h1>}
      </Box>
    </Wrap>
  );
}
