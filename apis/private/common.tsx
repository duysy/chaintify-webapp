import axios from "axios";
import Router from "next/router";
// export default axios.create({
//   baseURL: "http://127.0.0.1:8000/music/api/",
//   headers: {
//     // Accept: "application/json",
//     // "Content-type": "application/json",
//     Authorization: "Token 1cd49795778c948b06ed169e1be5b4d182e56216",
//   },
// });

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const authorization = localStorage.getItem("Authorization");
    config.baseURL = "http://127.0.0.1:8000/music/api/";
    config.headers = {
      Authorization: authorization,
      Accept: "application/json",
    };
    return config;
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
      console.log("Please auth");
      // let value = confirm("Bạn chưa cài metamask, cài metamask");
      // if (value) Router.push("/login");
      // localStorage.removeItem("Authorization");
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
