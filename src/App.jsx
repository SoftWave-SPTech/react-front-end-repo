import React from 'react';
import Login from './components/Login';
import PrimeiroAcesso from './components/PrimeiroAcesso';
import CadastrarSenha from './components/CadastrarSenha';

const App = () => {
  return (
    <>
    <div>
      <Login />
      <PrimeiroAcesso />
      <CadastrarSenha />
    </div>
    </>
  );
};

export default App;