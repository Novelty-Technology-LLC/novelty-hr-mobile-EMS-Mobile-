import axios from "axios";
import { getToken } from "../utils";
import { BASE_URI, COSMIC_URI } from "./uri";

export const api = axios.create({
  baseURL: BASE_URI,
});

export const cosmic_api = axios.create({
  baseURL: COSMIC_URI,
});

api.interceptors.request.use(
  async (config) => {
    config.headers["requestsource"] = "localhost";
    return config;
  },
  (err) => {
    return Promise.reject();
  }
);

api.interceptors.request.use(async (req) => {
  let userToken = await getToken();

  req.headers.authorization = userToken;
  req.headers["requestsource"] = "localhost";
  req.headers["Accept"] = "application/json";
  req.headers["Content-Type"] = "application/json";
  req.headers["Cache-Control"] = "no-cache";
  req.headers["Pragma"] = "no-cache";
  req.headers["Expires"] = "0";
  return req;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const error = err.toJSON();
    if (error.message === "Network Error") {
      throw "Please check your connection.";
    }
    throw error;
  }
);
