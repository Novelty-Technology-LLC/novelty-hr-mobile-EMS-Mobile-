import { api } from '../api/api';

const create = async (data: object) => {
  return new Promise((resolve, reject) => {
    api
      .post('/user/add', data)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const get = () => {};

export { create, get };
