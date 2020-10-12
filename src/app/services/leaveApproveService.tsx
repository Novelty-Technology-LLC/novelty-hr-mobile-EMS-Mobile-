import { api } from '../api/api';

export const getResponses = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/leaveapprove/${id}`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

