// src/Services/app-service.js
import { app_registration } from "../helper.js/app-helper";

// ✅ 1. Create Application
export const createApp = (appData) => {
  return app_registration
    .post("/api/apps/", appData)
    .then((response) => response.data);
};

// ✅ 2. Get Applications by User ID
export const getAppsByUser = (userId) => {
  return app_registration
    .get(`/api/apps/user/${userId}`)
    .then((response) => response.data);
};

// ✅ 3. Get Application by Case Number
export const getAppByCaseNum = (caseNum) => {
  return app_registration
    .get(`/api/apps/${caseNum}`)
    .then((response) => response.data);
};

// ✅ 4. Update Application Status
export const updateAppStatus = (caseNum, status) => {
  return app_registration
    .put(`/api/apps/${caseNum}/status/${status}`)
    .then((response) => response.data);
};

// ✅ 5. Filter Applications by status (Admin only). Omit status to get all.
export const filterApps = (status) => {
  return app_registration
    .get("/api/apps/filter", {
      params: status ? { status } : {},
    })
    .then((response) => response.data);
};
