import common from "../../common";

export async function deletePlaylist(id: number) {
  const res = await common.delete(`/models/private/playlists/${id}/`);
  return res.data;
}
