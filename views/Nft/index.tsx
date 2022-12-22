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
import MyLoader from "./Loading";

export default function NftView() {
  const [albums, setAlbums] = useState<TCarouselPlayAlbum[]>();
  const queryAlbum = useQuery(
    ["listAlbumPrivate"],
    async () => {
      return await listAlbumPrivate({ depth: 0, limit: 1000, offset: 0 });
    },
    {
      onSuccess: (data: any) => {
        let albums = data.results.map((item: any) => {
          console.log(item);
          return {
            name: item.name,
            cover: `${config.BASE_MEDIA}${item.cover}`,
            isMint: item.isMint,
            clickHrefTo: `/nft/mint/${item.id}`,
          } as TCarouselPlayAlbum;
        });
        setAlbums(albums);
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
      <Box>
        <SectionTitle>Album</SectionTitle>
        {<CarouselPlayAlbum list={albums as TCarouselPlayAlbum[]} />}
      </Box>
    </Wrap>
  );
}
