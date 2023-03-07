import React from "react";
import { useState, useEffect } from "react";
import config from "../../config";

import { Box, Typography, Stack, Grid, Checkbox, Button } from "@mui/material";

import Wrap from "../wrap";
import SectionTitle from "../../components/SectionTitle";
import MusicList from "../../components/MusicList";
import CarouselBoxCircle from "./components/CarouselBoxCircle";
import CarouselPlayAlbum, { TCarouselPlayAlbum } from "./components/CarouselPlayAlbum";
import { TCarouselBoxCircle } from "./components/CarouselBoxCircle";

import { TMusicList } from "../../components/MusicList/types";

import { list as listAlbumPrivate } from "../../apis/private/models/album/get_album";
import { list as listPlaylistPrivate } from "../../apis/private/models/playlist/get_playlist";
import { list as listSongPrivate } from "../../apis/private/models/song/get_song";
import { useQuery } from "react-query";

import MyLoader from "./Loading";
import { FilterDrama } from "@mui/icons-material";
import { useAuth } from "../../contexts/useAuth";
type TTabView = "UpLoadTab" | "LikeSongTab";

export default function MyMusicView() {
  const { isLogin } = useAuth();

  const [albums, setAlbums] = useState<TCarouselPlayAlbum[]>();
  const [playlists, setPlaylists] = useState<TCarouselBoxCircle[]>();
  const [songs, setSongs] = useState<TMusicList[]>();
  const [tab, setTab] = useState<TTabView>("UpLoadTab");
  const queryPlayList = useQuery(
    ["listPlaylistPrivate_0_5_0"],
    async () => {
      return await listPlaylistPrivate({ depth: 0, limit: 5, offset: 0 });
    },
    {
      onSuccess: (data: any) => {
        let playlists = data.results.map((item: any, index: any) => {
          return {
            name: item?.name,
            cover: `${config.IMAGE_URL}${item?.cover}`,
            clickHrefTo: `/playlist/${item?.id}`,
          } as TCarouselBoxCircle;
        });
        setPlaylists(playlists);
      },
      enabled: !!isLogin,
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
            id: +item?.id,
            name: item?.name,
            cover: `${config.IMAGE_URL}${item?.cover}`,
            clickHrefTo: item.isPublic ? `/album/public/${item.id}` : `/album/private/${item.id}`,
          } as TCarouselPlayAlbum;
        });
        setAlbums(albums);
      },
      enabled: !!isLogin,
    }
  );
  const querySong = useQuery(
    ["listSong_1_1000_0"],
    async () => {
      return await listSongPrivate({ depth: 1, limit: 1000, offset: 0 });
    },
    {
      onSuccess: (data: any) => {
        let songs = data.results.map((item: any) => {
          return {
            id: item.id,
            cover: `${config.IMAGE_URL}${item.cover}`,
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
      enabled: !!isLogin,
    }
  );

  if (queryPlayList.isFetching || queryAlbum.isFetching || querySong.isFetching) {
    return (
      <Wrap>
        <MyLoader />
      </Wrap>
    );
  }
  const UpLoadTab = () => {
    return <MusicList list={songs as TMusicList[]} />;
  };

  const LikeSongTabWrap = () => {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <FilterDrama
          sx={{
            fontSize: "20rem",
            color: "text.primary",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
          }}
        >
          Bạn chưa có bào nào trong thư viện
        </Typography>
      </Box>
    );
  };

  return (
    <Wrap>
      <Box>
        <Typography
          variant="h3"
          sx={{
            color: "text.primary",
            fontWeight: "1000",
          }}
        >
          Thư viện
        </Typography>
      </Box>
      <Box>
        <SectionTitle>Playlist</SectionTitle>
        {queryPlayList.isSuccess ? (
          <CarouselBoxCircle list={playlists as TCarouselBoxCircle[]} />
        ) : (
          <Typography color="text.primary">Playlist not found</Typography>
        )}
      </Box>
      <Box>
        <SectionTitle>Album</SectionTitle>
        {queryAlbum.isSuccess ? (
          <CarouselPlayAlbum list={albums as TCarouselPlayAlbum[]} />
        ) : (
          <Typography color="text.primary">Album not found</Typography>
        )}
      </Box>
      <Box>
        <SectionTitle>Bài hát</SectionTitle>
        <Box
          sx={{
            paddingBottom: "3rem",
          }}
        >
          <Button
            onClick={() => {
              setTab("UpLoadTab" as TTabView);
            }}
            sx={
              tab === ("UpLoadTab" as TTabView)
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
          <Button
            sx={
              tab === "LikeSongTab"
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
              setTab("LikeSongTab");
            }}
          >
            Yêu thích
          </Button>
        </Box>
        {tab == ("LikeSongTab" as TTabView) && <LikeSongTabWrap />}
        {tab == ("UpLoadTab" as TTabView) && <UpLoadTab />}
      </Box>
    </Wrap>
  );
}
