import common from "../../common";
export type TCreateArtist = {
  name: string;
  cover: string;
  description: string;
};
export async function create_or_update(album: TCreateArtist) {
  const res = await common.post("/private/extends/artists/", album);
  return res.data;
}
