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
    } catch (error) { }
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
        return reject(error.response.data);
      });
  });


export const createShoutout = async (props: {
  receiver: string,
  shoutout_from: string,
  shoutout: string,
  shoutout_date: string,
}) => {
  try {
    const data = JSON.stringify(props);

    const response = await api.post(`/shout-out`, data);

    return response.data.data;

  } catch (error) {
    throw { success: false, message: error };
  }

}
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
