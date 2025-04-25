<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Estilos/App.css'
import FormEditPerfilAdvogado from './Advogado/FormEditPerfilAdvogado'
import FormEditPerfilCliente from './Cliente/FormEditPerfilCliente'

function App() {

  return (
    <>
      {/* {<FormEditPerfilAdvogado/>} */}
      {/* <FormEditPerfilCliente/> */}
=======
import './App.css'
import { RouterProvider } from "react-router-dom";
import React from 'react';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
>>>>>>> release/sprint-2
    </>
  );
}
<<<<<<< HEAD
export default App
=======

export default App;
>>>>>>> release/sprint-2
