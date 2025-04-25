import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SiteInstitucional from "../pages/siteInstitucional/siteInstitucional";
import CadastrarUsuarios from "../pages/CadastrarUsuario/CadastrarUsuarios";
import Login from "../components/Login";
import PrimeiroAcesso from "../components/PrimeiroAcesso";
import CadastrarSenha from "../components/CadastrarSenha";

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
]);