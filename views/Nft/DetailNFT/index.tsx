import React from "react";
import { useState, useEffect } from "react";
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import { PlayCircle, PauseCircle, Send } from "@mui/icons-material";

import Image from "next/image";

import Wrap from "../../wrap";
import MusicList from "../../../components/MusicList";
import { detail as detailNftPrivate } from "../../../apis/private/nft/metadata/get_metadata";
import { useMusicPlayer } from "../../../contexts/useMusicPlayer";
import { TMusicList } from "../../../components/MusicList/types";
import config from "../../../config";
import { ethers } from "ethers";
import PopupSendNft from "../../../components/popups/PopupSendNft";
import { useQuery, useQueryClient } from "react-query";
import MyLoader from "./Loading";
type Props = {
  id: string | string[] | undefined;
};
export default function DetailNFTView(props: Props) {
  const id = props.id;
  const [open, setOpen] = useState(false);
  const { setListMusicPlayer, play, pause, isPlay } = useMusicPlayer();
  const [album, setAlbum] = useState<any | {}>({});
  const [songs, setSongs] = useState<TMusicList[] | null>(null);
  const queryClient = useQueryClient();
  const handelButtonPlayClick = () => {
    const listSongMusicPlay_ = album.song.map((item: any) => {
      return {
        ...item,
        ...{ path: item.path },
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
    ["detailNftPrivate", id],
    async () => {
      if (!id) return;
      return await detailNftPrivate(+id);
    },
    {
      onSuccess: (data: any) => {
        // console.log("data", data);
        if (!data) return;
        setAlbum(data?.metadata);
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
          cover: item.cover,
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
  if (queryAlbum.isFetching) {
    return (
      <Wrap>
        <MyLoader />
      </Wrap>
    );
  }
  return (
    <Wrap>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginTop="3rem">
            <Image
              src={album?.image}
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
              {album?.name ? album.name : "Không có tên album"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.primary",
              }}
            >
              {album?.description ? album.description : "Không có description"}
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                color: "text.primary",
              }}
            >
              <Box sx={{ margin: "0 1rem" }}>
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
              <Button variant="outlined" startIcon={<Send />} onClick={() => setOpen(true)}>
                Send
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              marginTop: "3rem",
            }}
          >
            {songs && <MusicList list={songs} />}
          </Box>
        </Grid>
      </Grid>
      <PopupSendNft open={open} setOpen={setOpen} id={id} />
    </Wrap>
  );
}
