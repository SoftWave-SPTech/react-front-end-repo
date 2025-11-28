import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireRole({ allowedRoles }) {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    console.log("RequireRole - Verificando acesso:", {
      token: token ? "***PRESENTE***" : null,
      role: role,
      allowedRoles: allowedRoles,
      hasAccess: allowedRoles.includes(role)
    });
  }, [token, role, allowedRoles]);

  if (!token || !role) {
    console.log("RequireRole - Token ou role ausente, redirecionando para login");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log("RequireRole - Acesso negado, redirecionando baseado na role:", role);
    
    switch (role) {
      case "ROLE_USUARIO":
        return <Navigate to="/perfil-cliente" replace />;
      case "ROLE_ADVOGADO":
        return <Navigate to="/perfil-advogado" replace />;
      case "ROLE_ADMIN":
        return <Navigate to="/dashboard" replace />;
      default:
        console.error("RequireRole - Role desconhecida:", role);
        sessionStorage.clear();
        return <Navigate to="/login" replace />;
    }
  }

  console.log("RequireRole - Acesso permitido para role:", role);
  return <Outlet />; 
}
