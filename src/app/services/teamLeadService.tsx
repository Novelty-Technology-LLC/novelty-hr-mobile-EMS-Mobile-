import { api } from '../api/api';

const getlead = () => {
  return new Promise((resolve, reject) => {
    api
      .get(`/teamlead`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => reject(err));
  });
};

export { getlead };
