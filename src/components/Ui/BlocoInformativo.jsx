import React from "react";

export default function BlocoInformativo({ titulo, descricao, icone, altura = "min-h-[200px]" }) {
  return (
    <div className={`relative bg-white rounded-2xl shadow-xl p-6 border-l-4 border-[#2454D3] ${altura} overflow-y-auto`}>
      <div className="flex items-center mb-3">
        {icone && <img src={icone} alt="ícone" className="w-6 h-6 mr-2" />}
        <h3 className="text-lg font-bold text-[#0A1A33]">{titulo}</h3>
      </div>
      <p className="text-gray-800">{descricao}</p>
    </div>
  );
}
