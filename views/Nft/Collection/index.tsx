import React from "react";
import { useState, useEffect } from "react";
import { Grid, Box, Typography, Button, Stack, TextField } from "@mui/material";

import Image from "next/image";
import SectionTitle from "../../../components/SectionTitle";
import CarouselPlayAlbum, { TCarouselPlayAlbum } from "../components/CarouselPlayAlbum";
import Wrap from "../../wrap";
import config from "../../../config";
import { useEther } from "../../../contexts/useEther";
import { list as listNftPrivate } from "../../../apis/private/nft/collection/get_metadata";
import { useQuery } from "react-query";
type Props = {};
export default function Collection(props: Props) {
  const { provider, currentAccount } = useEther();
  const [nfts, setNfts] = useState<TCarouselPlayAlbum[]>([]);
  const queryAlbum = useQuery(
    "album_detail",
    async () => {
      if (!currentAccount) return;
      return await listNftPrivate(currentAccount);
    },
    {
      onSuccess: (data) => {
        const ownedNfts = data?.ownedNfts;
        const nfts_ = ownedNfts?.map((item: any) => {
          const tokenId = parseInt(item.id.tokenId, 16);
          return {
            balance: item.balance,
            name: item.metadata.name,
            cover: item.metadata.image,
            clickHrefTo: `/nft/album/${tokenId}`,
          } as TCarouselPlayAlbum;
        });
        setNfts(nfts_);
      },
    }
  );

  return (
    <Wrap>
      <Box>
        <SectionTitle>Album</SectionTitle>
        {queryAlbum.isSuccess ? <CarouselPlayAlbum list={nfts as TCarouselPlayAlbum[]} /> : <h1>Loading</h1>}
      </Box>
    </Wrap>
  );
}
