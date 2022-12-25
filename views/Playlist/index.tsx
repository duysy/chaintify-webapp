import React from "react";
import { useState, useEffect } from "react";
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import { FavoriteBorder, MoreHoriz, PlayCircleFilledWhiteOutlined, PauseCircleFilledOutlined, Image as ImageIcon } from "@mui/icons-material";

import Image from "next/image";

import Wrap from "../wrap";
import MusicList from "../../components/MusicList";
import { detail as detailPlayListPrivate } from "../../apis/private/models/playlist/get_playlist";
import { useMusicPlayer } from "../../contexts/useMusicPlayer";
import { TMusicList } from "../../components/MusicList/types";
import config from "../../config";
import { useQuery } from "react-query";
import MyLoader from "./Loading";
type Props = {
  id: string | string[] | undefined;
};
export default function PlayListView(props: Props) {
  const id = props.id;
  const { setListMusicPlayer, play, pause, isPlay } = useMusicPlayer();
  const [playlist, setPlaylist] = useState<any | {}>({});
  const [songs, setSongs] = useState<TMusicList[] | null>(null);
  const handelButtonPlayClick = () => {
    const listSongMusicPlay_ = playlist.song.map((item: any) => {
      return {
        ...item,
        ...{ path: `${config.MUSIC_URL}${item.path}` },
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
  const queryPlaylist = useQuery(
    ["initPlaylist", id],
    async () => {
      if (!id) return;
      return await detailPlayListPrivate(+id, { depth: 2 });
    },
    {
      onSuccess: (data) => {
        setPlaylist(data);
      },
    }
  );
  useEffect(() => {
    const initSongs = async () => {
      if (!playlist || Object.keys(playlist).length === 0) return;
      let songs_: TMusicList[] = playlist.song.map((item: any, index: any) => {
        return {
          id: item.id,
          name: item.name,
          cover: `${config.IMAGE_URL}${item.cover}`,
          artist: item?.artist && item.artist.map((item: any) => item.name).join("|"),
          album: item.album?.name,
          time: item.length,
          favorite: true,
          checkBoxStatus: false,
        } as TMusicList;
      });

      console.log(songs_);
      setSongs(songs_);
    };
    initSongs();
  }, [playlist]);
  if (queryPlaylist.isFetching)
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
            {playlist?.cover ? (
              <Image
                src={`${config.IMAGE_URL}${playlist?.cover}`}
                alt="Image playlist"
                width={300}
                height={300}
                layout="responsive"
                style={{
                  borderRadius: "20px",
                  objectFit: "cover",
                  aspectRatio: "1 / 1",
                }}
              />
            ) : (
              <ImageIcon
                sx={{
                  width: 300,
                  height: 300,
                  color: "text.primary",
                }}
              />
            )}
            <Typography
              variant="h5"
              sx={{
                color: "text.primary",
              }}
            >
              {playlist?.name ? playlist.name : "Không có tên bài hát"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.primary",
              }}
            >
              {playlist?.description ? playlist.description : "Không có description"}
            </Typography>
            <Box>
              {isPlay ? (
                <Button
                  startIcon={<PauseCircleFilledOutlined fontSize="large" />}
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
                  startIcon={<PlayCircleFilledWhiteOutlined fontSize="large" />}
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
                <FavoriteBorder
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
                <MoreHoriz
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
            {playlist?.isPublic ? "Album này được public, mọi người có thể truy cập" : "Album này được không public, mọi người không thể truy cập"}
          </Typography>
          {/* <Like songs={songs} /> */}
          {songs && <MusicList list={songs} />}
        </Grid>
      </Grid>
    </Wrap>
  );
}
