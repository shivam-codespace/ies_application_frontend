export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/login",
  LOGOUT: "/logout",
  UNLOCK: "/unlock",
  RECOVER_PASSWORD: "/recover-password",
  DASHBOARD: (email) => `/dashboard/${email}`,

  // User Management
  CREATE_USER: "/user",
  GET_USERS: "/users",
  GET_USER: (userId) => `/user/${userId}`,
  UPDATE_USER_STATUS: (userId, status) => `/user/${userId}/${status}`,

  // Plan Management
  SAVE_PLAN: "/savePlan",
  GET_PLANS: "/plans",
  GET_PLAN: (planId) => `/plan/${planId}`,
  UPDATE_PLAN_STATUS: (planId, status) => `/plan/${planId}/${status}`,
};
