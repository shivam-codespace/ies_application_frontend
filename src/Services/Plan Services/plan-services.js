// src/Services/plan-service.js
import { admin } from "../helper.js/admin-helper";

// POST -> Save Plan
export const savePlan = (plan) => {
  return admin
    .post("/savePlan", plan)
    .then((response) => response.data);
};

// GET -> Fetch All Plans
export const getPlans = () => {
  return admin
    .get("/plans")
    .then((response) => response.data);
};

// PUT -> Change Plan Status
export const updatePlanStatus = (planId, status) => {
  return admin
    .put(`/plan/${planId}/${status}`)
    .then((response) => response.data);
};

// GET -> Fetch Plan by ID
export const getPlanById = (planId) => {
  return admin
    .get(`/plan/${planId}`)
    .then((response) => response.data);
};
