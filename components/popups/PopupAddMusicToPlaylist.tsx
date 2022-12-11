import * as React from "react";
import { useState, useEffect } from "react";
import { TextField, Dialog, Checkbox, Typography, Button, Box, Stack, Autocomplete, Alert } from "@mui/material";

import { useRouter } from "next/router";
import { list as listPlaylistPrivate } from "../../apis/private/models/playlist/get_playlist";
import { update as updatePlaylistPrivate, TUpdatePlayList } from "../../apis/private/models/playlist/put_playlist";
import { useQuery } from "react-query";
const style = {
  width: 400,
  minHeight: 400,
  bgcolor: "background.default",
  boxShadow: 24,
  p: 4,
};
type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
  listSong: any[];
};
export default function PopupAddMusicToPlaylist(props: Props) {
  const [playlists, setPlaylists] = useState([]);
  const [statusAdd, setStatusAdd] = useState("");
  const handleClose = () => props.setOpen(false);
  const handlePost = async (value: any) => {
    const label: any = value.label;
    const idPlayList: any = value.id;

    const listSong = props.listSong;
    const playlist_: TUpdatePlayList = { name: label, song: [...listSong] };
    // console.log(idPlayList, value);

    const res = await updatePlaylistPrivate(+idPlayList, playlist_);
    if (res) {
      setStatusAdd("SUCCESS");
    }
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  const queryPlaylist = useQuery(
    ["listPlaylistPrivate_0_1000_0"],
    async () => {
      return await listPlaylistPrivate({ depth: 0, limit: 1000, offset: 0 });
    },
    {
      onSuccess: (data) => {
        let playlist_ = data.results.map((item: any, index: any) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
        setPlaylists(playlist_);
      },
    }
  );
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
          <Stack direction="column" spacing={3}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.primary",
              }}
            >
              Thêm nhạc đã chọn vào playlist
            </Typography>

            <Autocomplete
              disablePortal
              options={playlists.map((option: any) => ({
                id: option.id,
                label: option.name,
              }))}
              onChange={(e, value: any) => {
                handlePost(value);
              }}
              renderInput={(params) => {
                return <TextField {...params} label="PlayList Search" variant="standard" />;
              }}
            />
            {statusAdd != "" && <Alert severity="warning"> {statusAdd}</Alert>}
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
}
