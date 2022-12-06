import common from "../../common";
export async function list({ depth = 0, limit = 1000, offset = 0 }) {
  const res = await common.get(`/models/private/albums/?depth=${depth}&limit=${limit}&offset=${offset}`);
  return res.data;
}
export async function detail(id: number, { depth = 0 }) {
  const res = await common.get(`/models/private/albums/${id}/?depth=${depth}`);
  return res.data;
}