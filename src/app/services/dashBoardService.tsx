import { api } from '../api/api';
import { getToday } from '../utils';

const getDashboard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get('/dashboard', {
        params: {
          todayDate: getToday(),
        },
      });

      resolve(res.data.data);
    } catch (error) {
      console.log(error);

      reject({ success: false, message: error });
    }
  });
};

const getList = (route: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get(`/dashboard/${route}`, {
        params: {
          todayDate: getToday(),
        },
      });

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export { getDashboard, getList };
