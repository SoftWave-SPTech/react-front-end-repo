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

  const usuario = {
    id: sessionStorage.getItem("id"),
    email: sessionStorage.getItem("email"),
    role: sessionStorage.getItem("role"),
    tipoUsuario: sessionStorage.getItem("tipoUsuario"),
    token: sessionStorage.getItem("token"),
  };

  const role = (usuario?.role || "").toUpperCase();
  const email = usuario?.email || "sem-email@example.com";
  const nome = usuario?.email?.split("@")[0] || "Usuário";

  const rotaPerfil = role === "ROLE_USUARIO" ? "/perfil-cliente" : "/perfil-advogado";

  const itensMenu = [
    { rotulo: "Perfil", icone: <FiUser />, rota: rotaPerfil, esconderSeAberto: true, roles: ["ROLE_USUARIO", "ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Dashboard", icone: <FiBarChart2 />, rota: "/dashboard", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Processos", icone: <FiCalendar />, rota: "/calendario", roles: ["ROLE_USUARIO", "ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Cadastrar Processos", icone: <FiFileText />, rota: "/cadastrar-processos", roles: ["ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Usuários", icone: <FiUser />, rota: "/usuarios", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Cadastrar Usuário", icone: <FiUserPlus />, rota: "/cadastrar-usuarios", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Podcast", icone: <FiMic />, rota: "/podcast", roles: ["ROLE_USUARIO", "ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Documentos", icone: <FiFileText />, rota: "/documentos", roles: ["ROLE_USUARIO"] },
    { rotulo: "Área financeira", icone: <FiDollarSign />, rota: "/area-financeira", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 flex flex-col justify-between
        bg-[#050e26] text-white overflow-y-auto transition-all duration-300
        ${fechado ? "w-[4.375rem]" : "w-[clamp(15%,20rem,22%)]"}`}
    >
      <div>
        <div
          className={`flex items-center justify-end cursor-pointer 
            ${
              fechado
                ? "mb-[2.5rem]"
                : role === "ROLE_ADMIN" || role === "ROLE_DONO"
                ? "mb-[0.8rem]"
                : "mb-[1.8rem]"
            } px-[1rem] pt-[1.2rem] hover:text-[#D9B166]`}
          onClick={alternarMenu}
        >
          <FiMenu className="text-[1.6rem]" />
        </div>
        <div className="transition-all duration-300">
          {!fechado && (
            <a
              href={rotaPerfil}
              className="flex items-center gap-[1rem] px-[0.8rem] py-[1.2rem] mx-[0.3rem] my-[1rem] border border-white rounded-lg
                transition-all duration-300 hover:border-[#D9B166] hover:text-[#D9B166] text-white no-underline"
            >
              <div className="bg-white text-[#050e26] p-[0.6rem] rounded-full">
                <FiUser className="text-[1.6rem]" />
              </div>
              <div className="flex flex-col leading-tight max-w-full">
                <span className="font-semibold text-[clamp(1rem,1.5vw,1.3rem)] truncate max-w-full whitespace-nowrap mb-[0.2rem]">
                  {nome}
                </span>
                <span className="text-[0.9rem] truncate max-w-full whitespace-nowrap group-hover:text-[#D9B166]">
                  {email}
                </span>
              </div>
            </a>
          )}
        </div>
        <ul className="space-y-[1.4rem] px-[0.5rem] mt-[1rem]">
          {itensMenu
            .filter(
              (item) =>
                item.roles.includes(role) &&
                !(item.esconderSeAberto && !fechado)
            )
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
