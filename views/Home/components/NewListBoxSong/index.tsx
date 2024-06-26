import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
type TProps = {
  list: any;
};
export type TNewListBoxSong = {
  cover: string;
  name: string;
  artist: string;
  updated_at: string;
};
export default function NewListBoxSong(props: TProps) {
  const songs: TNewListBoxSong[] = props.list;

  const MainContent = () => {
    return (
      <Grid container spacing={2}>
        {songs &&
          songs.map((item: TNewListBoxSong, index: any) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Box
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                  sx={{
                    padding: "10px",
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.15)",
                    boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(5px)",
                    borderRadius: "15px",
                  }}
                >
                  <Image
                    src={item.cover as string}
                    alt="Picture of new song"
                    width={65}
                    height={65}
                    style={{
                      borderRadius: "15px",
                      objectFit: "cover",
                    }}
                    placeholder="blur"
                    blurDataURL="/assert/images/image-loading.gif"
                  />
                  <Box
                    sx={{
                      marginLeft: "1rem",
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "text.primary",
                      }}
                    >
                      {item?.name ? item.name.substring(0, 25) : "name"} {item.name.length > 25 ? "..." : ""}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "text.primary",
                      }}
                    >
                      {item?.artist ? item.artist : "artist"}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "text.primary",
                      }}
                    >
                      {item?.updated_at ? item.updated_at : "time"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
      </Grid>
    );
  };
  if (songs && songs.length > 0) return <MainContent />;
  return <Typography sx={{ color: "text.primary" }}>Oops, there is no data</Typography>;
}
