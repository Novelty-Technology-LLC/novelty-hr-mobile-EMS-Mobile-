import { api } from '../api/api';
import { dataType } from '../interface';

export const getAllTimeLogs = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/timelog/${id}`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const postTimeLog = (data: object) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.post('/timelog', data);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
