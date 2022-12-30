import React, { useState } from "react";
import styles from "./CarouselPlayAlbum.module.css";

import { Stack, Box, Typography } from "@mui/material";
import { PlayCircle, PauseCircle, Add, Album } from "@mui/icons-material";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMusicPlayer } from "../../../../contexts/useMusicPlayer";
import PopupCreateAlbum from "../../../../components/popups/PopupCreateAlbum";
import { detail } from "../../../../apis/public/extends/album/get_album";
import config from "../../../../config";
type TProps = {
  list: TCarouselPlayAlbum[];
};
export type TCarouselPlayAlbum = {
  id: number;
  name: string;
  cover: string;
  clickHrefTo: string;
};
export default function CarouselPlayAlbum(props: TProps) {
  const list: TCarouselPlayAlbum[] = props.list;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { play, pause, isPlay, setListMusicPlayer, listSongMusicPlayer } = useMusicPlayer();
  const handelCreateNewAlbumCard = () => {
    setOpen(true);
  };
  const fetchAndSetSong = async (id: number) => {
    const album = await detail(+id);
    const listSongMusicPlay_ = album.song.map((item: any) => {
      return {
        ...item,
        ...{ path: `${config.MUSIC_URL}${item.path}` },
      };
    });
    // console.log(listSongMusicPlay_);
    setListMusicPlayer(listSongMusicPlay_);
  };
  const BoxAdd = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          width: 150,
        }}
        onClick={handelCreateNewAlbumCard}
      >
        <Box className={styles.card}>
          <Add
            sx={{
              fontSize: "3rem",
              width: "150px",
              height: "150px",
              color: "text.primary",
              borderColor: "text.primary",
              border: "1px solid ",
              borderRadius: "20px",
            }}
          />
        </Box>
        <Typography
          sx={{
            color: "text.primary",
          }}
        >
          Tạo album
        </Typography>
      </Box>
    );
  };
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start">
      {list?.map((album: TCarouselPlayAlbum, index: any) => {
        return (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
            sx={{
              width: 150,
            }}
            onClick={(event) => {
              event.stopPropagation();
              // console.log("card click");
              router.push(album?.clickHrefTo as string);
            }}
          >
            <Box position="relative" className={styles.card}>
              <Box
                className={styles.playClass}
                position="absolute"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  borderRadius: "20px",
                  width: "150px",
                  height: "150px",
                }}
              >
                {isPlay && listSongMusicPlayer[0].album == album.id ? (
                  <PauseCircle
                    sx={{
                      fontSize: "4.5rem",
                      color: "#ffffff",
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      // console.log("Play icon click");
                      pause();
                    }}
                  />
                ) : (
                  <PlayCircle
                    sx={{
                      fontSize: "4.5rem",
                      color: "#ffffff",
                    }}
                    onClick={async (event) => {
                      event.stopPropagation();
                      // console.log("pause icon click");
                      await fetchAndSetSong(album?.id);
                      setTimeout(() => {
                        play();
                      }, 1000);
                    }}
                  />
                )}
              </Box>
              <Image
                src={album?.cover as string}
                alt="Picture of album"
                width={150}
                height={150}
                style={{
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
                placeholder="blur"
                blurDataURL="/assert/images/image-loading.gif"
              />
            </Box>
            <Typography
              sx={{
                color: "text.primary",
              }}
            >
              {album.name}
            </Typography>
          </Box>
        );
      })}

      <BoxAdd />
      <PopupCreateAlbum open={open} setOpen={setOpen} />
    </Stack>
  );
}
