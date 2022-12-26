import common from "../common";
type TCreate = {
  formData: any;
};
export async function create({ formData }: TCreate, setPresent: any) {
  const response = await common.post("/private/upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (data: any) => {
      const present = Math.round((100 * data.loaded) / data.total);
      setPresent?.(present);
    },
  });
  return response.data;
}
