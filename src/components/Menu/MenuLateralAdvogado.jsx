import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiLogOut,
  FiFileText,
  FiCalendar,
  FiMic,
  FiBarChart2,
  FiDollarSign,
  FiUserPlus,
  FiUser,
} from "react-icons/fi";

const MenuLateral = () => {
  const [fechado, setFechado] = useState(false);
  const alternarMenu = () => setFechado(!fechado);

  const itensMenu = [
    { rotulo: "Perfil", icone: <FiUser />, rota: "/perfil-advogado", esconderSeAberto: true },
    { rotulo: "Dashboard", icone: <FiBarChart2 />, rota: "/dashboard" },
    { rotulo: "Financeiro", icone: <FiDollarSign />, rota: "/financeiro" },
    { rotulo: "Documentos", icone: <FiFileText />, rota: "/documentos" },
    { rotulo: "Calendário", icone: <FiCalendar />, rota: "/calendario" },
    { rotulo: "Podcast", icone: <FiMic />, rota: "/podcast" },
    { rotulo: "Cadastrar", icone: <FiUserPlus />, rota: "/cadastro" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 flex flex-col justify-between
        bg-[#050e26] text-white overflow-y-auto transition-all duration-300
        ${fechado ? "w-[4.375rem]" : "w-[clamp(15%,20rem,22%)]"}`}
    >
      <div>
        {/* Botão de menu */}
        <div
          className={`flex items-center justify-end cursor-pointer 
            ${fechado ? "mb-[2.5rem]" : "mb-[2rem]"} px-[1rem] pt-[1.2rem] hover:text-[#D9B166]`}
          onClick={alternarMenu}
        >
          <FiMenu className="text-[1.6rem]" />
        </div>

        {/* Bloco de perfil no topo (quando menu está aberto) */}
        <div className="transition-all duration-300">
          {!fechado && (
            <a
              href="/perfil"
              className="flex items-center gap-[1rem] px-[0.8rem] py-[1.2rem] mx-[0.3rem] my-[1rem] border border-white rounded-lg
              transition-all duration-300 hover:border-[#D9B166] hover:text-[#D9B166] text-white no-underline"
            >
              <div className="bg-white text-[#050e26] p-[0.6rem] rounded-full">
                <FiUser className="text-[1.6rem]" />
              </div>
              <div className="flex flex-col leading-tight max-w-full">
                <span className="font-semibold text-[clamp(1rem,1.5vw,1.3rem)] truncate max-w-full whitespace-nowrap">
                  Ana Claudia Ferreira da Silva
                </span>
                <span className="text-[0.8rem] truncate max-w-full whitespace-nowrap group-hover:text-[#D9B166]">
                  ana.silva@sptech.school.br
                </span>
              </div>
            </a>
          )}
        </div>

        {/* Lista de links */}
        <ul className="space-y-[1.4rem] px-[0.5rem] mt-[1rem]">
          {itensMenu
            .filter((item) => !(item.esconderSeAberto && !fechado))
            .map((item) => (
              <li key={item.rotulo}>
                <Link
                  to={item.rota}
                  className={`flex items-center w-full py-[0.75rem] rounded-md
                    transition-colors text-[clamp(1rem,2vw,1.3rem)]
                    ${fechado ? "justify-center px-[1rem]" : "justify-start px-[1rem] gap-[1rem]"}
                    hover:text-[#D9B166] hover:bg-[#0F2A5E]`}
                >
                  <span className="text-[1.6rem]">{item.icone}</span>
                  {!fechado && <span>{item.rotulo}</span>}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Botão de sair */}
      <div
        className={`flex items-center mb-[1rem] py-[0.75rem] cursor-pointer
          text-[clamp(1rem,2vw,1.3rem)] hover:text-[#D9B166] hover:bg-[#0F2A5E]
          ${fechado ? "justify-center px-[1rem]" : "justify-start px-[1rem] gap-[1rem]"}`}
        onClick={() => {
          sessionStorage.clear();
          window.location.href = "/";
        }}
      >
        <FiLogOut className="text-[1.6rem]" />
        {!fechado && <span>Sair</span>}
      </div>
    </div>
  );
};

export default MenuLateral;
