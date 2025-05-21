import React from 'react';
import MenuLateral from '../components/Menu/MenuLateral';

const LayoutBase = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-blue-100 overflow-hidden">
      <MenuLateral />

      <div
        className={`
          h-full overflow-y-auto
          transition-all duration-300 ease-in-out
          pl-[clamp(4.375rem,20rem,22%)]
        `}
      >
        <main className="max-w-7xl w-full mx-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutBase;
