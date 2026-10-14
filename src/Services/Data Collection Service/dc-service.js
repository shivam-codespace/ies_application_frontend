// src/Services/dc-service.js
import { data_collection } from "../helper.js/data-collection-helper";

// All DC endpoints live under /ies_plans (DcRestController)
const BASE = "/ies_plans";

// Session key holding the case (AR application number) being worked on
export const CASE_KEY = "caseNumber";

// ✅ 1. Get all available plan names
export const getPlanNames = () => {
  return data_collection
    .get(`${BASE}/getPlanName`)
    .then((response) => response.data);
};

// ✅ 2. Save Selected Plan
export const saveSelectedPlan = (selectionPlan) => {
  return data_collection
    .post(`${BASE}/planInsertion`, selectionPlan)
    .then((response) => response.data);
};

// ✅ 3. Save Income Details
export const saveIncome = (incomeData) => {
  return data_collection
    .post(`${BASE}/saveIncome`, incomeData)
    .then((response) => response.data);
};

// ✅ 4. Save Education Details
export const saveEducation = (educationData) => {
  return data_collection
    .post(`${BASE}/saveEdu`, educationData)
    .then((response) => response.data);
};

// ✅ 5. Save Child Details
export const saveChilds = (childData) => {
  return data_collection
    .post(`${BASE}/saveChilds`, childData)
    .then((response) => response.data);
};

// ✅ 6. Get Summary for Case Number
export const getSummary = (caseNo) => {
  return data_collection
    .get(`${BASE}/getAllData/${caseNo}`)
    .then((response) => response.data);
};

// Backend errors come back as plain strings (DcExceptionHandler)
export const getErrorMessage = (error, fallback) => {
  const data = error.response?.data;
  return (typeof data === "string" && data) || data?.message || fallback;
};
