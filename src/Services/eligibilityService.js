import axiosInstance from "../api/axiosInstance";

export const eligibilityService = {
  // Check eligibility for a case
  checkEligibility: async (caseNo) => {
    try {
      const response = await axiosInstance.get(`/checkEligibility/${caseNo}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all citizens data for eligibility determination
  getAllCitizensData: async () => {
    try {
      const response = await axiosInstance.get("/getCitizensData");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
