import { eligibility_determination } from "../helper.js/eligibility-helper";

// ✅ 1. Check Eligibility for Case Number
export const checkEligibility = (caseNo) => {
  return eligibility_determination
    .get(`/checkEligibility/${caseNo}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error checking eligibility:", error);
      throw error;
    });
};

// ✅ 2. Get All Citizen Data
export const getCitizensData = () => {
  return eligibility_determination
    .get(`/getCitizensData`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching citizens data:", error);
      throw error;
    });
};
