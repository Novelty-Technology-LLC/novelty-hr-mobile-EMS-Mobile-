import { api } from '../api/api';

const getlead = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/teamlead/${id}`)
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err));
  });
};

export { getlead };


