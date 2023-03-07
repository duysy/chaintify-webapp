import common from "../../common";
export async function detail(id: number) {
  const res = await common.get(`/private/extends/albums/${id}/`);
  return res.data;
}
