import { api } from '../api/api';

export const updateImage = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.post(`/user/updateimage/${id}`, data);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const updateBirthday = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.post(`/user/updatebirthday/${id}`, {
        date: data,
      });
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
