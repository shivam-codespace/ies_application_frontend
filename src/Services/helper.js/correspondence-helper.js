import axios from "axios";

export const CORRESPONDENCE_API_URL = 
  import.meta.env.VITE_CO_API_URL || "http://localhost:9095";

export const correspondence = axios.create({
    baseURL: CORRESPONDENCE_API_URL, // ✅ FIXED: Was using wrong URL (APPLICATION_REGISTRACTION_API_URL)
});

// ✅ Add request interceptor for JWT token
correspondence.interceptors.request.use(
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
correspondence.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);