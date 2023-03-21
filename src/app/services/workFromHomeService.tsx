import { api } from "../api/api";

const createWork = async (data: object) => {
  return new Promise((resolve, reject) => {
    api
      .post("/work", data)

      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getMyRequest = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get(`/work/${id}`); // REPLACE: /work/my

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

const getWfhDetail = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get(`/work/wfh/detail/${id}`);

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

const postWFHRequest = (data: object) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.post("/work", data);
      resolve(res);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

const getWork = (userId: number, date: any) =>
  new Promise((resolve, reject) => {
    api
      .get(`work?userId=${userId}&date=${date}`)
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getQuota = (id: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/wfh-quota/${id}`);

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

const cancelWfh = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.put(`/work/cancel/${id}`);

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
const deleteWfhRequest = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.delete(`/work/${id}`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
const checkWFHRequest = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/work/check/${id}`);

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
export const editRequestWfh = (id: number, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.put(`/work/${id}`, data);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
const getPastWFHRequests = (id: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/work/past/${id}`); // REPLACE: /work/past/my
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

const getAllWFHRequests = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/work/admin/${id}`); // REPLACE: /work/admin/my
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

const updateWFHRequests = (id: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.put(`/work/update/${id}`, data);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

const getWFHResponses = (id, user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/wfh-approve/${id}?user_id=${user_id}`); // REMOVABLE: user_id
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export {
  createWork,
  getWork,
  checkWFHRequest,
  getQuota,
  postWFHRequest,
  getMyRequest,
  getPastWFHRequests,
  cancelWfh,
  deleteWfhRequest,
  updateWFHRequests,
  getAllWFHRequests,
  getWFHResponses,
  getWfhDetail,
};
