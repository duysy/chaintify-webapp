import common from "../../common";
export type TCreateAlbum = {
  name: string;
  artist: number[];
  cover: string;
  description: string;
  isPublic: boolean;
};

export async function create(album: TCreateAlbum) {
  const res = await common.post("/models/private/albums/", album);
  return res.data;
}
