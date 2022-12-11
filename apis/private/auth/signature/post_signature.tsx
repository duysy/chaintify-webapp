import common from "../../common";
export type TCreateAlbum = {
  signature: string;
};
export async function create(signature: TCreateAlbum) {
  const res = await common.post("/private/auth/", signature);
  return res.data;
}
