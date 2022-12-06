import common from "../common";
type TCreate = {
  formData: any;
};
export async function create({ formData }: TCreate) {
  const response = await common.post("/private/upload/", formData);
  return response.data;
}
