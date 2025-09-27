import React from "react";
import MenuLateral from "../components/Menu/MenuLateral";

const LayoutBase = ({ children, backgroundClass }) => {
  return (
    <div className={`flex h-screen ${backgroundClass}`}>
      <MenuLateral />
      <main className="flex-1 transition-all duration-300 ease-in-out overflow-y-auto p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default LayoutBase;
