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
      const res = await api.get(`/work/${id}`);

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

const getPastWFHRequests = (id: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/work/past/${id}?fiscal_year=079-080`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

const getAllWFHRequests = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/work/admin/${id}`);
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
      let res = await api.get(`/wfh-approve/${id}?user_id=${user_id}`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export {
  createWork,
  getWork,
  getQuota,
  postWFHRequest,
  getMyRequest,
  getPastWFHRequests,
  cancelWfh,
  updateWFHRequests,
  getAllWFHRequests,
  getWFHResponses,
};
