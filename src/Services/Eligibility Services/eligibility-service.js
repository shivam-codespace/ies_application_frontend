import { eligibility_determination } from "../helper.js/eligibility-helper";

// Check eligibility for a specific case
export const checkEligibility = async (caseNo) => {
  try {
    const response = await eligibility_determination.get(`/checkEligibility/${caseNo}`);
    return response.data;
  } catch (error) {
    console.error("Error checking eligibility:", error);
    throw error;
  }
};

// Get all citizens data (Admin only)
export const getAllCitizensData = async () => {
  try {
    const response = await eligibility_determination.get("/getCitizensData");
    return response.data;
  } catch (error) {
    console.error("Error fetching citizens data:", error);
    throw error;
  }
};
