import React from "react";
import { useState, useEffect } from "react";
import styles from "./Slide.module.css";
import { Box, Grid, Stack } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import Image from "next/image";
const itemData = [
  {
    img: "https://picsum.photos/300/201",
    title: "Breakfast",
  },
  {
    img: "https://picsum.photos/300/202",
    title: "Burger",
  },
  {
    img: "https://picsum.photos/300/203",
    title: "Camera",
  },
  {
    img: "https://picsum.photos/300/204",
    title: "Camera",
  },
  {
    img: "https://picsum.photos/300/205",
    title: "Camera",
  },
  ,
  {
    img: "https://picsum.photos/300/206",
    title: "Camera",
  },
];

export default function Slide() {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(3);
  useEffect(() => {
    const id = setInterval(() => next(), 5000);
    return () => clearInterval(id);
  });

  const back = () => {
    let from_ = from - 1;
    let to_ = to - 1;
    if (from_ < 0) {
      from_ = 0;
      to_ = from_ + 3;
    }
    setFrom(from_);
    setTo(to_);
  };
  const next = () => {
    let from_ = from + 1;
    let to_ = to + 1;
    if (to_ >= itemData.length - 1) {
      from_ = 0;
      to_ = 3;
    }
    setFrom(from_);
    setTo(to_);
  };
  return (
    <Stack
      direction="row"
      style={{
        position: "relative",
        left: 0,
        alignItems: "center",
      }}
    >
      <NavigateBefore
        sx={{
          position: "absolute",
          fontSize: "6rem",
          color: "text.primary",
        }}
        onClick={back}
      />
      <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ width: "100%", height: "auto" }} spacing={0}>
        {itemData.slice(from, to).map((item) => (
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            item
            xs={12}
            sm={6}
            md={4}
            key={item?.img as string}
            sx={{ padding: "0.5rem" }}
          >
            <Image
              width={300}
              height={200}
              alt={item?.title as string}
              src={item?.img as string}
              layout="responsive"
              style={{
                borderRadius: "25px",
                objectFit: "cover",

                maxHeight: "15rem",
              }}
              placeholder="blur"
              blurDataURL="/assert/images/image-loading.gif"
            />
          </Grid>
        ))}
      </Grid>
      <NavigateNext
        sx={{
          position: "absolute",
          right: 0,
          fontSize: "6rem",
          color: "text.primary",
        }}
        onClick={next}
      />
    </Stack>
  );
}
