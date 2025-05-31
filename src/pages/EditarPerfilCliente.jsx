import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import FormPerfilCliente from '../components/EditarUsuarios/FormPerfilCliente';

const EditarPerfilCliente = () => 
{
  return (
    <LayoutBase>
      <FormPerfilCliente backgroundClass="bg-cinzaAzulado" />
    </LayoutBase>
  );
};

export default EditarPerfilCliente;
