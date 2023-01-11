import { api } from "../api/api";

export const getResponses = (id, user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get(`/leaveapprove/${id}`, {
        params: { user_id: user_id },
      });

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
