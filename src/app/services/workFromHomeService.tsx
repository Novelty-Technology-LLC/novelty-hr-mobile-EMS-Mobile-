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
      console.log(res.data.data, "res.data.data");

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};
export { createWork, getWork, getQuota, postWFHRequest };
