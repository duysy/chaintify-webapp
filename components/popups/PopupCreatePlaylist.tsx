import * as React from "react";
import { useState, useEffect } from "react";
import { TextField, Dialog, Checkbox, Typography, Button, Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { create as createPlayListPrivate, TCreatePlayList } from "../../apis/private/models/playlist/post_playlist";
import Image from "next/image";
import config from "../../config";
import FileUpload from "../FileUpload";
import { useMutation, useQueryClient } from "react-query";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
};
export default function PopupCreatePlaylist(props: Props) {
  const router = useRouter();
  const [pathImage, setPathImage] = useState<string | null>("");
  const handleClose = () => props.setOpen(false);

  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().min(20),
    cover: yup.string().required(),
  });

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();
  const mutationSubmit = useMutation((data: any) => createPlayListPrivate(data), {
    onSuccess: (data) => {
      if (data) {
        alert("Success");
        // console.log("createPlayList", data);
        handleClose();
        // router.push(`/playlist/${data.id}`);
        queryClient.invalidateQueries(["listPlaylistPrivate_0_5_0"]);
        queryClient.invalidateQueries(["listPlaylistPrivate_0_1000_0"]);
      } else {
        alert("Fail");
      }
    },
  });

  const onSubmit = async (data: any) => {
    mutationSubmit.mutate(data);
  };

  useEffect(() => {
    setValue("cover", pathImage);
  }, [pathImage]);

  return (
    <div>
      <Dialog onClose={handleClose} open={props.open} sx={{ zIndex: 2000 }}>
        <Box
          sx={{
            position: "relative",
            width: { xs: "80vw", md: "500px" },
            height: "auto",
            bgcolor: "background.default",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Button
            style={{
              position: "absolute",
              right: 0,
              top: 0,
            }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            // alignItems="center"
            sx={{ height: "100%" }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "text.primary",
              }}
            >
              Tạo playlist mới
            </Typography>

            <Controller
              name={"name"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box sx={{ width: "100%" }}>
                  <TextField sx={{ width: "100%" }} label="Name" variant="standard" onChange={onChange} value={value} />
                  <Typography color="red">{errors.name?.message as any}</Typography>
                </Box>
              )}
            />

            <Controller
              name={"description"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box sx={{ width: "100%" }}>
                  <TextField sx={{ width: "100%" }} label="Description" variant="standard" onChange={onChange} value={value} />
                  <Typography color="red">{errors.description?.message as any}</Typography>
                </Box>
              )}
            />

            <Box
              display={"flex"}
              flexDirection="column"
              alignItems={"center"}
              justifyContent={"space-around"}
              sx={{ border: "1px solid", borderColor: "text.primary", padding: "1rem 0", margin: "1rem 0" }}
            >
              {pathImage && (
                <Image
                  width={200}
                  height={200}
                  alt={"image pathImage"}
                  style={{
                    objectFit: "cover",
                  }}
                  src={`${config.IMAGE_URL}${pathImage}`}
                />
              )}
              <br />
              <FileUpload setPath={setPathImage} accept=".png, .jpeg, .jpg" title={"Pick a image"} setName={null} />
              <Typography color="red">{errors?.cover?.message as any}</Typography>
            </Box>

            <Button onClick={handleSubmit(onSubmit)}>Tạo mới</Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
