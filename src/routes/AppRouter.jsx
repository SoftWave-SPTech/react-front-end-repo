import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SiteInstitucional from "../pages/siteInstitucional/siteInstitucional";
import CadastrarUsuarios from "../pages/CadastrarUsuario/CadastrarUsuarios";
import Login from "../pages/CadastrarUsuario/Login";
import PrimeiroAcesso from "../pages/CadastrarUsuario/PrimeiroAcesso";
import CadastrarSenha from "../pages/CadastrarUsuario/CadastrarSenha";
import FormEditPerfilAdvogado from "../Advogado/FormEditPerfilAdvogado";
import FormEditPerfilCliente from "../Cliente/FormEditPerfilCliente";

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
]);