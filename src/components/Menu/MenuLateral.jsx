import React, { useEffect, useState } from "react";
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
  const [fechado, setFechado] = useState(() => {
    const larguraSalva = sessionStorage.getItem("larguraMenu");
    return larguraSalva === "70"; // Se a largura for 70, o menu está fechado
  });

  const alternarMenu = () => {
    const novoEstado = !fechado;
    setFechado(novoEstado);
    const largura = novoEstado ? 70 : window.innerWidth * 0.22;
    sessionStorage.setItem("larguraMenu", largura.toString());
  };

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

  const rotaPerfil =
    role === "ROLE_USUARIO" ? "/perfil-cliente" : "/perfil-advogado";

  const itensMenu = [
    { rotulo: "Perfil", icone: <FiUser />, rota: rotaPerfil, esconderSeAberto: true, roles: ["ROLE_USUARIO", "ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Dashboard", icone: <FiBarChart2 />, rota: "/dashboard", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Processos", icone: <FiCalendar />, rota: "/processos-cliente", roles: ["ROLE_USUARIO", "ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Cadastrar Processos", icone: <FiFileText />, rota: "/cadastrar-processos", roles: ["ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Usuários", icone: <FiUser />, rota: "/usuarios", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Cadastrar Usuário", icone: <FiUserPlus />, rota: "/cadastrar-usuario", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Documentos", icone: <FiFileText />, rota: "/documentos-pessoais", roles: ["ROLE_USUARIO"] },
    { rotulo: "Área financeira", icone: <FiDollarSign />, rota: "/area-financeira", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Podcast", icone: <FiMic />, rota: "/podcast", roles: ["ROLE_USUARIO", "ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"] },
  ];

  return (
    <div
      className={`menu-lateral sticky top-0 h-screen flex-shrink-0 flex flex-col justify-between
    bg-[#050e26] text-white overflow-y-auto transition-all duration-300
    ${fechado ? "w-[70px]" : "w-[clamp(220px,18%,280px)]"}`}
    >
      <div>
        <div
          className={`flex items-center justify-end cursor-pointer 
          ${fechado ? "mb-6" : "mb-4"} px-3 pt-4 hover:text-[#D9B166]`}
          onClick={alternarMenu}
        >
          <FiMenu className="text-[1.4rem]" />
        </div>

        <div className="transition-all duration-300">
          {!fechado && (
            <a
              href={rotaPerfil}
              className="flex items-center gap-3 px-3 py-3 mx-1 border border-white rounded-lg
              transition-all duration-300 hover:border-[#D9B166] hover:text-[#D9B166] text-white no-underline"
            >
              <div className="bg-white text-[#050e26] p-2 rounded-full">
                <FiUser className="text-[1.3rem]" />
              </div>
              <div className="flex flex-col leading-tight max-w-full">
                <span className="font-semibold text-[clamp(0.9rem,1.2vw,1.1rem)] truncate">
                  {nome}
                </span>
                <span
                  title={email}
                  className="text-[clamp(0.75rem,1vw,0.9rem)] truncate"
                >
                  {email}
                </span>
              </div>
            </a>
          )}
        </div>

        <ul className="space-y-3 px-2 mt-2">
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
                  className={`flex items-center py-2 rounded-md
                  text-[clamp(0.9rem,1.2vw,1.1rem)] transition-colors
                  ${fechado ? "justify-center px-2" : "justify-start px-3 gap-2"}
                  hover:text-[#D9B166] hover:bg-[#0F2A5E]`}
                >
                  <span className="text-[1.3rem]">{item.icone}</span>
                  {!fechado && <span>{item.rotulo}</span>}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div
        className={`flex items-center mb-4 py-2 cursor-pointer
        text-[clamp(0.9rem,1.2vw,1.1rem)] hover:text-[#D9B166] hover:bg-[#0F2A5E]
        ${fechado ? "justify-center px-2" : "justify-start px-3 gap-2"}`}
        onClick={() => {
          sessionStorage.clear();
          window.location.href = "/";
        }}
      >
        <FiLogOut className="text-[1.3rem]" />
        {!fechado && <span>Sair</span>}
      </div>
    </div>
  );
};

export default MenuLateral;
