import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SiteInstitucional from "../pages/SiteInstitucional";
import CadastrarUsuarios from "../pages/CadastrarUsuarios";
import Login from "../pages/Login";
import PrimeiroAcesso from "../pages/PrimeiroAcesso";
import CadastrarSenha from "../pages/CadastrarSenha";
import FormEditPerfilAdvogado from "../components/EditarUsuarios/FormEditPerfilAdvogado";
import FormEditPerfilCliente from "../components/EditarUsuarios/FormEditPerfilCliente";
import VisualizarDocumentosProcesso from "../pages/VisualizarDocumentosProcesso";
import VisualizarDocumentosPessoais from "../pages/VisualizarDocumentosPessoais";
import AnaliseComIa from "../pages/AnaliseComIa";
import CadastrarProcesso from "../pages/CadastrarProcesso";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <SiteInstitucional/>,
  },
  {
    path: "/cadastro",
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
    path: "/cadastrar-processo",
    element: <CadastrarProcesso/>
  }
]);