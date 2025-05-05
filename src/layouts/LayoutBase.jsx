import React from 'react';
import MenuAdvogado from '../components/Menu/MenuLateralAdvogado';
import MenuCliente from '../components/Menu/MenuLateralCliente';

const LayoutBase = ({ tipoMenu, children }) => {
  const MenuLateral = tipoMenu === "advogado" ? MenuAdvogado : MenuCliente;

  return (
    <div className="flex h-screen w-screen">
      <MenuLateral />
      <main className="flex-1 overflow-y-auto p-6 pl-[500px] transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default LayoutBase;
