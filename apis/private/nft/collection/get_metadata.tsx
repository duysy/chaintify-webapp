import common from "../../common";
export async function list(address:String) {
  const res = await common.get(`/public/nft/collection/?address=${address}`);
  return res.data;
}
