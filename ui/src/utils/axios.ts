import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const redirectToLoginIfNeeded = () => {
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          if (response.status === 200) {
            localStorage.setItem("access_token", response.data.access);
            api.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
            originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;

            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error(refreshError);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          redirectToLoginIfNeeded();
        }
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        redirectToLoginIfNeeded();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
