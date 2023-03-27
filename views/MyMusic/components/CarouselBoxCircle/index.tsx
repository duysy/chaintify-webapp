import React, { FC } from "react";
import styles from "./CarouselBoxCircle.module.css";

import { Shuffle, FilterDrama } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import Image from "next/image";
import { useRouter } from "next/navigation";

type TProps = {
  list: TCarouselBoxCircle[];
};

export type TCarouselBoxCircle = {
  name: string;
  cover: string;
  clickHrefTo: string;
};

export default function CarouselBoxCircle(props: TProps) {
  const list: TCarouselBoxCircle[] = props.list;
  const router = useRouter();
  const handelOnClick = (to: string) => {
    if (!to) return;
    router.push(to);
  };
  const MainContent: any = () => {
    return (
      <Box display={"flex"} flexWrap={"wrap"} alignItems="flex-start">
        {list.map((item: TCarouselBoxCircle, index: any) => {
          return (
            <Box
              key={index}
              position="relative"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: 150,
                margin: "0 1rem 1.5rem 0",
              }}
              onClick={() => {
                handelOnClick(item.clickHrefTo);
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  position: "absolute",
                  top: 120,
                  right: 5,
                  color: "black",
                  bgcolor: "background.paper",
                  borderRadius: "1000px",
                  padding: "5px",
                }}
              >
                <Shuffle
                  sx={{
                    color: "text.primary",
                  }}
                />
              </Box>
              <Image
                src={item.cover}
                alt="Picture of playlist"
                width={150}
                height={150}
                style={{
                  borderRadius: "1000px",
                  objectFit: "cover",
                }}
                placeholder="blur"
                blurDataURL="/assert/images/image-loading.gif"
              />
              <Typography
                sx={{
                  color: "text.primary",
                  marginTop: "10px",
                }}
              >
                {item.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  };
  if (list && list.length > 0) return <MainContent />;
  return <Typography sx={{ color: "text.primary" }}>Oops, there is no data</Typography>;
}
