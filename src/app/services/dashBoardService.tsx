import { api } from "../api/api";
import { getToday } from "../utils";

const getDashboard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.get("/dashboard", {
        params: {
          todayDate: getToday(),
        },
      });
      console.log("res => ", res.data.data);

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export { getDashboard };
