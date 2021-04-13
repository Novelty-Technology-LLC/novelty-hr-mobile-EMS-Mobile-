import { api } from '../api/api';

const createWork = async (data: object) => {
  return new Promise((resolve, reject) => {
    api
      .post('/work', data)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getWork = async (data: object) => {
  return new Promise((resolve, reject) => {
    api
      .get('/work', {
        params: {
          data,
        },
      })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export { createWork, getWork };
