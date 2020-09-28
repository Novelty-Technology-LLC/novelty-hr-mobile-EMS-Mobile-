import { api } from '../api/api';

export const getMyRequests = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get('/leavequota');
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const getPastRequests = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get('/leavequota');
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const postRequest = (data: object) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.post('/leave', data);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
