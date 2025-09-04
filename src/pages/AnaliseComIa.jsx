import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import AnaliseMovimentacao from "../components/AnaliseDeIa/AnaliseMovimentacao";

const VisualizarDocumentosProcesso = () => 
{
  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <AnaliseMovimentacao/>
    </LayoutBase>
  );
};

export default VisualizarDocumentosProcesso;