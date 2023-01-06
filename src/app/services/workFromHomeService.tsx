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
const getMyRequest = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get(`/work/${id}`);
      console.log(res.data.data, "res for wfh");

      resolve(res.data.data);
    } catch (error) {
      console.log(error, "errrrr");

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
    console.log("past history");

    try {
      let res = await api.get(`/work/past/${id}?fiscal_year=079-080`);
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
};
