import common from "../../common";
export async function getSongByArtist(id: number) {
  const res = await common.get(`/public/extends/get-song-by-artist/?id=${id}`);
  return res.data;
}
