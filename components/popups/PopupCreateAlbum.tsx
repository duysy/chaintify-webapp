import * as React from "react";
import { useState, useEffect } from "react";
import { TextField, Dialog, Typography, Button, Box, Stack, TextareaAutosize, Autocomplete, Chip, Avatar, Checkbox } from "@mui/material";

import { useRouter } from "next/router";
import Image from "next/image";
import { list as listArtistPublic } from "../../apis/public/models/artist/get_artist";
import { create as createAlbumPrivate, TCreateAlbum } from "../../apis/private/models/album/post_album";
import config from "../../config";
import FileUpload from "../../components/FileUpload";
import { useQuery, useQueryClient, useMutation } from "react-query";

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
export default function PopupCreateAlbum(props: Props) {
  const router = useRouter();

  const [artists, setArtists] = useState([]);
  const [createSong, setCreateSong] = useState<TCreateAlbum | {}>({});
  const [artistsPicker, setArtistsPicker] = useState<any[]>([]);
  const [pathImage, setPathImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const queryClient = useQueryClient();

  const handleClose = () => props.setOpen(false);
  const handleTextFieldNameChange = (event: any) => {
    const name = event.target.value;
    const createSong_ = { ...createSong, ...{ name: name } };
    setCreateSong(createSong_);
  };

  const handleAutoCompleteArtistChange = (event: any, value: any) => {
    if (!value) return;
    const artistId: number = value.id;
    const artistLabel: number = value.label;

    const artistsPicker_: any[] = [
      ...artistsPicker,
      ...[
        {
          id: +artistId,
          name: artistLabel,
        },
      ],
    ];
    const uniqueData = [...artistsPicker_.reduce((map, obj) => map.set(obj.id, obj), new Map()).values()];

    // console.log(uniqueData);
    setArtistsPicker(uniqueData);
  };

  useEffect(() => {
    const createSong_ = { ...createSong, ...{ cover: pathImage } };
    setCreateSong(createSong_);
  }, [pathImage]);
  const handleTextFieldDescriptionChange = (event: any) => {
    const description = event.target.value;
    const createSong_ = { ...createSong, ...{ description: description } };
    setCreateSong(createSong_);
  };

  const mutationSubmit = useMutation((data: any) => createAlbumPrivate(data), {
    onSuccess: (data) => {
      if (data) {
        // console.log("createAlbum", data);
        handleClose();
        router.push(`/album/${data.id}`);
        queryClient.invalidateQueries(["listAlbumPrivate_0_5_0"]);
      } else {
        alert("Fail");
      }
    },
  });

  const handleSubmit = async () => {
    const createSong_ = { ...createSong, ...{ isPublic: isPublic } };
    // console.log(createSong_)
    mutationSubmit.mutate(createSong_);
  };

  const handelCheckBoxIsPrivateChange = (event: any) => {
    const isPublic_ = event.target.checked;
    // console.log(isPublic_);
    setIsPublic(isPublic_);
  };
  useEffect(() => {
    const artistIds_ = artistsPicker.map((item: any) => {
      return item.id;
    });
    const createSong_ = { ...createSong, ...{ artist: artistIds_ } };
    setCreateSong(createSong_);
  }, [artistsPicker]);

  const queryArtist = useQuery(
    ["listArtistPublic_0_1000_0"],
    async () => {
      return await listArtistPublic({ depth: 0, limit: 1000, offset: 0 });
    },
    {
      onSuccess: (data) => {
        let artist_ = data.results.map((item: any, index: any) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
        setArtists(artist_);
      },
    }
  );

  return (
    <Dialog onClose={handleClose} open={props.open} sx={{ zIndex: 2000 }} keepMounted={false}>
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
        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
          }}
        >
          Tạo album
        </Typography>
        <Stack
          spacing={3}
          direction="column"
          sx={{
            color: "text.primary",
          }}
        >
          <TextField label="Name" variant="standard" onChange={handleTextFieldNameChange} />
          <Box>
            {artistsPicker &&
              artistsPicker.map((item) => {
                const id = item.id;
                const name = item.name;
                return <Chip key={id} avatar={<Avatar>{`${id}`}</Avatar>} label={`${name}`} sx={{ margin: "2px" }} />;
              })}
            {artistsPicker.length > 0 && (
              <Button
                onClick={() => {
                  setArtistsPicker([]);
                }}
              >
                Clear
              </Button>
            )}

            {artists && (
              <Autocomplete
                disablePortal
                onChange={handleAutoCompleteArtistChange}
                options={artists.map((option: any) => ({
                  label: option.name,
                  id: option.id,
                }))}
                renderInput={(params) => <TextField {...params} label="Artist" variant="standard" />}
              />
            )}
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
            <FileUpload setPath={setPathImage} accept=".png, .jpg, .jpeg" title={"Pick a image"} />
          </Box>

          <TextareaAutosize
            onChange={handleTextFieldDescriptionChange}
            aria-label="empty textarea"
            placeholder="Description"
            style={{ width: "100%", height: "10rem" }}
          />
          <Stack direction="row">
            <Checkbox value={isPublic} defaultChecked={true} onChange={handelCheckBoxIsPrivateChange} />
            <Typography sx={{ textAlign: "center", lineHeight: "3rem", height: "3rem" }} variant="inherit">
              Mọi người có thể truy cập album này
            </Typography>
          </Stack>
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
