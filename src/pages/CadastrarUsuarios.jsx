import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import FormCadastrar from '../components/CadastrarUsuarios/Cadastro';
import BarraTitulo from '../components/Ui/BarraTitulo';

const CadastrarUsuarios = () => 
{
  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <BarraTitulo className='mb-4'>Cadastrar Usuários</BarraTitulo>
      <FormCadastrar />
    </LayoutBase>
  );
};

export default CadastrarUsuarios;