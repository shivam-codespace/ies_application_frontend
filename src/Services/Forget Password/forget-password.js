import { admin } from "../helper.js/admin-helper";

// Emails a new temporary password; resolves with the backend's confirmation message
export const sendOtp = async (email) => {
  try {
    const response = await admin.post("/recover-password", { email });
    return response.data;
  } catch (error) {
    const data = error.response?.data;
    throw new Error(typeof data === "string" && data ? data : "Failed to send temporary password");
  }
};
