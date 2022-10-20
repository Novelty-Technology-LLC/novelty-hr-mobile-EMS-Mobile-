import { api } from "../api/api";
import { getToday, getYesterday } from "../utils";

const getDashboard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get("/dashboard", {
        params: {
          todayDate: getToday(),
        },
      });

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

const getList = (route: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get(`/dashboard/${route}`, {
        params: {
          todayDate: getToday(),
        },
      });

      resolve(res.data.data);
    } catch (error) {}
  });
};

export { getDashboard, getList };
export const addAnnouncementService = (body: any) =>
  new Promise((resolve, reject) => {
    api
      .post(`/webportal/announcements`, body)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        return reject(error.response.data);
      });
  });
export const updateAnnouncementService = (body: any, id: any) =>
  new Promise((resolve, reject) => {
    api
      .patch(`/webportal/announcements/${id}`, body)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.log(error, "error");

        return reject(error.response.data);
      });
  });
export const shoutOutService = (startDate: any, endDate: any) =>
  new Promise((resolve, reject) => {
    api
      .get(`/shout-out?${startDate}${endDate}`)
      .then((data) => {
        resolve(data.data.data.shoutOutData);
      })
      .catch((error) => {
        return reject(error.response.data);
      });
  });
