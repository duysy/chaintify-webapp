import React, { useState } from "react";
import { useQuery } from "react-query";
import { list as listSongPublic } from "../../apis/public/models/song/get_song";
import MusicList from "../../components/MusicList";
import Wrap from "../wrap";
import config from "../../config";
export default function NewSongView() {
  const [songs, setSongs] = useState([]);
  useQuery(
    [""],
    async () => {
      return await listSongPublic({ depth: 1 });
    },
    {
      onSuccess: (data) => {
        console.log(data);
        let songs_ = data.results.map((item: any, index: any) => {
          return {
            id: item.id,
            name: item.name,
            cover: `${config.IMAGE_URL}${item.cover}`,
            artist: item?.artist && item.artist.map((item: any) => item.name).join("|"),
            album: item?.album.name,
            time: item.length,
            favorite: true,
            checkBoxStatus: false,
          };
        });

        // console.log(songs_);
        setSongs(songs_);
      },
    }
  );
  return (
    <Wrap>
      <MusicList list={songs} />
    </Wrap>
  );
}
