// ComentarioAdvogado.jsx
import React from "react";

export default function ComentarioAdvogado({ nome, data, texto, imagem, onClick}) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="bg-[#1B3B8B] text-white text-center py-2 font-semibold">
        Comentário do advogado
      </div>
      <div className="bg-[#0A1A33] text-white px-4 py-3 flex gap-3 items-start">
        <img
          src={imagem}
          alt={`Imagem de ${nome}`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="overflow-hidden">
          <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {nome}
          </p>
          <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {data}
          </p>
          <p className="text-sm mt-1 break-words">
            {texto.length > 100 ? texto.slice(0, 100) + "..." : texto}
          </p>
        </div>
      </div>
    </div>
  );
}
