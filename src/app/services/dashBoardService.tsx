import { api } from '../api/api';

export const getDashboard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get('/dashboard');
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export { getDashboard };
