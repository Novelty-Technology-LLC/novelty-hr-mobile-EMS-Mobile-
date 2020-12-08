import { api } from '../api/api';

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

export const editTimeLog = (id: number, data: object) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.put(`/timelog/${id}`, data);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const deleteTimeLog = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.delete(`/timelog/${id}`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const submitTimeLog = (values: Object) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.post(`/timelog/submit/`, values);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
