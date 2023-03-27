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
import { useAuth } from "../../contexts/useAuth";

import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
};
export default function PopupCreateAlbum(props: Props) {
  const { isLogin } = useAuth();
  const router = useRouter();

  const [artists, setArtists] = useState([]);
  const [artistsPicker, setArtistsPicker] = useState<any[]>([]);
  const [pathImage, setPathImage] = useState("");

  const queryClient = useQueryClient();

  const handleClose = () => props.setOpen(false);

  const schema = yup.object().shape({
    name: yup.string().required(),
    artist: yup.array().required(),
    cover: yup.string().required(),
    description: yup.string().min(20),
    isPublic: yup.boolean(),
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

  const mutationSubmit = useMutation((data: any) => createAlbumPrivate(data), {
    onSuccess: (data) => {
      if (data) {
        // console.log("createAlbum", data);
        handleClose();
        // router.push(`/album/${data.id}`);
        queryClient.invalidateQueries(["listAlbumPrivate_0_1000_0"]);
        queryClient.invalidateQueries(["listAlbumPrivate_0_5_0"]);
      } else {
        alert("Fail");
      }
    },
  });
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
      enabled: !!isLogin,
    }
  );

  const onSubmit = async (data: any) => {
    console.log(data);
    mutationSubmit.mutate(data);
  };

  useEffect(() => {
    setValue("cover", pathImage);
  }, [pathImage]);

  useEffect(() => {
    const artistIds_ = artistsPicker.map((item: any) => {
      return item.id;
    });
    if (artistIds_.length > 0) setValue("artist", artistIds_);
  }, [artistsPicker]);

  return (
    <Dialog onClose={handleClose} open={props.open} sx={{ zIndex: 2000 }} keepMounted={false}>
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
          Create album
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
                <TextField sx={{ width: "100%" }} label="Name" variant="standard" onChange={onChange} value={value} />
                <Typography color="red">{errors.name?.message as any}</Typography>
              </Box>
            )}
          />

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
            <Typography color="red">{errors.artist?.message as any}</Typography>
          </Box>

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
            <FileUpload setPath={setPathImage} accept=".png, .jpg, .jpeg" title={"Pick a image"} setName={null} />
            <Typography color="red">{errors.cover?.message as any}</Typography>
          </Box>

          <Controller
            name={"description"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Box sx={{ width: "100%" }}>
                <TextareaAutosize
                  onChange={onChange}
                  value={value}
                  aria-label="empty textarea"
                  placeholder="Description"
                  style={{ width: "100%", height: "10rem" }}
                />
                <Typography color="red">{errors.description?.message as any}</Typography>
              </Box>
            )}
          />

          <Box>
            <Stack direction="row">
              <Controller
                name={"isPublic"}
                control={control}
                render={({ field: { onChange, value } }) => <Checkbox value={value} defaultChecked onChange={onChange} />}
              />
              <Typography sx={{ textAlign: "center", lineHeight: "3rem", height: "3rem" }} variant="inherit">
                Everyone can access this album
              </Typography>
            </Stack>
            <Typography color="red">{errors.isPublic?.message as any}</Typography>
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
