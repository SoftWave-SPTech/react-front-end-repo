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
import RecuperarSenha from "../pages/RecuperarSenha";
import PesquisarProcessos from "../pages/PesquisarProcessos";
import VisualizarProcessosAdvogado from "../pages/VisualizarProcessosAdvogado";
import Podcast from "../pages/Podcast";

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
    path: "/recuperar-senha",
    element: <RecuperarSenha/>
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
    path: "/analise-ia",
    element: <AnaliseComIa/>
  },
  {
    path: "/cadastrar-usuarios",
    element: <CadastrarUsuarios/>
  },
   {
    path: "/visualizar-processos",
    element: <VisualizarProcessos/>
  },
  {
    path: "/cadastrar-processos",
    element: <CadastrarProcesso/>
  },
  {
    path: "/pesquisar-processos",
    element: <PesquisarProcessos/>
    path: "/visualizar-processos-advogado",
    element: <VisualizarProcessosAdvogado/>
  },
  {
    path: "/podcast",
    element: <Podcast/>
  }
]);