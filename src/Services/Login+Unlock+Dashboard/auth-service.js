 
import { admin } from "../helper.js/admin-helper";

// POST -> Login
export const login = (loginData) => {
  return admin
    .post("/login", loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};
// export const recoverPassword = (email) => {
//   return axios.post(`${BASE_URL}/recover-password`, email, {
//     headers: { "Content-Type": "application/json" },
//   });
// };

export const recoverPassword = (email) => {
  return admin.post("/recover-password", { email }).then((response) => response.data);
};


// PUT -> Unlock Account
export const unlockAccount = (unlockData) => {
  return admin.put("/unlock", unlockData).then((response) => response.data);
};

// GET -> Fetch Dashboard Info
export const getDashboard = (email) => {
  return admin.get(`/dashboard/${email}`).then((response) => response.data);
};

// export async function unlockAccount(data) {
//   try {
//     const response = await axios.post("http://localhost:9091/unlock", data);
//     return admin.put("/unlock", unlockData).then((response) => response.data)
//   } catch (error) {
//     if (error.response) {
//       return error.response.data || "Unlock failed";
//     }
//     return "Network Error";
//   }
// }

