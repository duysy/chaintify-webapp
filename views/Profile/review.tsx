import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Wrap from "../wrap";
import Image from "next/image";
import config from "../../config";
import { Image as ImageIcon } from "@mui/icons-material";
type TProps = {
  name: string | null;
  description: string | null;
  pathImage: string | null;
};
export default function ReviewProfile(props: TProps) {
  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column" justifyContent="space-around" sx={{ flex: 3 }}>
        <Typography
          variant="h4"
          sx={{
            color: "text.primary",
          }}
        >
          {props.name ? props?.name : "No Name"}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "text.primary",
          }}
        >
          {props?.description ? props?.description : "No Description"}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          flex: 2,
        }}
      >
        {props.pathImage ? (
          <Image
            style={{ objectFit: "cover", borderRadius: "1000px" }}
            src={`${config.baseMedia}${props.pathImage}`}
            alt="Picture of profile"
            width={300}
            height={300}
          />
        ) : (
          <ImageIcon
            sx={{
              height: 300,
              width: 300,
              color: "text.primary",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
