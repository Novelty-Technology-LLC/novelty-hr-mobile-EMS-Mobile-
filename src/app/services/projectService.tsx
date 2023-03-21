import { api } from "../api/api";

export const getAllProjects = (user_id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/project/user/${user_id}`); // REPLACE: /project/self
      // let res = await api.get(`/project/`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
