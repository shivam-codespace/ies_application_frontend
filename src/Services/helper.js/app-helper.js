import axios from "axios";

export const APPLICATION_REGISTRACTION_API_URL = 
  import.meta.env.VITE_AR_API_URL || "http://localhost:9092";

export const app_registration = axios.create({
    baseURL: APPLICATION_REGISTRACTION_API_URL,
});

// ✅ Add request interceptor for JWT token
app_registration.interceptors.request.use(
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
app_registration.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);