import { api } from '../api/api';

export const getMyRequests = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/leave/${id}`);
      resolve(res.data.result);
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
      resolve(res);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const deleteRequest = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.delete(`/leave/${id}`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const updateRequest = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/leave/${id}`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
