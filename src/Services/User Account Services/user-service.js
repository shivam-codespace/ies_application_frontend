// src/Services/user-service.js
import { admin } from "../helper.js/admin-helper";

// POST -> Create User
export const createUser = (user) => {
  return admin
    .post("/user", user)
    .then((response) => response.data);
};

// GET -> Fetch All Users
export const getUsers = () => {
  return admin
    .get("/users")
    .then((response) => response.data);
};

// GET -> Fetch User by ID
export const getUserById = (userId) => {
  return admin
    .get(`/user/${userId}`)
    .then((response) => response.data);
};

// PUT -> Update User Account Status (Active / Inactive / Locked etc.)
export const updateUserStatus = (userId, status) => {
  return admin
    .put(`/user/${userId}/${status}`)
    .then((response) => response.data);
};
