import React from "react";
import { useState, useEffect } from "react";
import { Grid, Box, Checkbox, Typography, Button, Stack } from "@mui/material";
import { FavoriteBorder, MoreVert, PlayCircle, PauseCircle } from "@mui/icons-material";

import Image from "next/image";

import Wrap from "../../wrap";
import MusicList from "../../../components/MusicList";
import { detail as detailAlbumPrivate } from "../../../apis/private/extends/album/get_album";
import { useMusicPlayer } from "../../../contexts/useMusicPlayer";
import { TMusicList } from "../../../components/MusicList/types";
import { useQuery } from "react-query";
import config from "../../../config";
import MyLoader from "./Loading";
import MenuMoreVert from "../components/MenuMoreVert";
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
        ...{ path: `${config.MUSIC_URL}${item.path}` },
        ...{ cover: `${config.IMAGE_URL}${item.cover}` },
      };
    });
    setListMusicPlayer(listSongMusicPlay_);
    // console.log(listSongMusicPlay_);
    setTimeout(() => {
      play();
    }, 100);
  };
  const handelButtonPauseClick = () => {
    pause();
    // console.log("pause");
  };
  const queryAlbum = useQuery(
    ["detailAlbum", id],
    async () => {
      if (!id) return;
      return await detailAlbumPrivate(+id);
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
      let songs_: TMusicList[] = album?.song?.map((item: any, index: any) => {
        return {
          id: item.id,
          name: item.name,
          cover: `${config.IMAGE_URL}${item.cover}`,
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
              src={`${config.IMAGE_URL}${album?.cover}`}
              alt="Image album"
              width={300}
              height={300}
              layout="responsive"
              style={{
                borderRadius: "20px",
                objectFit: "cover",
                aspectRatio: "1 / 1",
              }}
              placeholder="blur"
              blurDataURL="/assert/images/image-loading.gif"
            />
            <Typography
              variant="h5"
              sx={{
                color: "text.primary",
              }}
            >
              {album?.name ? album.name : "No song title"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.primary",
              }}
            >
              {album?.description ? album.description : "No description"}
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
                  Pause
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
                <MenuMoreVert id={album?.id} />
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
            {album?.isPublic ? "This album is public, everyone can access it" : "This album is not public, everyone cannot access it"}
          </Typography>
          {/* <Like songs={songs} /> */}
          {songs && <MusicList list={songs} />}
        </Grid>
      </Grid>
    </Wrap>
  );
}
