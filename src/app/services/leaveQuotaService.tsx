import { api } from '../api/api';

export const getLeaveQuota = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get('/leavequota');
      resolve(res.data.result);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
