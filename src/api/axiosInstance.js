import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9091";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR - Add JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login/unlock/recover return 401/403/404 for bad input, not for an expired session.
// Their callers show the backend message themselves.
const AUTH_ENDPOINTS = ["/login", "/unlock", "/recover-password"];

// RESPONSE INTERCEPTOR - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (AUTH_ENDPOINTS.includes(error.config?.url)) {
      return Promise.reject(error);
    }

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          toast.error("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/";
          break;
        case 403:
          toast.error("Access denied");
          break;
        case 404:
          toast.error("Resource not found");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error(data?.message || "Something went wrong");
      }
    } else if (error.request) {
      toast.error("Network error. Check your connection.");
    } else {
      toast.error("Request failed");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
