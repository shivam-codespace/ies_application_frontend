import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
      return response.data;
    } catch (error) {
      // Invalid credentials (401) and locked accounts (403) come back as a LoginResponse body
      if (error.response?.data?.status) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Unlock Account
  unlockAccount: async (unlockData) => {
    try {
      const response = await axiosInstance.put(API_ENDPOINTS.UNLOCK, unlockData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Recover Password
  recoverPassword: async (email) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.RECOVER_PASSWORD, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get Dashboard
  getDashboard: async (email) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD(email));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await axiosInstance.post(API_ENDPOINTS.LOGOUT);
      localStorage.clear();
    } catch (error) {
      localStorage.clear(); // Clear even if API fails
      throw error;
    }
  },
};
