import common from "../../common";
type TGetNone = {
  address: string;
};
export async function get(data: TGetNone) {
  const res = await common.get(`/private/auth/?address=${data.address}`);
  return res.data;
}
