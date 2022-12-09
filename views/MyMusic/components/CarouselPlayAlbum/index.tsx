import React, { useState } from "react";
import styles from "./CarouselPlayAlbum.module.css";

import { Stack, Box, Typography } from "@mui/material";
import { PlayCircle, PauseCircle, Add } from "@mui/icons-material";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMusicPlayer } from "../../../../contexts/useMusicPlayer";
import PopupCreateAlbum from "../../../../components/popups/PopupCreateAlbum";
type TProps = {
  list: TCarouselPlayAlbum[];
};
export type TCarouselPlayAlbum = {
  name: string;
  cover: string;
  clickHrefTo: string;
};
export default function CarouselPlayAlbum(props: TProps) {
  const list: TCarouselPlayAlbum[] = props.list;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { play, pause, isPlay } = useMusicPlayer();
  const handelCreateNewAlbumCard = () => {
    setOpen(true);
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
          height: 200,
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
    <Stack direction="row" spacing={3}>
      {list.map((item: TCarouselPlayAlbum, index: any) => {
        return (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
            sx={{
              width: 150,
              height: 200,
            }}
            onClick={(event) => {
              event.stopPropagation();
              console.log("card click");
              router.push(item?.clickHrefTo as string);
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
                {isPlay ? (
                  <PauseCircle
                    sx={{
                      fontSize: "2.5rem",
                      color: "text.primary",
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      console.log("Play icon click");
                      pause();
                    }}
                  />
                ) : (
                  <PlayCircle
                    sx={{
                      fontSize: "2.5rem",
                      color: "text.primary",
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      console.log("pause icon click");

                      play();
                    }}
                  />
                )}
              </Box>
              <Image
                src={item?.cover as string}
                alt="Picture of album"
                width={150}
                height={150}
                style={{
                  borderRadius: "20px",
                  objectFit: "cover"
                }}
              />
            </Box>
            <Typography
              sx={{
                color: "text.primary",
              }}
            >
              {item.name}
            </Typography>
          </Box>
        );
      })}

      <BoxAdd />
      <PopupCreateAlbum open={open} setOpen={setOpen} />
    </Stack>
  );
}
