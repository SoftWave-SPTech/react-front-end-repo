import React, { useState } from 'react';
import LayoutBase from '../layouts/LayoutBase';
import FormularioCadastrarProcesso from '../components/CadastrarProcessos/FormularioCadastrarProcesso';
import ItemListaProcesso from '../components/CadastrarProcessos/ItemListaProcesso';
import BarraTitulo from '../components/Ui/BarraTitulo';

const CadastrarProcesso = () => {
  // Estado para edição inline
  const [processoEditando, setProcessoEditando] = useState(null);
  // Flag para forçar a lista a refazer o fetch após salvar/excluir/editar
  const [reloadKey, setReloadKey] = useState(0);

  const handleEdit = (proc) => {
    setProcessoEditando(proc);
    // sobe a tela pro form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSalvo = () => {
    setProcessoEditando(null);
    setReloadKey((k) => k + 1); // força refetch na lista
  };

  const handleCancelarEdicao = () => setProcessoEditando(null);

  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <BarraTitulo>Cadastrar Processos</BarraTitulo>

      <div
        className="
          flex flex-col
          xl:flex-row
          justify-center items-stretch
          gap-4 sm:gap-6 md:gap-10 xl:gap-20
          w-full
          max-w-[1920px]
          mx-auto
          px-2 sm:px-4 md:px-8 xl:px-16
          py-2 sm:py-4 md:py-8
          min-h-[400px]
          transition-all
        "
      >
        <div
          className="
            flex justify-center items-start
            w-full
            max-w-full
            sm:max-w-[480px]
            md:max-w-[520px]
            xl:max-w-[520px]
            mb-4 md:mb-6 xl:mb-0
            bg-white bg-opacity-90
            rounded-lg
            shadow
            p-2 sm:p-4 md:p-6
            transition-all
          "
        >
          <FormularioCadastrarProcesso
            processoEditando={processoEditando}
            onSalvo={handleSalvo}
            onCancelarEdicao={handleCancelarEdicao}
          />
        </div>

        <div
          className="
            flex justify-center items-start
            w-full
            max-w-full
            sm:max-w-[600px]
            md:max-w-[700px]
            xl:max-w-[700px]
            bg-white bg-opacity-90
            rounded-lg
            shadow
            p-2 sm:p-4 md:p-6
            transition-all
          "
        >
          <ItemListaProcesso
            onEdit={handleEdit}
            reloadKey={reloadKey}
          />
        </div>
      </div>
    </LayoutBase>
  );
};

export default CadastrarProcesso;