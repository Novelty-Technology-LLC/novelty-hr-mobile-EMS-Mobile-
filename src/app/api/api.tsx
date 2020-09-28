import axios from 'axios';
import { getToken } from '../utils';
import { BASE_URI } from './uri';

export const api = axios.create({
  baseURL: BASE_URI,
});

api.interceptors.request.use(
  async (config) => {
    config.headers['requestsource'] = 'localhost';
    return config;
  },
  (err) => {
    return Promise.reject();
  }
);

api.interceptors.request.use(async (req) => {
  let userToken = await getToken();
  req.headers.authorization = userToken;
  return req;
});
