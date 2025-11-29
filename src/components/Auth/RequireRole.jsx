import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireRole({ allowedRoles }) {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    switch (role) {
      case "ROLE_USUARIO":
        return <Navigate to="/perfil-cliente" replace />;
      case "ROLE_ADVOGADO":
        return <Navigate to="/perfil-advogado" replace />;
      case "ROLE_ADMIN":
        return <Navigate to="/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />; 
}
