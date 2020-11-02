import { cosmic_api } from '../api/api';

export const getLogin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await cosmic_api.get(`slug/ems-login`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
