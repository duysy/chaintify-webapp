import * as React from "react";
import { useState } from "react";
import { TextField, Dialog, Checkbox, Typography, Button, Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { create as createPlayListPrivate, TCreatePlayList } from "../../apis/private/models/playlist/post_playlist";
import Image from "next/image";
import config from "../../config";
import FileUpload from "../FileUpload";
import { useMutation, useQueryClient } from "react-query";
const style = {
  width: 500,
  height: "auto",
  bgcolor: "background.default",
  boxShadow: 24,
  p: 4,
};
type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
};
export default function PopupCreatePlaylist(props: Props) {
  const router = useRouter();
  const [playListName, setPlayListName] = useState<string | null>(null);
  const [playListDescription, setPlayListDescription] = useState<string | null>(null);
  const [pathImage, setPathImage] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const handleClose = () => props.setOpen(false);
  const queryClient = useQueryClient();
  const mutationSubmit = useMutation((data: any) => createPlayListPrivate(data), {
    onSuccess: (data) => {
      if (data) {
        alert("Success");
        // console.log("createPlayList", data);
        handleClose();
        router.push(`/playlist/${data.id}`);
        queryClient.invalidateQueries(["listPlaylistPrivate_0_5_0"]);
      } else {
        alert("Fail");
      }
    },
  });
  const handlePost = async () => {
    if (!playListName || !playListDescription || !pathImage) return;
    const dataSubmit: TCreatePlayList = {
      name: playListName,
      description: playListDescription,
      cover: pathImage,
      isPublic: isPublic,
    };
    mutationSubmit.mutate(dataSubmit);
  };
  const handleTextFieldNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const playListName_ = event.target.value;
    if (!playListName_) return;
    // console.log(playListName_);
    setPlayListName(playListName_);
  };

  const handleTextFieldDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const setPlayListDescription_ = event.target.value;
    if (!setPlayListDescription_) return;
    // console.log(setPlayListDescription_);
    setPlayListDescription(setPlayListDescription_);
  };
  const handelCheckBoxIsPrivateChange = (event: any) => {
    const isPublic_ = event.target.checked;
    // console.log(isPublic_);
    setIsPublic(isPublic_);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={props.open} sx={{ zIndex: 2000 }}>
        <Box
          sx={style}
          style={{
            position: "relative",
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
            <TextField id="standard-basic" label="Name" variant="standard" onChange={handleTextFieldNameChange} />
            <TextField id="standard-basic" label="Description" variant="standard" onChange={handleTextFieldDescriptionChange} />
            <Box
              display={"flex"}
              flexDirection="column"
              alignItems={"center"}
              justifyContent={"space-around"}
              sx={{ border: "1px solid", borderColor: "text.primary", padding: "1rem 0", margin: "1rem 0" }}
            >
              {pathImage && <Image width={200} height={200} alt={"image pathImage"} objectFit={"cover"} src={`${config.baseMedia}${pathImage}`} />}
              <br />
              <FileUpload setPath={setPathImage} accept=".png, .jpeg, .jpg" title={"Pick a image"} />
            </Box>
            <Stack direction="row">
              <Checkbox value={isPublic} defaultChecked={true} onChange={handelCheckBoxIsPrivateChange} />
              <Typography sx={{ textAlign: "center", lineHeight: "3rem", height: "3rem" }} variant="inherit">
                Mọi người có thể truy cập playlist này
              </Typography>
            </Stack>
            <Button onClick={handlePost}>Tạo mới</Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
