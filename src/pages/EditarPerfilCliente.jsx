import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import FormPerfilCliente from '../components/EditarUsuarios/FormPerfilCliente';

const EditarPerfilCliente = () => 
{
  return (
    <LayoutBase tipoMenu="cliente">
      <FormPerfilCliente />
    </LayoutBase>
  );
};

export default EditarPerfilCliente;
