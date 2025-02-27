import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) {
//           throw new Error("Нема освежен токен");
//         }

//         const response = await axios.post(
//           "http://localhost:8080/api/auth/refresh",
//           {
//             refreshToken,
//           }
//         );

//         localStorage.setItem("accessToken", response.data.accessToken);
//         localStorage.setItem("refreshToken", response.data.refreshToken);
//         originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//         return axios(originalRequest);
//       } catch (refreshError) {
//         console.error("Failed to refresh token:", refreshError);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/sign-in";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Access token expired, attempting to refresh...");
      try {
        const refreshResponse = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          { refreshToken: localStorage.getItem("refreshToken") },
          { withCredentials: true }
        );

        console.log(
          "New access token obtained:",
          refreshResponse.data.accessToken
        );

        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
        localStorage.setItem("refreshToken", refreshResponse.data.refreshToken);

        // Повторно испрати го истото барање со нов accessToken
        error.config.headers[
          "Authorization"
        ] = `Bearer ${refreshResponse.data.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("Refresh token is invalid. Logging out...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
