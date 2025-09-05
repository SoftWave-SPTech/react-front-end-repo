import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import FormularioCadastrarProcesso from '../components/CadastrarProcessos/FormularioCadastrarProcesso';
import ItemListaProcesso from '../components/CadastrarProcessos/ItemListaProcesso';
import BarraTitulo from '../components/Ui/BarraTitulo';

const CadastrarProcesso = () => {
  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <BarraTitulo>Cadastrar Processos</BarraTitulo>
      <div
        className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-20 w-full max-w-[1920px] mx-auto px-2 py-6"
        style={{ minHeight: 600 }}
      >

        <div className="flex justify-center items-start w-full max-w-[500px] lg:max-w-[500px] mb-8 lg:mb-0">
          <FormularioCadastrarProcesso />
        </div>
        <div className="flex justify-center items-start w-full max-w-[600px] lg:max-w-[600px]">
          <ItemListaProcesso />
        </div>
      </div>
    </LayoutBase>
  );
};

export default CadastrarProcesso;