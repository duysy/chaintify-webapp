import axios from "axios";
import config from "../../config";
import Router from "next/router";
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (configAxios) => {
    const authorization = localStorage.getItem("Authorization");
    configAxios.baseURL = config.API_URL;
    configAxios.headers = {
      Authorization: authorization,
      Accept: "application/json",
    };
    return configAxios;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      // console.log("Please auth");
      Router.push("/login");
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
