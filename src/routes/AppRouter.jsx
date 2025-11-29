import React from "react";
import { createBrowserRouter } from "react-router-dom";

import SiteInstitucional from "../pages/SiteInstitucional";
import CadastrarUsuarios from "../pages/CadastrarUsuarios";
import Login from "../pages/Login";
import PrimeiroAcesso from "../pages/PrimeiroAcesso";
import CadastrarSenha from "../pages/CadastrarSenha";
import FormEditPerfilAdvogado from "../pages/EditarPerfilAdvogado";
import FormEditPerfilCliente from "../pages/EditarPerfilCliente";
import VisualizarDocumentosProcesso from "../pages/VisualizarDocumentosProcesso";
import VisualizarDocumentosPessoais from "../pages/VisualizarDocumentosPessoais";
import VisualizarProcessos from "../pages/VisualizarProcessos";
import AnaliseComIa from "../pages/AnaliseComIa";
import CadastrarProcesso from "../pages/CadastrarProcesso";
import AreaCliente from "../pages/AreaCliente";
import VisualizarProcessosAdvogado from "../pages/VisualizarProcessosAdvogado";
import Podcast from "../pages/Podcast";
import ListaUsuarios from "../pages/ListaUsuarios";
import Dashboard from "../pages/Dashboard";
import PesquisarProcessos from "../pages/PesquisarProcessos";
import RedefinirSenha from "../pages/RedefinirSenha";
import EsqueciSenha from "../pages/EsqueciSenha";
import RegistroPagamentos from "../pages/RegistroPagamentos";

import RequireAuth from "../components/Auth/RequireAuth";
import RequireRole from "../components/Auth/RequireRole";
import ComentarioAdvogado from "../components/Ui/ComentarioAdvogado";


const ROLES =
{
  USUARIO: "ROLE_USUARIO",
  ADVOGADO: "ROLE_ADVOGADO",
  ADMIN: "ROLE_ADMIN",
};

export const AppRouter = createBrowserRouter([
  // Rotas públicas (sem login)
  { path: "/", element: <SiteInstitucional /> },
  { path: "/login", element: <Login /> },
  { path: "/primeiro-acesso", element: <PrimeiroAcesso /> },
  { path: "/cadastrar-senha", element: <CadastrarSenha /> },
  { path: "/redefinir-senha", element: <RedefinirSenha /> },
  { path: "/esqueci-senha", element: <EsqueciSenha /> },

  // Rotas privadas (usuário precisa estar logado)
  {
    element: <RequireAuth />,
    children: [

      {
        element: <RequireRole allowedRoles={[ROLES.USUARIO, ROLES.ADVOGADO, ROLES.ADMIN]} />,
        children: [
          { path: "/podcast", element: <Podcast /> },
          { path: "/analise-ia/:processoId/:movimentacaoId", element: <AnaliseComIa /> },
          { path: "/documentos-processo", element: <VisualizarDocumentosProcesso /> },
          { path: "/documentos-processo/:idProcesso", element: <VisualizarDocumentosProcesso /> },
        ],
      },

      {
        element: <RequireRole allowedRoles={[ROLES.ADVOGADO, ROLES.ADMIN]} />,
        children: [
          { path: "/perfil-advogado", element: <FormEditPerfilAdvogado /> },
          { path: "/processos-advogado/:idUsuario/:idProcesso", element: <VisualizarProcessosAdvogado /> },
          { path: "/processos-advogado", element: <VisualizarProcessosAdvogado /> },
          { path: "/cadastrar-processos", element: <CadastrarProcesso /> },
          { path: "/pesquisar-processos", element: <PesquisarProcessos /> },
          { path: "/comentarios-processos", element: <ComentarioAdvogado/> },
        ],
      },

      // 🧍 USUÁRIO
      {
        element: <RequireRole allowedRoles={[ROLES.USUARIO]} />,
        children: [
          { path: "/perfil-cliente", element: <FormEditPerfilCliente /> },
          { path: "/documentos-pessoais", element: <VisualizarDocumentosPessoais /> },
          { path: "/processos-cliente", element: <VisualizarProcessos /> },
          { path: "/area-cliente/processo/:processoId", element: <AreaCliente /> },
          { path: "/analise-ia/:processoId/:movimentacaoId", element: <AnaliseComIa /> },
          { path: "/documentos-processo", element: <VisualizarDocumentosProcesso /> },
          { path: "/documentos-processo/:idProcesso", element: <VisualizarDocumentosProcesso /> },
          { path: "/podcast", element: <Podcast /> },
        ],
      },

      // 👑 ADMIN
      {
        element: <RequireRole allowedRoles={[ROLES.ADMIN]} />,
        children: [
          { path: "/lista-usuarios", element: <ListaUsuarios /> },
          { path: "/cadastrar-usuario", element: <CadastrarUsuarios /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/registro-pagamentos", element: <RegistroPagamentos /> },
        ],
      },
    ],
  },
]);
