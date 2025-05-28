import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import FormPerfilAdvogado from '../components/EditarUsuarios/FormPerfilAdvogado';

const EditarPerfilAdvogado = () => 
{
  return (
    <LayoutBase tipoMenu="advogado">
      <FormPerfilAdvogado />
    </LayoutBase>
  );
};

export default EditarPerfilAdvogado;
