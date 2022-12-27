import React, { useState } from "react";
import { Box, Button, OutlinedInput, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import Image from "next/image";
import FileUpLoad from "../../components/FileUpload";
import config from "../../config";
import { Image as ImageIcon } from "@mui/icons-material";
type TProps = {
  setName: any | null;
  name: string | null;
  setDescription: any | null;
  description: string | null;
  setPathImage: any | null;
  pathImage: string | null;
};
export default function EditProfile(props: TProps) {
  const handelTextFieldNameChange = (event: any) => props.setName(event.target.value);
  const handelTextFieldDescriptionChange = (event: any) => props.setDescription(event.target.value);

  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column" justifyContent="space-around" sx={{ flex: 3 }}>
        <Typography
          variant="h4"
          sx={{
            color: "text.primary",
          }}
        >
          <TextField
            label={"Name"}
            id="margin-dense"
            margin="dense"
            style={{ width: "100%" }}
            value={props?.name as string}
            onChange={handelTextFieldNameChange}
          />
        </Typography>
        <TextareaAutosize
          aria-label="Description"
          minRows={5}
          placeholder="Description"
          value={props?.description as string}
          onChange={handelTextFieldDescriptionChange}
          style={{ width: "100%" }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          flex: 2,
          position: "relative",
        }}
      >
        <Box
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <FileUpLoad setPath={props.setPathImage} accept={".png,.jpg"} title={"Pick image"} />
        </Box>
        {props.pathImage ? (
          <Image
            src={`${config.IMAGE_URL}${props.pathImage}`}
            alt="Picture of profile"
            width={300}
            height={300}
            style={{
              borderRadius: "1000px",
              objectFit: "cover",
            }}
            placeholder="blur"
            blurDataURL="/assert/images/image-loading.gif"
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
