import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import FormPerfilCliente from '../components/EditarUsuarios/FormPerfilCliente';

const EditarPerfilCliente = () => 
{
  return (
   <LayoutBase backgroundClass="bg-cinzaAzulado">
      <FormPerfilCliente/>
    </LayoutBase>
  );
};

export default EditarPerfilCliente;