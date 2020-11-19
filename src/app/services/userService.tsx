import { api } from '../api/api';

const create = async (data: object) => {
  return new Promise((resolve, reject) => {
    api
      .post('/user/add', data)
      .then((data) => resolve(data))
      .catch((err) => console.log('err - > ', err));
  });
};

const store = (data) => {
  return new Promise((resolve, reject) => {
    api
      .post('/user/storeToken', data)
      .then((data) => resolve(data))
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

export { create, store, get };
