import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Wrap from "../wrap";

import { useQuery, useMutation } from "react-query";
import { get as getArtistPrivate } from "../../apis/private/extends/artist/get_artist";
import { create_or_update as create_or_updateArtistPrivate, TCreateArtist } from "../../apis/private/extends/artist/post_artist";
import ReviewProfile from "./review";
import EditProfile from "./edit";
import { Typography } from "@mui/material";
type TOptionProfile = "EDIT" | "REVIEW" | "BECOME_ARTIST";
export default function ProfileView() {
  const [name, setName] = useState("No Name");
  const [description, setDescription] = useState("No Description");
  const [pathImage, setPathImage] = useState(null);
  const [option, setOption] = useState<TOptionProfile>("EDIT");

  const handelReviewButtonCLick = () => setOption("REVIEW");
  const handelEditButtonCLick = () => setOption("EDIT");
  const mutationArtist = useMutation([""], (data: any) => create_or_updateArtistPrivate(data), {
    onSuccess: () => {
      setOption("REVIEW");
      alert("Success");
    },
  });
  const queryArtist = useQuery(
    ["getArtistPrivate"],
    async () => {
      return await getArtistPrivate();
    },
    {
      onSuccess: (data: any) => {
        if (data.status == "You not registry artist") {
          setOption("BECOME_ARTIST");
        } else {
          setOption("REVIEW");
          setName(data.name);
          setPathImage(data.cover);
          setDescription(data.description);
        }
      },
    }
  );
  const submitInfo = () => {
    if (!name || !pathImage || !description) return;
    const artist_: TCreateArtist = { name: name, cover: pathImage, description: description };
    mutationArtist.mutate(artist_);
  };
  if (option == "BECOME_ARTIST")
    return (
      <Wrap>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={{ width: "100%", height: "300px" }}>
          <Typography sx={{ color: "text.primary" }}>Bạn không phải là nghệ sỹ</Typography>
          <Button onClick={handelEditButtonCLick}>Trở thành nghệ sỹ</Button>
        </Box>
      </Wrap>
    );

  return (
    <Wrap>
      {option == "REVIEW" && <ReviewProfile name={name} description={description} pathImage={pathImage} />}
      {option == "EDIT" && (
        <EditProfile
          setName={setName}
          name={name}
          setDescription={setDescription}
          description={description}
          pathImage={pathImage}
          setPathImage={setPathImage}
        />
      )}

      <Box display={"flex"} alignItems={"center"} justifyContent={"space-around"} style={{ width: "10rem" }}>
        {option == "REVIEW" && (
          <Button variant="outlined" onClick={handelEditButtonCLick}>
            EDIT
          </Button>
        )}
        {option == "EDIT" && (
          <Button variant="outlined" onClick={handelReviewButtonCLick}>
            REVIEW
          </Button>
        )}

        <Button variant="outlined" onClick={submitInfo}>
          Save
        </Button>
      </Box>
    </Wrap>
  );
}
