import axios from "axios";

export const ELIGIBILITY_DETERMINATION_API_URL = 
  import.meta.env.VITE_ED_API_URL || "http://localhost:9094";

export const eligibility_determination = axios.create({
    baseURL: ELIGIBILITY_DETERMINATION_API_URL,
});

// ✅ Add request interceptor for JWT token
eligibility_determination.interceptors.request.use(
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
eligibility_determination.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);