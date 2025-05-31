import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import FormCadastrar from '../components/CadastrarUsuarios/Cadastro';

const CadastrarUsuarios = () => 
{
  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <FormCadastrar />
    </LayoutBase>
  );
};

export default CadastrarUsuarios;
