import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Button, Grid, Checkbox } from "@mui/material";
import Wrap from "../wrap";
import BoxArtistList from "./components/BoxArtistList";
import { list as listArtist } from "../../apis/public/models/artist/get_artist";
import config from "../../config";
import { useQuery } from "react-query";
import { TBoxArtistList } from "./components/BoxArtistList";
import MyLoader from "./Loading";
import SectionTitle from "../../components/SectionTitle";
const fakeData = [
  {
    name: "Mỹ Tâm",
    cover: "https://picsum.photos/500/500",
  },
  {
    name: "Vũ cát Tường",
    cover: "https://picsum.photos/500/501",
  },
];
export default function ArtistView() {
  const [artists, setArtists] = useState<TBoxArtistList[]>([]);
  const queryArtist = useQuery(
    ["listArtistPublic_0_1000_0"],
    async () => {
      return await listArtist({ depth: 0, limit: 1000, offset: 0 });
    },
    {
      onSuccess: (data) => {
        const artists_ = data?.results?.map((item: any) => {
          return {
            name: item.name,
            cover: `${config.IMAGE_URL}${item.cover}`,
            clickHrefTo: `/artist/${item.id}`,
          } as TBoxArtistList;
        });
        setArtists(artists_);
      },
    }
  );
  if (queryArtist.isLoading || queryArtist.isFetching) {
    return (
      <Wrap>
        <MyLoader />
      </Wrap>
    );
  }

  return (
    <Wrap>
      <SectionTitle>List of singers</SectionTitle>
      <BoxArtistList list={artists as TBoxArtistList[]} />
    </Wrap>
  );
}
