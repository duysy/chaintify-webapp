import common from "../../common";
export type TCreatePlayList = {
  name: string;
  description: string;
  cover: string;
  isPublic: boolean;
};
export async function create(playlist: TCreatePlayList) {
  const res = await common.post("/models/public/playlists/", playlist);
  return res.data;
}
