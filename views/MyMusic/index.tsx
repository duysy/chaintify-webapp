import React from "react";
import { useState, useEffect } from "react";
import config from "../../config";

import { Box, Typography, Stack, Grid, Checkbox, Button } from "@mui/material";
import Image from "next/image";

import Wrap from "../wrap";
import SectionTitle from "../../components/SectionTitle";
import CarouselBasic from "../../components/CarouselPlayBasic";
import MusicList from "../../components/MusicList";
import LikeSongTab from "./components/LikeSongTab";
import UploadTab from "./components/UploadTab";
import CarouselBoxCircle from "./components/CarouselBoxCircle";
import CarouselPlayAlbum, { TCarouselPlayAlbum } from "./components/CarouselPlayAlbum";
import { TMusicList } from "../../components/MusicList/types";

import { list as listAlbumPrivate } from "../../apis/private/models/album/get_album";
import { list as listPlaylistPrivate } from "../../apis/private/models/playlist/get_playlist";
import { list as listSongPrivate } from "../../apis/private/models/song/get_song";
import { useQuery } from "react-query";

import { TCarouselBoxCircle } from "./components/CarouselBoxCircle";
import MyLoader from "./Loading";

type TTabView = "likeSongTab" | "UploadTab";

export default function MyMusicView() {
  const [albums, setAlbums] = useState<TCarouselPlayAlbum[]>();
  const [playlists, setPlaylists] = useState<TCarouselBoxCircle[]>();
  const [songs, setSongs] = useState<TMusicList[]>();

  const [tab, setTab] = useState<TTabView>("likeSongTab");
  const queryPlayList = useQuery(
    ["listPlaylistPrivate_0_5_0"],
    async () => {
      return await listPlaylistPrivate({ depth: 0, limit: 5, offset: 0 });
    },
    {
      onSuccess: (data: any) => {
        let playlists = data.results.map((item: any, index: any) => {
          return {
            name: item.name,
            cover: `${config.baseMedia}${item.cover}`,
            clickHrefTo: `/playlist/${item.id}`,
          } as TCarouselBoxCircle;
        });
        setPlaylists(playlists);
      },
    }
  );
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
            clickHrefTo: `/album/${item.id}`,
          } as TCarouselPlayAlbum;
        });
        setAlbums(albums);
      },
    }
  );
  const querySong = useQuery(
    ["listSong_1_1000_0"],
    async () => {
      return await listSongPrivate({ depth: 1, limit: 1000, offset: 0 });
    },
    {
      onSuccess: (data: any) => {
        let songs = data.results.map((item: any, index: any) => {
          return {
            id: item.id,
            cover: `${config.baseMedia}${item.cover}`,
            name: item.name,
            artist: item?.artist && item.artist.map((item: any) => item.name).join("|"),
            album: item.album?.name,
            time: item.length,
            favorite: true,
            checkBoxStatus: false,
          } as TMusicList;
        });
        setSongs(songs);
      },
    }
  );

  if (queryPlayList.isFetching || queryAlbum.isFetching || querySong.isFetching) {
    return (
      <Wrap>
        <MyLoader />
      </Wrap>
    );
  }

  const LikeSongTabWrap = () => {
    return <MusicList list={songs as TMusicList[]} />;
  };
  return (
    <Wrap>
      <Box>
        <Typography
          variant="h3"
          sx={{
            color: "text.primary",
          }}
        >
          Thư viện
        </Typography>
      </Box>
      <Box>
        <SectionTitle>Playlist</SectionTitle>
        {queryPlayList.isSuccess ? <CarouselBoxCircle list={playlists as TCarouselBoxCircle[]} /> : <h1>Loading</h1>}
      </Box>
      <Box>
        <SectionTitle>Album</SectionTitle>
        {queryAlbum.isSuccess ? <CarouselPlayAlbum list={albums as TCarouselPlayAlbum[]} /> : <h1>Loading</h1>}
      </Box>
      <Box>
        <SectionTitle>Bài hát</SectionTitle>
        <Box
          sx={{
            paddingBottom: "3rem",
          }}
        >
          <Button
            sx={
              tab == "likeSongTab"
                ? {
                    borderRadius: "100px",
                    padding: "0.3rem 2rem",
                    background: "#E8AC24",
                    color: "text.primary",
                  }
                : {
                    borderRadius: "100px",
                    padding: "0.3rem 2rem",
                  }
            }
            onClick={() => {
              setTab("likeSongTab");
            }}
          >
            Yêu thích
          </Button>
          <Button
            onClick={() => {
              setTab("uploadTab" as TTabView);
            }}
            sx={
              tab == ("uploadTab" as TTabView)
                ? {
                    borderRadius: "100px",
                    padding: "0.3rem 2rem",
                    background: "#E8AC24",
                    color: "text.primary",
                  }
                : {
                    borderRadius: "100px",
                    padding: "0.3rem 2rem",
                  }
            }
          >
            Đã tải lên
          </Button>
        </Box>
        {tab == ("likeSongTab" as TTabView) && <LikeSongTabWrap />}
        {tab == ("uploadTab" as TTabView) && <UploadTab />}
      </Box>
    </Wrap>
  );
}
