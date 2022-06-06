import { api } from "../api/api";

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

export const getFilteredTimeLogs = (
  id: number,
  datefilter: any,
  selectedDate?: any,
  historyDate?: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/timelog/filter/${id}`, {
        params: { datefilter, selectedDate, historyDate },
      });
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const postTimeLog = (data: object) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.post("/timelog", data);
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

export const submitTimeLog = (
  values: Object,
  selectedDate: any,
  historyDate: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(values, "values");

      let res = await api.post(`/timelog/submitlog_new/`, {
        values,
        params: { selectedDate, historyDate },
      });

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const getHash = (params: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/timelog/check/${params}`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
