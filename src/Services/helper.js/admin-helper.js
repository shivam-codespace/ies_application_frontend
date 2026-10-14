import axios from "axios";

export const ADMIN_API_URL = 
  import.meta.env.VITE_ADMIN_API_URL || "http://localhost:9091";

export const admin = axios.create({
    baseURL: ADMIN_API_URL,
});

// ✅ Add request interceptor for JWT token
admin.interceptors.request.use(
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

// ✅ Add response interceptor for error handling
admin.interceptors.response.use(
  (response) => response,
  (error) => {
    // Login/unlock/recover use 401 for bad credentials, not an expired session
    const isAuthEndpoint = ["/login", "/unlock", "/recover-password"].includes(error.config?.url);
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);