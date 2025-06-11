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
import Dashboard from "../pages/Dashboard";
import PesquisarProcessos from "../pages/PesquisarProcessos";
import RedefinirSenha from "../pages/RedefinirSenha";
import EsqueciSenha from "../pages/EsqueciSenha";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <SiteInstitucional/>,
  },
  {
    path: "/cadastrar-usuario",
    element: <CadastrarUsuarios/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/primeiro-acesso",
    element: <PrimeiroAcesso/>
  },
  {
    path: "/cadastrar-senha",
    element: <CadastrarSenha/>
  },
  {
    path: "/redefinir-senha",
    element: <RedefinirSenha/>
  },
  {
    path: "esqueci-senha",
    element: <EsqueciSenha/>
  },
  {
    path: "/perfil-cliente",
    element: <FormEditPerfilCliente/> 
  },
  {
    path: "/perfil-advogado",
    element: <FormEditPerfilAdvogado/>
  },
  {
    path: "/documentos-processo",
    element: <VisualizarDocumentosProcesso/>
  },
  {
    path: "/documentos-pessoais",
    element: <VisualizarDocumentosPessoais/>
  },
  {
    path: "//analise-ia/:processoId/:movimentacaoId",
    element: <AnaliseComIa/>
  },
  {
    path: "/processos-cliente",
    element: <VisualizarProcessos/>
  },
  {
    path: "/cadastrar-processos",
    element: <CadastrarProcesso/>
  },
  {
    path: "/area-cliente/processo/:processoId",
    element: <AreaCliente/>
  },
  {
    path: "/pesquisar-processos",
    element: <PesquisarProcessos/>
  },
  {
    path: "/processos-advogado",
    element: <VisualizarProcessosAdvogado/>
  },
  {
    path: "/podcast",
    element: <Podcast/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  }
]);