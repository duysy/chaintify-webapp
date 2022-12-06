import common from "../../common";
export async function detail(id: number, { depth = 0 }) {
  const res = await common.get(`/public/extends/albums/${id}/?depth=${depth}`);
  return res.data;
}
