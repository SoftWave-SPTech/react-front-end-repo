import React from "react";
import { FiFilter } from "react-icons/fi";

export default function BotaoFiltros({ label }) {
  return (
    <button
      className="w-full flex items-center justify-between bg-AzulEscuro text-dourado rounded-md px-4 py-3 text-base font-normal hover:bg-azulClaro hover:text-branco transition-colors"
      type="button"
    >
      {label}
      <FiFilter className="ml-2 text-dourado" size={22} />
    </button>
  );
}