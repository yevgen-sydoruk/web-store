import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

// $authHost.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {
//           withCredentials: true,
//         });
//         localStorage.setItem("token", response.data.accessToken);
//         console.log(localStorage.getItem("token"));
//         return $authHost.request(originalRequest);
//       } catch (e) {
//         console.log("НЕ АВТОРИЗОВАН");
//       }
//     }
//     throw error;
//   }
// );

export { $host, $authHost };
