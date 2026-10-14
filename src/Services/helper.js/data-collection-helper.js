import axios from "axios";

export const DATA_COLLECTION_API_URL = 
  import.meta.env.VITE_DC_API_URL || "http://localhost:9093";

export const data_collection = axios.create({
    baseURL: DATA_COLLECTION_API_URL,
});

// ✅ Add request interceptor for JWT token
data_collection.interceptors.request.use(
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
data_collection.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);