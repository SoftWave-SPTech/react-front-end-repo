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
  FiSearch,
} from "react-icons/fi";
import { jwtDecode } from "jwt-decode";

const token = sessionStorage.getItem("token") || ""
console.log("Token:", token);
let decoded = "";
if (token) {
 decoded = jwtDecode(token);
}

const MenuLateral = () => {
  const [fechado, setFechado] = useState(() => {
    const larguraSalva = sessionStorage.getItem("larguraMenu");
    return larguraSalva === "70";
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
    fotoPerfil: sessionStorage.getItem("fotoPerfil"),
    nome: decoded?.nome || "Usuário Padrão",
  };

  const role = (usuario?.role || "").toUpperCase();
  const email = usuario?.email || "sem-email@example.com";
  const tipoUsuario = usuario?.tipoUsuario || "Desconhecido";

  let nome = usuario?.nome || "Usuário";
  if (tipoUsuario === "AdvogadoFisico") {
    const partesNome = nome.trim().split(" ");
    if (partesNome.length >= 2) {
      nome = `${partesNome[0]} ${partesNome[partesNome.length - 1]}`;
    }
  } else if (tipoUsuario === "AdvogadoJuridico") {
    nome = nome.length > 25 ? nome.slice(0, 25) + "..." : nome;
  }

  const rotaPerfil =
    role === "ROLE_USUARIO" ? "/perfil-cliente" : "/perfil-advogado";

  const itensMenu = [
    { rotulo: "Perfil", icone: <FiUser />, rota: rotaPerfil, esconderSeAberto: true, roles: ["ROLE_USUARIO", "ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Dashboard", icone: <FiBarChart2 />, rota: "/dashboard", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Meus processos", icone: <FiCalendar />, rota: "/processos-cliente", roles: ["ROLE_USUARIO"] },
    { rotulo: "Pesquisar processos", icone: <FiSearch />, rota: "/pesquisar-processos", roles: ["ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Cadastrar processos", icone: <FiFileText />, rota: "/cadastrar-processos", roles: ["ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Pesquisar usuários", icone: <FiUser />, rota: "/lista-usuarios", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Cadastrar usuários", icone: <FiUserPlus />, rota: "/cadastrar-usuario", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
    { rotulo: "Documentos pessoais", icone: <FiFileText />, rota: "/documentos-pessoais", roles: ["ROLE_USUARIO"] },
    { rotulo: "Área financeira", icone: <FiDollarSign />, rota: "/registro-pagamentos", roles: ["ROLE_ADMIN", "ROLE_DONO"] },
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
          className={`flex items-center ${fechado ? "justify-center mb-6" : "justify-end mb-4"} 
          cursor-pointer px-3 pt-4 hover:text-[#D9B166]`}
          onClick={alternarMenu}
        >
          <FiMenu className="text-[1.4rem]" />
        </div>

        <div className="transition-all duration-300">
          {!fechado && (
            <a
              href={rotaPerfil}
              className="flex items-center gap-2 px-2 py-3 w-[clamp(190px,93%,250px)] mx-auto border border-white rounded-lg
              transition-all duration-300 hover:border-[#D9B166] hover:text-[#D9B166] text-white no-underline"
            >
              <img
                src={usuario.fotoPerfil !== "http://localhost:8080/null" ? usuario.fotoPerfil : "/src/assets/images/boneco.png"}
                alt="Foto de perfil"
                className="w-12 h-12 rounded-full object-cover border border-white"
              />
              <div className="flex flex-col leading-tight max-w-[calc(100%-3.2rem)]">
                <span className="font-semibold text-[clamp(0.9rem,1.2vw,1.1rem)] truncate">
                  {nome}
                </span>
                <span
                  title={email}
                  className="text-[clamp(0.7rem,0.95vw,0.85rem)] truncate mt-[3px]"
                >
                  {email}
                </span>
              </div>
            </a>
          )}
        </div>

        <ul className="space-y-3 px-2 mt-4">
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