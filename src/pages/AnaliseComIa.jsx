import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import AnaliseMovimentacao from "../Components/AnaliseDeIa/AnaliseMovimentacao";

const VisualizarDocumentosProcesso = () => 
{
  return (
    <LayoutBase tipoMenu="cliente">
      <AnaliseMovimentacao/>
    </LayoutBase>
  );
};

export default VisualizarDocumentosProcesso;
