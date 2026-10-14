 
// import { createSlice } from "@reduxjs/toolkit";

// // ✅ Safe JSON parse function
// const safeJSONParse = (value) => {
//   try {
//     return JSON.parse(value);
//   } catch {
//     return null;
//   }
// };

// const initialState = {
//   isAuthenticated:
//     localStorage.getItem("isAuthenticated") === "true" ? true : false,
//   email: safeJSONParse(localStorage.getItem("email")),
//   //userId: safeJSONParse(localStorage.getItem("userId")) || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.isAuthenticated = true;
//       state.email = action.payload;
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("email", JSON.stringify(action.payload));
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.email = null;
//       localStorage.removeItem("isAuthenticated");
//       localStorage.removeItem("email");
//     },
//   }
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

const safeJSONParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user: safeJSONParse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { email, userId, roleId, token } = action.payload;

      state.isAuthenticated = true;
      state.user = {
        email,
        userId,
        roleId,
      };
      state.token = token;

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", token);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      localStorage.clear();
    },

    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
