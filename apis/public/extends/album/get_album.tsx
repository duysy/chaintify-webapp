import common from "../../common";
export async function detail(id: number) {
  const res = await common.get(`/public/extends/albums/${id}/`);
  return res.data;
}

export async function getAlbumByArtist(id: number) {
  const res = await common.get(`/public/extends/get-album-by-artist/?id=${id}`);
  return res.data;
}
