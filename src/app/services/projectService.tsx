import { api } from '../api/api';

export const getAllProjects = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/project`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
