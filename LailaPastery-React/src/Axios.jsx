import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization =
      "Bearer " + JSON.parse(localStorage.getItem("data")).token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: false,
});
