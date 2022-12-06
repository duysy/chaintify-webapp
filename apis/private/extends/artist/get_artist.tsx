import common from "../../common";
export async function get() {
  const res = await common.get(`/private/extends/artists/`);
  return res.data;
}
