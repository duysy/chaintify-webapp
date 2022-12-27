import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "react-query";

import config from "../../config";
import { TextField, Dialog, Typography, Button, Box, Stack, TextareaAutosize, Autocomplete, CircularProgress } from "@mui/material";
import FileUpload from "../../components/FileUpload";
import { list as listAlbumPrivate } from "../../apis/private/models/album/get_album";
import { list as listArtistPublic } from "../../apis/public/models/artist/get_artist";
import { create as createSongApi, TCreateSong } from "../../apis/private/models/song/post_song";
import { useAuth } from "../../contexts/useAuth";
const style = {
  width: "500px",
  height: "auto",
  bgcolor: "background.default",
  boxShadow: 24,
  p: 3,
};
type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
};
export default function PopupMusicUpLoad(props: Props) {
  const { isLogin } = useAuth();

  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [createSong, setCreateSong] = useState<TCreateSong | {}>({});
  const [pathSong, setPathSong] = useState(null);
  const [pathImage, setPathImage] = useState(null);
  const refAudio: any = useRef();
  const queryClient = useQueryClient();
  
  const queryAlbum = useQuery(
    ["listAlbumPrivate_0_1000_0"],
    async () => {
      return await listAlbumPrivate({ depth: 0, limit: 1000, offset: 0 });
    },
    {
      onSuccess: (data: any) => {
        let albums_ = data.results.map((item: any, index: any) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
        setAlbums(albums_);
      },
      enabled: !!isLogin,
    }
  );
  const queryArtist = useQuery(
    ["listArtistPublic_0_1000_0"],
    async () => {
      return await listArtistPublic({ depth: 0, limit: 1000, offset: 0 });
    },
    {
      onSuccess: (data: any) => {
        let artists_ = data.results.map((item: any, index: any) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
        setArtists(artists_);
      },
    }
  );
  const mutationSubmit = useMutation((data: any) => createSongApi(data), {
    onSuccess: (data: any) => {
      if (data) {
        alert("Up load success new song");
        handleClosePopUp();
        queryClient.invalidateQueries(["listSong_1_1000_0"]);
      } else {
        alert("Fail");
      }
    },
  });

  const handleClosePopUp = () => props.setOpen(false);
  const handleTextFieldNameChange = (event: any) => {
    const name = event.target.value;
    const createSong_ = { ...createSong, ...{ name: name } };
    setCreateSong(createSong_);
  };

  const handleAutoCompleteAlbumChange = (event: any, value: any) => {
    if (!value) return;
    const album: number = value.id;
    const createSong_ = { ...createSong, ...{ album: album } };
    setCreateSong(createSong_);
  };
  const handleAutoCompleteArtistChange = (event: any, value: any) => {
    if (!value) return;
    const artist: number = value.id;

    const createSong_ = { ...createSong, ...{ artist: [artist] } };
    setCreateSong(createSong_);
  };

  useEffect(() => {
    const createSong_ = { ...createSong, ...{ path: pathSong } };
    setCreateSong(createSong_);
  }, [pathSong]);

  useEffect(() => {
    const createSong_ = { ...createSong, ...{ cover: pathImage } };
    setCreateSong(createSong_);
  }, [pathImage]);

  const handleTextFieldLyricsChange = (event: any) => {
    const lyrics = event.target.value;
    const createSong_ = { ...createSong, ...{ lyrics: lyrics } };
    setCreateSong(createSong_);
  };

  const handleSubmit = async () => {
    const addMore = {
      length: refAudio?.current?.duration | 0,
      track: 1,
      disc: 1,
      mtime: 1,
    };
    const createSong_ = { ...createSong, ...addMore };
    // console.log(createSong_);
    mutationSubmit.mutate(createSong_);
  };

  return (
    <Dialog onClose={handleClosePopUp} open={props.open} sx={{ zIndex: 2000 }}>
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
          onClick={handleClosePopUp}
        >
          Close
        </Button>
        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
          }}
        >
          Upload nhạc
        </Typography>
        <Stack
          spacing={3}
          direction="column"
          sx={{
            color: "text.primary",
          }}
        >
          <TextField label="Name" variant="standard" onChange={handleTextFieldNameChange} />
          {queryAlbum.isSuccess ? (
            <Autocomplete
              disablePortal
              onChange={handleAutoCompleteAlbumChange}
              options={albums.map((option: any) => ({
                label: option.name,
                id: option.id,
              }))}
              renderInput={(params: any) => <TextField {...params} label="Album" variant="standard" />}
            />
          ) : (
            <>
              <CircularProgress />
              <Typography>Loading album</Typography>
            </>
          )}
          {queryArtist.isSuccess ? (
            <Autocomplete
              disablePortal
              onChange={handleAutoCompleteArtistChange}
              options={artists.map((option: any) => ({
                label: option.name,
                id: option.id,
              }))}
              renderInput={(params: any) => <TextField {...params} label="Artist" variant="standard" />}
            />
          ) : (
            <>
              <CircularProgress />
              <Typography>Loading artist</Typography>
            </>
          )}
          <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"space-around"}
            sx={{ border: "1px solid", borderColor: "text.primary", padding: "1rem 0", margin: "1rem 0" }}
          >
            {pathSong && (
              <audio controls ref={refAudio} src={`${config.IMAGE_URL}${pathSong}`}>
                <source src="" type="audio/mp3" />
              </audio>
            )}
            <br />
            <FileUpload setPath={setPathSong} accept=".mp3" title={"Pick a music"} />
          </Box>

          <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"space-around"}
            sx={{ border: "1px solid", borderColor: "text.primary", padding: "1rem 0", margin: "1rem 0" }}
          >
            {pathImage && <Image width={200} height={200} alt={"image pathImage"} objectFit={"cover"} src={`${config.IMAGE_URL}${pathImage}`} />}
            <br />
            <FileUpload setPath={setPathImage} accept=".png,.jpeg,.jpg" title={"Pick a image cover"} />
          </Box>

          <TextareaAutosize
            onChange={handleTextFieldLyricsChange}
            aria-label="empty textarea"
            placeholder="Lyrics"
            style={{ width: "100%", height: "10rem" }}
          />
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

const dataSearch: any = [
  { name: "The Shawshank Redemption", id: 1994 },
  { name: "The Godfather", id: 1972 },
  { name: "The Godfather: Part II", id: 1974 },
  { name: "The Dark Knight", id: 2008 },
  { name: "12 Angry Men", id: 1957 },
  { name: "Schindler's List", id: 1993 },
  { name: "Pulp Fiction", id: 1994 },
];
