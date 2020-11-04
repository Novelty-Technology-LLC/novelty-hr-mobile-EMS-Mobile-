import { api } from '../api/api';

const create = async (data: object) => {
  return new Promise((resolve, reject) => {
    api
      .post('/user/add', data)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
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

export { create, store };
