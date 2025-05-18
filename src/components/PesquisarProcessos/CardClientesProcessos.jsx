import React from "react";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";

export default function CardClientesProcessos() {
  return (
    <div className="bg-branco rounded-xl shadow px-4 py-4 flex flex-col gap-2 md:gap-0 md:flex-row items-start md:items-center">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <img
          src="src/assets/images/boneco.png"
          alt="Foto do cliente"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <div className="text-preto font-semibold text-base">Leticia da Fonseca</div>
          <div className="text-dourado text-xs mt-1">Cliente Ativo no Sistema</div>
          <div className="flex items-center gap-2 text-preto text-xs mt-1">
            <FiMail className="inline" /> leticia.fonseca@sptech.school
          </div>
          <div className="flex items-center gap-2 text-preto text-xs">
            <FiPhone className="inline" /> +55 (11) 90000 - 0000
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-2 mt-4 md:mt-0 md:ml-8">
        <div className="bg-cinzaAzulado rounded-lg px-4 py-2 flex items-center justify-between">
          <span className="text-preto text-sm md:text-base">
            Processo nº 0823478-15.2023.8.26.0100
          </span>
          <span className="text-AzulEscuro text-xl font-bold">{'>'}</span>
        </div>
        <div className="bg-cinzaAzulado rounded-lg px-4 py-2 flex items-center justify-between">
          <span className="text-preto text-sm md:text-base">
            Processo nº 0823478-15.2023.8.26.0100
          </span>
          <span className="text-AzulEscuro text-xl font-bold">{'>'}</span>
        </div>
      </div>
    </div>    
  );
}