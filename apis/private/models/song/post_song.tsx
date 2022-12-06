import common from "../../common";
export type TCreateSong = {
  album: number | null;
  artist: number[] | null;
  name: string | null;
  cover: string | null;
  length: number | null;
  track: number | null;
  disc: number | null;
  lyrics: string | null;
  path: string | null;
  mtime: number | null;
};
export async function create(song: TCreateSong) {
  try {
    const res = await common.post("/models/songs/", song);
    return res.data;
  } catch (error) {}
}
