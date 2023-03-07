import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Button, Grid, Checkbox } from "@mui/material";
import Image from "next/image";
import Wrap from "../wrap";
import SectionTitle from "../../components/SectionTitle";
import { getSongByArtist } from "../../apis/public/extends/song/get_song";
import { getAlbumByArtist } from "../../apis/public/extends/album/get_album";
import MusicList from "../../components/MusicList";
import { TMusicList } from "../../components/MusicList/types";
import { useQuery } from "react-query";
import { detail as detailArtistPublic } from "../../apis/public/models/artist/get_artist";
import config from "../../config";
import CarouselPlayBasic, { TCarouselPlayBasic } from "./CarouselPlayBasic";
import { useMusicPlayer } from "../../contexts/useMusicPlayer";
import { PlayArrow, Pause } from "@mui/icons-material";
type TProps = {
  id: string | string[] | undefined;
};
type TTab = "OVERVIEW" | "ALBUM" | "SONG";
export default function ArtistView(props: TProps) {
  const id = props.id;
  const [artist, setArtist] = useState<any>({});
  const [songs, setSongs] = useState<any[]>();
  const [albums, setAlbums] = useState<any>({});
  const [tab, setTab] = useState<TTab>("OVERVIEW");
  const { setListMusicPlayer, play, pause, isPlay } = useMusicPlayer();

  const handelButtonPlayClick = () => {
    if (!songs) return;
    const listSongMusicPlay_ = songs.map((item: any) => {
      return {
        ...item,
        ...{ artist: [{ ...artist }] },
      };
    });
    // console.log(songs);
    setListMusicPlayer(listSongMusicPlay_);
    setTimeout(() => {
      play();
    }, 100);
  };
  const handelButtonPauseClick = () => pause();
  const queryArtist = useQuery(
    ["getArtistPrivate", id],
    async () => {
      if (!id) return;
      return await detailArtistPublic(+id, {});
    },
    {
      onSuccess: (data: any) => {
        setArtist(data);
        // console.log(data);
      },
    }
  );

  const queryAlbumArtist = useQuery(
    ["getAlbumByArtist", id],
    async () => {
      if (!id) return;
      return await getAlbumByArtist(+id);
    },
    {
      onSuccess: (data: any) => {
        if (!data) return;
        let albums = data.map((item: any, index: any) => {
          return {
            name: item.name,
            cover: `${config.IMAGE_URL}${item.cover}`,
            clickHrefTo: item.isPublic ? `/album/public/${item.id}` : `/album/private/${item.id}`,
          } as TCarouselPlayBasic;
        });
        setAlbums(albums);
      },
    }
  );

  const querySongArtist = useQuery(
    ["getSongByArtist", id, artist],
    async () => {
      if (!id) return;
      return await getSongByArtist(+id);
    },
    {
      onSuccess: (data: any) => {
        if (!data) return;
        if (!artist) return;
        const songs_ = data?.map((item: any, index: any) => {
          return {
            id: item.id,
            checkBoxStatus: false,
            name: item.name,
            cover: `${config.IMAGE_URL}${item.cover}`,
            path: `${config.MUSIC_URL}${item.path}`,
            artist: item?.artist && item.artist.map((item: any) => item.name).join("|"),
            album: item?.album?.name,
            time: item.length,
            favorite: true,
          };
        });

        setSongs(songs_);
      },
    }
  );
  return (
    <Wrap>
      <Box
        display="flex"
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          sx={{
            flex: 3,
            order: {
              xs: 2,
              md: 1,
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
            }}
          >
            {artist?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.primary",
            }}
          >
            {artist?.description}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            flex: 2,
            order: {
              xs: 1,
              md: 2,
            },
          }}
        >
          <Image
            src={`${config.IMAGE_URL}${artist?.cover}`}
            alt="Picture of the author"
            width={300}
            height={300}
            style={{
              borderRadius: "1000px",
              objectFit: "cover",
            }}
            placeholder="blur"
            blurDataURL="/assert/images/image-loading.gif"
          />
        </Box>
      </Box>
      <Box>
        <Button
          startIcon={isPlay ? <Pause /> : <PlayArrow />}
          onClick={isPlay ? handelButtonPauseClick : handelButtonPlayClick}
          sx={{ bgcolor: "#FFC61B", color: "text.primary", borderRadius: "25px", padding: "0.5rem 1rem" }}
        >
          PHÁT NHẠC
        </Button>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        sx={{
          bgcolor: "background.paper",
          borderRadius: "20px",
          padding: "0 1rem",
          margin: "3rem 0",
          width: "70%",
          marginLeft: "10%",
        }}
      >
        <Button
          onClick={() => {
            setTab("OVERVIEW");
          }}
          sx={{
            color: "text.primary",
          }}
        >
          TỔNG QUAN
        </Button>
        <Button
          onClick={() => {
            setTab("ALBUM");
          }}
          sx={{
            color: "text.primary",
          }}
        >
          ALBUM
        </Button>
        <Button
          onClick={() => {
            setTab("SONG");
          }}
          sx={{
            color: "text.primary",
          }}
        >
          BÀI HÁT
        </Button>
      </Box>
      {tab == "OVERVIEW" && (
        <Box>
          <Box>
            <SectionTitle>Danh sách album</SectionTitle>
            {albums && <CarouselPlayBasic list={albums as TCarouselPlayBasic[]} />}
          </Box>

          <Box>
            <SectionTitle>Danh sách bài hát</SectionTitle>
            {songs && <MusicList list={songs as TMusicList[]} />}
          </Box>
        </Box>
      )}

      {tab == "ALBUM" && (
        <Box>
          <SectionTitle>Danh sách album</SectionTitle>
          {albums && <CarouselPlayBasic list={albums as TCarouselPlayBasic[]} />}
        </Box>
      )}

      {tab == "SONG" && (
        <Box>
          <SectionTitle>Danh sách bài hát</SectionTitle>
          {songs && <MusicList list={songs as TMusicList[]} />}
        </Box>
      )}
    </Wrap>
  );
}
