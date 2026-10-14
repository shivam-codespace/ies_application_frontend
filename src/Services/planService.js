import axiosInstance from "../api/axiosInstance";

export const planService = {
  // Create new plan (Admin only)
  createPlan: async (planData) => {
    try {
      const response = await axiosInstance.post("/plan", planData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all plans
  getAllPlans: async () => {
    try {
      const response = await axiosInstance.get("/plans");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get plan by ID
  getPlanById: async (planId) => {
    try {
      const response = await axiosInstance.get(`/plan/${planId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update plan status (Admin only)
  updatePlanStatus: async (planId, status) => {
    try {
      const response = await axiosInstance.put(`/plan/${planId}/${status}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
