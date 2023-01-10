import { api } from "../api/api";

//need to implement all the requests common
export const getRequest = (path: string, query?: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(path);

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
