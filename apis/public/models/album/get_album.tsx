import common from "../../common";
export async function list({ depth = 0, limit = 1000, offset = 0 }) {
  const res = await common.get(`/models/public/albums/?depth=${depth}&limit=${limit}&offset=${offset}`);
  return res.data;
}
