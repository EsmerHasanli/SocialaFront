import axios from "axios";

export const API_BASE_URL = "https://localhost:7023/api";

const $api = axios.create({
  baseURL: API_BASE_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${JSON.parse(
    localStorage.getItem("token")
  )}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._IsRetry
    ) {
      originalRequest._IsRetry = true;
      try {
        let token = null;
        var cookiesArray = document.cookie.split("; ");
        for (var i = 0; i < cookiesArray.length; i++) {
          var cookie = cookiesArray[i].split("=");
          if (cookie[0] === "RefreshToken") {
            token = decodeURIComponent(cookie[1]);
          }
        }
        console.log(token);
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh/${token}`
        );
        console.log(response.data);
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.accessToken)
        );
        document.cookie = `RefreshToken=${response.data.refreshToken};expires=${response.data.expiresAt}`;
        return $api.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }

    throw error;
  }
);

export default $api;
