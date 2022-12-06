import common from "../../common";
export type TCreateAlbum = {
  name: string;
  artist: number[];
  cover: string;
  description: string;
};
export async function create(album: TCreateAlbum) {
  const res = await common.post("/albums/", album);
  return res.data;
}
