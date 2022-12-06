import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
type TProps = {
  list: any;
};
export type TNewBoxList = {
  cover: string;
  name: string;
  artist: string;
  updated_at: string;
};
export default function NewBoxList(props: TProps) {
  const songs: TNewBoxList[] = props.list;

  const MainContent = () => {
    return (
      <Grid container spacing={2}>
        {songs &&
          songs.map((item: TNewBoxList, index: any) => {
            return (
              <Grid item xs={6} md={4} key={index}>
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
                    alt="Picture of the author"
                    width={65}
                    height={65}
                    style={{
                      borderRadius: "15px",
                      objectFit: "cover"
                    }}
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
                      {item?.name ? item.name : "name"}
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
  return <Typography sx={{ color: "text.primary" }}>Ops, Không có data</Typography>;
}
