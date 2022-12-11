import React from "react";
import { useState, useEffect } from "react";
import { Grid, Box, Checkbox, Typography, Button, Stack } from "@mui/material";
import { Favorite, MoreVert, PlayCircle, PauseCircle } from "@mui/icons-material";

import Image from "next/image";

import Wrap from "../wrap";
import MusicList from "../../components/MusicList";
import { detail as detailAlbumPublic } from "../../apis/public/extends/album/get_album";
import { useMusicPlayer } from "../../contexts/useMusicPlayer";
import { TMusicList } from "../../components/MusicList/types";
import { useQuery } from "react-query";
import config from "../../config";
import MyLoader from "./Loading";
type Props = {
  id: string | string[] | undefined;
};
export default function AlbumView(props: Props) {
  const id = props.id;
  const { setListMusicPlayer, play, pause, isPlay } = useMusicPlayer();
  const [album, setAlbum] = useState<any | {}>({});
  const [songs, setSongs] = useState<TMusicList[] | null>(null);
  const handelButtonPlayClick = () => {
    const listSongMusicPlay_ = album.song.map((item: any) => {
      return {
        ...item,
        ...{ path: `${config.baseMedia}${item.path}` },
      };
    });
    setListMusicPlayer(listSongMusicPlay_);
    play();
    // console.log("play");
  };
  const handelButtonPauseClick = () => {
    pause();
    // console.log("pause");
  };
  const queryAlbum = useQuery(
    ["detailAlbumPublic", id],
    async () => {
      if (!id) return;
      return await detailAlbumPublic(+id, { depth: 2 });
    },
    {
      onSuccess: (data) => {
        setAlbum(data);
      },
    }
  );
  useEffect(() => {
    const initSongs = async () => {
      if (!album || Object.keys(album).length === 0) return;
      let songs_: TMusicList[] = album.song.map((item: any, index: any) => {
        return {
          id: item.id,
          name: item.name,
          cover: `${config.baseMedia}${item.cover}`,
          artist: item?.artist && item.artist.map((item: any) => item.name).join("|"),
          album: album?.name,
          time: item.length,
          favorite: true,
          checkBoxStatus: false,
        } as TMusicList;
      });

      // console.log(songs_);
      setSongs(songs_);
    };
    initSongs();
  }, [album]);
  if (queryAlbum.isRefetching)
    return (
      <Wrap>
        <MyLoader />
      </Wrap>
    );
  return (
    <Wrap>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginTop="5rem">
            <Image
              src={`${config.baseMedia}${album?.cover}`}
              alt="Image album"
              width={300}
              height={300}
              layout="responsive"
              style={{
                borderRadius: "20px",
                objectFit: "cover",
                aspectRatio: "1 / 1",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: "text.primary",
              }}
            >
              {album?.name ? album.name : "Không có tên bài hát"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.primary",
              }}
            >
              {album?.description ? album.description : "Không có description"}
            </Typography>
            <Box>
              {isPlay ? (
                <Button
                  startIcon={<PauseCircle fontSize="large" />}
                  sx={{
                    bgcolor: "#E8AC24",
                    borderRadius: "20px",
                    color: "text.primary",
                    padding: "0.5rem 0",
                    margin: "1.5rem 0",
                    width: "8rem",
                  }}
                  onClick={handelButtonPauseClick}
                >
                  Tạm dừng
                </Button>
              ) : (
                <Button
                  startIcon={<PlayCircle fontSize="large" />}
                  sx={{
                    bgcolor: "#E8AC24",
                    borderRadius: "20px",
                    color: "text.primary",
                    padding: "0.5rem 0",
                    margin: "1.5rem 0",
                    width: "8rem",
                  }}
                  onClick={handelButtonPlayClick}
                >
                  Play
                </Button>
              )}
            </Box>
            <Stack direction="row" spacing={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  padding: "0.5rem",
                  borderRadius: "10000px",
                  bgcolor: "background.paper",
                }}
              >
                <Favorite
                  sx={{
                    color: "text.primary",
                  }}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  padding: "0.5rem",
                  borderRadius: "10000px",
                  bgcolor: "background.paper",
                }}
              >
                <MoreVert
                  sx={{
                    color: "text.primary",
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.primary",
              padding: "1rem 0",
            }}
          >
            {album?.isPublic ? "Album này được public, mọi người có thể truy cập" : "Album này được không public, mọi người không thể truy cập"}
          </Typography>
          {/* <Like songs={songs} /> */}
          {songs && <MusicList list={songs} />}
        </Grid>
      </Grid>
    </Wrap>
  );
}
