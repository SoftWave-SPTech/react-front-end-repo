import React from 'react';
import MenuLateralAdvogado from '../../components/MenuLateralAdvogado/MenuLateralAdvogado';
import Cadastro from '../../components/CadastroUsuarios/Cadastro';
import './CadastrarUsuarios.css';

const CadastrarUsuarios = () => 
{
  return (
    <div className="cadastrar-usuarios">
      <MenuLateralAdvogado />
      <div className="cadastro">
        <Cadastro />
      </div>
    </div>
  );
};

export default CadastrarUsuarios;