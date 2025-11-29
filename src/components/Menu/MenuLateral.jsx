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
import { api } from "../../service/api";

const token = sessionStorage.getItem("token") || "";
let decoded = "";
if (token) {
  decoded = jwtDecode(token);
}

const MenuLateral = () => {
  const [fechado, setFechado] = useState(() => {
    const larguraSalva = sessionStorage.getItem("larguraMenu");
    return larguraSalva === "70";
  });
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);
  const [fotoPerfil, setFotoPerfil] = useState(() => {
    const foto = sessionStorage.getItem("fotoPerfil");
    // Retorna null se a foto for inválida
    if (!foto || foto === "null" || foto === "http://localhost:8080/null") {
      return null;
    }
    return foto;
  });

  const alternarMenu = () => {
    const novoEstado = !fechado;
    setFechado(novoEstado);
    const largura = novoEstado
      ? 70
      : isTablet
      ? window.innerWidth
      : window.innerWidth * 0.22;
    sessionStorage.setItem("larguraMenu", largura.toString());
  };

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Busca a foto da API quando o componente monta
  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");
    
    if (userId && token) {
      // Sempre busca a foto da API para garantir que está atualizada
      api.get(`/usuarios/foto-perfil/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.data && response.data !== "null" && response.data !== "http://localhost:8080/null") {
          sessionStorage.setItem("fotoPerfil", response.data);
          setFotoPerfil(response.data);
        } else {
          // Se não houver foto válida, remove do sessionStorage
          sessionStorage.removeItem("fotoPerfil");
          setFotoPerfil(null);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar foto de perfil:", error);
        // Se der erro, tenta usar o que está no sessionStorage
        const fotoNoStorage = sessionStorage.getItem("fotoPerfil");
        if (fotoNoStorage && fotoNoStorage !== "null" && fotoNoStorage !== "http://localhost:8080/null") {
          setFotoPerfil(fotoNoStorage);
        } else {
          setFotoPerfil(null);
        }
      });
    }
  }, []);

  // Atualiza a foto quando o sessionStorage mudar
  useEffect(() => {
    const handleStorageChange = () => {
      setFotoPerfil(sessionStorage.getItem("fotoPerfil"));
    };
    
    // Listener para mudanças no sessionStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Polling para detectar mudanças no sessionStorage (já que storage event só funciona em outras abas)
    const interval = setInterval(() => {
      const novaFoto = sessionStorage.getItem("fotoPerfil");
      if (novaFoto !== fotoPerfil) {
        setFotoPerfil(novaFoto);
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [fotoPerfil]);

  const usuario = {
    id: sessionStorage.getItem("id"),
    email: sessionStorage.getItem("email"),
    role: sessionStorage.getItem("role"),
    tipoUsuario: sessionStorage.getItem("tipoUsuario"),
    token: sessionStorage.getItem("token"),
    fotoPerfil: fotoPerfil,
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
    {
      rotulo: "Perfil",
      icone: <FiUser />,
      rota: rotaPerfil,
      esconderSeAberto: true,
      roles: ["ROLE_USUARIO", "ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"],
    },
    {
      rotulo: "Dashboard",
      icone: <FiBarChart2 />,
      rota: "/dashboard",
      roles: ["ROLE_ADMIN", "ROLE_DONO"],
    },
    {
      rotulo: "Meus processos",
      icone: <FiCalendar />,
      rota: "/processos-cliente",
      roles: ["ROLE_USUARIO"],
    },
    {
      rotulo: "Cadastrar usuários",
      icone: <FiUserPlus />,
      rota: "/cadastrar-usuario",
      roles: ["ROLE_ADMIN", "ROLE_DONO"],
    },
    {
      rotulo: "Pesquisar usuários",
      icone: <FiUser />,
      rota: "/lista-usuarios",
      roles: ["ROLE_ADMIN", "ROLE_DONO"],
    },
    {
      rotulo: "Cadastrar processos",
      icone: <FiFileText />,
      rota: "/cadastrar-processos",
      roles: ["ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"],
    },
    {
      rotulo: "Pesquisar processos",
      icone: <FiSearch />,
      rota: "/pesquisar-processos",
      roles: ["ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"],
    },
    {
      rotulo: "Documentos pessoais",
      icone: <FiFileText />,
      rota: "/documentos-pessoais",
      roles: ["ROLE_USUARIO"],
    },
    {
      rotulo: "Área financeira",
      icone: <FiDollarSign />,
      rota: "/registro-pagamentos",
      roles: ["ROLE_ADMIN", "ROLE_DONO"],
    },
    {
      rotulo: "Podcast",
      icone: <FiMic />,
      rota: "/podcast",
      roles: ["ROLE_USUARIO", "ROLE_ADVOGADO", "ROLE_ADMIN", "ROLE_DONO"],
    },
  ];

  return (
    <div
      className={`menu-lateral sticky top-0 h-screen flex flex-col justify-between
      bg-[#050e26] text-white transition-all duration-300
      ${
        fechado
          ? "w-[70px]"
          : isTablet
          ? "w-full"
          : "w-[clamp(220px,18%,280px)]"
      }`}
    >
      <div>
        <div
          className={`flex items-center ${
            fechado ? "justify-center mb-6" : "justify-end mb-4"
          } cursor-pointer px-3 pt-4 hover:text-[#D9B166]`}
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
                src={fotoPerfil && fotoPerfil !== "null" && fotoPerfil !== "http://localhost:8080/null" ? fotoPerfil : "/src/assets/images/boneco.png"}
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
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setFechado(true);
                      sessionStorage.setItem("larguraMenu", "70");
                    }
                  }}
                  className={`flex items-center py-2 rounded-md
                  text-[clamp(0.9rem,1.2vw,1.1rem)] transition-colors
                  ${
                    fechado
                      ? "justify-center px-2"
                      : "justify-start px-3 gap-2"
                  }
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
