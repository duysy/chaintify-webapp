import config from "../../config";
import { useState } from "react";
import { Grid, Stack, Container, Box, Typography } from "@mui/material";
import Image from "next/image";
import Slide from "../../components/Slide";
import Wrap from "../wrap";
import SectionTitle from "../../components/SectionTitle";
import CarouselBasic from "../../components/CarouselPlayBasic";
import { list as listAlbumPublic } from "../../apis/public/models/album/get_album";
import { list as listSongPublic } from "../../apis/public/models/song/get_song";
import { useQuery } from "react-query";
import { TCarouselPlayBasic } from "../../components/CarouselPlayBasic";
import NewBoxList from "./components/NewListBox";
import { TNewBoxList } from "./components/NewListBox";

export default function HomeView() {
  const [albums, setAlbums] = useState<TCarouselPlayBasic[]>([]);
  const [songs, setSongs] = useState<TNewBoxList[]>([]);
  const queryAlbum = useQuery(
    ["listAlbumPublic_0_5_0"],
    async () => {
      return await listAlbumPublic({ depth: 0, limit: 5, offset: 0 });
    },
    {
      onSuccess: (data) => {
        let albums = data.results.map((item: any, index: any) => {
          return {
            name: item.name,
            cover: `${config.IMAGE_URL}${item.cover}`,
            clickHrefTo: `/album/${item.id}`,
          } as TCarouselPlayBasic;
        });
        setAlbums(albums);
      },
    }
  );
  const querySong = useQuery(
    ["listSongPublic_1_6_0"],
    async () => {
      return await listSongPublic({ depth: 1, limit: 6, offset: 0 });
    },
    {
      onSuccess: (data) => {
        let songs = data.results.map((item: any, index: any) => {
          const dateNow = Date.now();
          const updated_at = new Date(item.updated_at).getTime();
          let datetime = +Math.abs(dateNow - updated_at).toFixed(0);
          datetime = datetime / 1000;
          // console.log(datetime);
          let updated_at_text = "";
          if (datetime < 60) {
            updated_at_text = `${datetime.toFixed(0)} giây trước`;
          } else if (datetime > 60 && datetime < 3600) {
            datetime = datetime / 60;
            updated_at_text = `${datetime.toFixed(0)} phút trước`;
          } else if (datetime > 3600 && datetime < 86400) {
            datetime = datetime / 3600;
            updated_at_text = `${datetime.toFixed(0)} giờ trước`;
          } else if (datetime > 86400) {
            datetime = datetime / 86400;
            updated_at_text = `${datetime.toFixed(0)} ngày trước`;
          }
          return {
            id: item.id,
            cover: `${config.IMAGE_URL}${item.cover}`,
            name: item.name,
            artist: item?.artist && item.artist.map((item: any) => item.name).join("|"),
            updated_at: updated_at_text,
          } as TNewBoxList;
        });
        setSongs(songs);
      },
    }
  );
  return (
    <Wrap>
      <Slide />
      <Box>
        <SectionTitle>Gần đây</SectionTitle>
        <CarouselBasic list={albums} />
      </Box>
      <Box>
        <SectionTitle>Mới phát hành</SectionTitle>
        <NewBoxList list={songs} />
      </Box>
      <Box>
        <SectionTitle>Album</SectionTitle>
        <CarouselBasic list={albums} />
      </Box>
    </Wrap>
  );
}
