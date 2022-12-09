import common from "../../common";
export async function pinMetadata(id: number) {
  const res = await common.get(`/private/nft/pin-metadata/${id}/`);
  return res.data;
}
export async function detail(id: number) {
  const res = await common.get(`/private/nft/metadata/${id}/`);
  return res.data;
}
export async function updateStatus(id: number) {
  const res = await common.post(`/private/nft/update-mint-nft/`, { id: id });
  return res.data;
}
