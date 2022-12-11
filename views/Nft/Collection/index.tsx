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
import MyLoader from "./Loading";
type Props = {};
export default function Collection(props: Props) {
  const { provider, currentAccount } = useEther();
  const [nfts, setNfts] = useState<TCarouselPlayAlbum[]>([]);
  const queryAlbum = useQuery(
    ["listNftPrivate"],
    async () => {
      if (!currentAccount) return;
      return await listNftPrivate(currentAccount);
    },
    {
      refetchInterval: 30000,
      onSuccess: (data) => {
        const ownedNfts = data?.ownedNfts;
        const nfts_ = ownedNfts?.map((item: any) => {
          const tokenId = parseInt(item.id.tokenId, 16);
          return {
            balance: item.balance,
            name: item.metadata.name,
            cover: item.metadata.image,
            clickHrefTo: `/nft/detailNFT/${tokenId}`,
          } as TCarouselPlayAlbum;
        });
        setNfts(nfts_);
      },
    }
  );
  if (queryAlbum.isFetching||queryAlbum.isLoading)
    return (
      <Wrap>
        <MyLoader />
      </Wrap>
    );

  return (
    <Wrap>
      <Box>
        <SectionTitle>Album</SectionTitle>
        {<CarouselPlayAlbum list={nfts as TCarouselPlayAlbum[]} />}
      </Box>
    </Wrap>
  );
}
