import axios from "axios";

export const get = async (api: string) => {
  return await axios.get(api);
};
