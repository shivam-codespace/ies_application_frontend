import axiosInstance from "../api/axiosInstance";

export const userService = {
  // Create user account (Admin only)
  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post("/user", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all users (Admin only)
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get("/users");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await axiosInstance.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user status (Admin only)
  updateUserStatus: async (userId, status) => {
    try {
      const response = await axiosInstance.put(`/user/${userId}/${status}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (userId, userData) => {
    try {
      const response = await axiosInstance.put(`/user/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
