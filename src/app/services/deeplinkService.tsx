import { api } from "../api/api";

export const getLeave = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get(`/leave/pushLeave/${id}`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export { getLeave };
