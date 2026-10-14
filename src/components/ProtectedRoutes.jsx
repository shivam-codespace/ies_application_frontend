 

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, adminOnly = false, userOnly = false }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const roleId = user.roleId;

  // Admin-only route protection (roleId = 1)
  if (adminOnly && roleId !== 1) {
    return <Navigate to={`/dashboard/${user.email}`} replace />;
  }

  // User-only route protection (roleId = 2)
  if (userOnly && roleId !== 2) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
