import { api } from "../api/api";
import { dataType } from "../interface";

export const getAllRequests = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/leave/admin/${id}`); // REPLACE: /leave/admin-self
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const getMyRequests = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/leave/user/${id}`); // REPLACE: /leave/self
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const getPastRequests = (id: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/leave/past/${id}`); // REPLACE: /leave/past-self
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const postRequest = (data: object) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.post("/leave", data);
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

export const updateRequest = (id: number, data: dataType) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.put(`/leave/update/${id}`, data);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const editRequest = (id: number, data: dataType) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.put(`/leave/${id}`, data);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const checkRequest = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/leave/check/${id}`);

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export const cancelLeave = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.put(`/leave/cancel/${id}`);

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
