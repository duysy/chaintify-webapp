import common from "../../common";

export async function deleteAlbum(id: number) {
  const res = await common.delete(`/models/private/albums/${id}/`);
  return res.data;
}
