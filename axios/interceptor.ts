// import { useAuth } from "@/store/auth/useAuth";
import { getStorage, removeStorage, setStorage } from "@/store/local";
import axios from "axios";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3200";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/api/v1";

const baseURL = `${DOMAIN}${BASE_PATH}` || "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getStorage("accessToken")}`,
  },
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }

        removeStorage("accessToken");

        return Promise.reject(new Error("Session expired please login again"));
      } catch (refreshError) {
        removeStorage("accessToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${baseURL}/admins/auth/refresh`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.data.success && response.data.tokens?.accessToken) {
      setStorage("accessToken", response.data.tokens.accessToken);
      return response.data.tokens.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Failed to refresh token: ", error);
    return null;
  }
};

export default api;
