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
export { createWork, getWork };
