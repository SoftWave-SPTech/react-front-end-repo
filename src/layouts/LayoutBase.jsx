import React, { useState, useEffect } from "react";
import MenuLateral from "../components/Menu/MenuLateral";

const LayoutBase = ({ children, backgroundClass }) => {
  const [fechado, setFechado] = useState(() => {
    const larguraSalva = sessionStorage.getItem("larguraMenu");
    return larguraSalva === "70"; 
  });

  useEffect(() => {
    const largura = parseInt(sessionStorage.getItem("larguraMenu"), 10);
    if (!isNaN(largura)) {
      setFechado(largura === 70);
    }
  }, []);

  return (
    <div className={`flex min-h-screen ${backgroundClass}`}>
      <MenuLateral />
      <main className="flex-1 transition-all duration-300 ease-in-out overflow-y-auto p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default LayoutBase;