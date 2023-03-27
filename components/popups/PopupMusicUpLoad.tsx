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
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
};
export default function PopupMusicUpLoad(props: Props) {
  const { isLogin } = useAuth();

  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [pathSong, setPathSong] = useState("");
  const [pathImage, setPathImage] = useState("");
  const audioRef: any = useRef();
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    name: yup.string().required(),
    album: yup.number().optional(),
    artist: yup.array().optional(),
    path: yup.string().required(),
    cover: yup.string().optional(),
    lyrics: yup.string().min(20).optional(),
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
        queryClient.invalidateQueries(["detailAlbum"]);
      } else {
        alert("Fail");
      }
    },
  });

  const handleClosePopUp = () => props.setOpen(false);
  const handleAutoCompleteAlbumChange = (event: any, value: any) => {
    if (!value) return;
    const album: number = value.id;
    setValue("album", album);
  };
  const handleAutoCompleteArtistChange = (event: any, value: any) => {
    if (!value) return;
    const artist: number = value.id;
    setValue("artist", [artist]);
  };
  const setName = (name: any) => {
    setValue("name", name);
  };
  useEffect(() => {
    setValue("path", pathSong);
  }, [pathSong]);

  useEffect(() => {
    setValue("cover", pathImage);
  }, [pathImage]);

  const onSubmit = async (data: any) => {
    const addMore = {
      length: audioRef?.current?.duration | 0,
      track: 1,
      disc: 1,
      mtime: 1,
      album: null,
      artist: [],
      cover: null,
    };
    const createSong_ = { ...addMore, ...data };
    mutationSubmit.mutate(createSong_);
  };

  return (
    <Dialog onClose={handleClosePopUp} open={props.open} sx={{ zIndex: 2000 }}>
      <Box
        sx={{
          position: "relative",
          width: { xs: "80vw", md: "500px" },
          height: "auto",
          bgcolor: "background.default",
          boxShadow: 24,
          p: 3,
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
          Upload music
        </Typography>
        <Stack
          spacing={3}
          direction="column"
          sx={{
            color: "text.primary",
          }}
        >
          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Box sx={{ width: "100%" }}>
                <TextField sx={{ width: "100%" }} label="Name" variant="standard" onChange={onChange} value={value ? value : ""} />
                <Typography color="red">{errors.name?.message as any}</Typography>
              </Box>
            )}
          />

          <Box>
            {queryAlbum.isSuccess ? (
              <Autocomplete
                disablePortal
                onChange={handleAutoCompleteAlbumChange}
                options={albums.map((option: any) => ({
                  label: option.name,
                  id: option.id,
                }))}
                renderInput={(params: any) => <TextField {...params} label="Album (Optional)" variant="standard" />}
              />
            ) : (
              <>
                <CircularProgress />
                <Typography>Loading albums</Typography>
              </>
            )}
            <Typography color="red">{errors.album?.message as any}</Typography>
          </Box>

          <Box>
            {queryArtist.isSuccess ? (
              <Autocomplete
                disablePortal
                onChange={handleAutoCompleteArtistChange}
                options={artists.map((option: any) => ({
                  label: option.name,
                  id: option.id,
                }))}
                renderInput={(params: any) => <TextField {...params} label="Artist (Optional)" variant="standard" />}
              />
            ) : (
              <>
                <CircularProgress />
                <Typography>Loading artists</Typography>
              </>
            )}
            <Typography color="red">{errors.artist?.message as any}</Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"space-around"}
            sx={{ border: "1px solid", borderColor: "text.primary", padding: "1rem 0", margin: "1rem 0" }}
          >
            {pathSong && (
              <audio controls ref={audioRef} src={`${config.MUSIC_URL}${pathSong}`}>
                <source src="" type="audio/mp3" />
              </audio>
            )}
            <br />
            <FileUpload setPath={setPathSong} accept=".mp3" title={"Pick a music"} setName={setName} />
            <Typography color="red">{errors.path?.message as any}</Typography>
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
            <FileUpload setPath={setPathImage} accept=".png,.jpeg,.jpg" title={"Pick a image cover (Optional)"} setName={null} />
            <Typography color="red">{errors.cover?.message as any}</Typography>
          </Box>

          <Box>
            <Controller
              name={"lyrics"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextareaAutosize
                  onChange={onChange}
                  value={value}
                  aria-label="empty textarea"
                  placeholder="Lyrics (Optional)"
                  style={{ width: "100%", height: "10rem" }}
                />
              )}
            />
            <Typography color="red">{errors.lyrics?.message as any}</Typography>
          </Box>

          <Button type="button" onClick={handleSubmit(onSubmit)}>
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
