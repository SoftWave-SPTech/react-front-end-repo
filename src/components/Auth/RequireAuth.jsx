import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = () => {
      // Verificar se todos os dados necessários estão presentes
      if (!token || !role) {
        setIsValid(false);
        setIsValidating(false);
        return;
      }

      // Verificar se o token não está malformado
      try {
        // Um token JWT válido tem 3 partes separadas por pontos
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          throw new Error('Token malformado');
        }
        
        setIsValid(true);
      } catch (error) {
        console.error('Token inválido:', error);
        // Limpar sessionStorage se o token for inválido
        sessionStorage.clear();
        setIsValid(false);
      }
      
      setIsValidating(false);
    };

    validateToken();
  }, [token, role]);

  // Mostrar loading enquanto valida
  if (isValidating) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  if (!token || !isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
