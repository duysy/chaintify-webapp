import common from "../../common";
type TCreateArtist = {
  name: string;
  description: string;
  cover: string;
};
export async function create(artist: TCreateArtist) {
  const res = await common.post("/models/artists/", artist);
  return res.data;
}
