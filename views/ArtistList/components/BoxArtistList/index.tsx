import React, { useState } from "react";
import styles from "./BoxArtistList.module.css";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Box, Typography } from "@mui/material";

type TProps = {
  list: TBoxArtistList[];
};
export type TBoxArtistList = {
  name: string;
  cover: string;
  clickHrefTo: string;
};
export default function BoxArtistList(props: TProps) {
  const list: TBoxArtistList[] = props.list;
  const router = useRouter();
  const MainContent = () => {
    return (
      <Box display="flex" flexWrap="wrap">
        {list.map((item: TBoxArtistList, index: any) => {
          return (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
              sx={{
                width: 200,
                height: 250,
                margin: "1rem",
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
                    borderRadius: "10px",
                    width: "200px",
                    height: "150px",
                    bottom: 0,
                    right: 0,
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.primary",
                      fontSize: "1.2rem",
                      textShadow: "0px 4px 4px #1A1E1F",
                    }}
                  >
                    {item?.name ? item?.name : "name"}
                  </Typography>
                </Box>

                <Image
                  src={item?.cover as string}
                  alt="Picture of the author"
                  width={200}
                  height={250}
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover"
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };
  if (list && list.length > 0) return <MainContent />;
  return <Typography sx={{ color: "text.primary" }}>Ops, Không có data</Typography>;
}
