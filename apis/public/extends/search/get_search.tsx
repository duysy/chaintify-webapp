import common from "../../common";
export async function search(text: string) {
  const res = await common.get(`/public/extends/search/?text=${text}`);
  return res.data;
}
