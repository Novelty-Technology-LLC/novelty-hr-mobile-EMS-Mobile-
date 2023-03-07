import { api } from "../api/api";
import { navigate } from "../utils/navigation";

const create = async (data: object) => {
  return new Promise((resolve, reject) => {
    api
      .post("/user/login", data)
      .then((data) => resolve(data))
      .catch((err) => {
        reject(err);
      });
  });
};

const store = (data) => {
  return new Promise((resolve, reject) => {
    api
      .post("/user/storeToken", data)
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err));
  });
};

const get = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.get(`/user/${id}`);
      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

const logOutUser = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await api.post("/user/logout", body);

      resolve(res.data.data);
    } catch (error) {
      reject({ success: false, message: error });
    }
  });
};

export { create, store, get, logOutUser };
