import React from 'react';
import MenuLateralAdvogado from '../components/Menu/MenuLateralAdvogado';
import Cadastro from '../components/CadastrarUsuarios/Cadastro';
import '../estilos/CadastrarUsuarios.css'; 

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