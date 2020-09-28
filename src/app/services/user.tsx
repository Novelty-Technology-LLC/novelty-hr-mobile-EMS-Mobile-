import { api } from '../api/api';

const create = async (data: object) => {
  return new Promise((resolve, reject) => {
    api
      .post('/add', data)
      .then(() => resolve())
      .catch(() => reject());
  });
};

const get = () => {};

export { create, get };
