import React from "react";
import styles from "./LikeTab.module.css";

import { Favorite, MoreVert } from "@mui/icons-material";
import { Grid, Stack, Container, Box, Typography, Checkbox } from "@mui/material";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMusicPlayer } from "../../../../contexts/useMusicPlayer";

export default function LikeSongTab(props: any) {
  const list = props.list;
  const router = useRouter();
  const { play, pause, isPlay } = useMusicPlayer();
  return (
    <Stack spacing={1}>
      {list.map((item: any, index: any) => {
        return (
          <Box
            key={index}
            sx={{
              backdropFilter: "blur(5px)",
              borderRadius: "15px",
              background: "rgba(51, 55, 59, 0.37)",
              padding: "5px",
            }}
          >
            <Grid container spacing={0} key={index}>
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  color: "text.primary",
                }}
              >
                <Checkbox />
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  color: "text.primary",
                }}
              >
                <Image
                  src={item.cover}
                  alt="Picture of the author"
                  width={40}
                  height={40}
                  style={{
                    borderRadius: "1px",
                    objectFit: "cover"
                  }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  color: "text.primary",
                }}
              >
                {item.name}
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "text.primary",
                }}
              >
                {item.artist}
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "text.primary",
                }}
              >
                {item.time}
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  color: "text.primary",
                }}
              >
                <Favorite />
                <MoreVert />
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Stack>
  );
}
