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
      <div className="w-full px-4 sm:px-6 md:px-8 py-4 md:py-6">
        <BarraTitulo className="text-sm sm:text-base md:text-lg">Cadastrar Processos</BarraTitulo>

        <div className="flex flex-col xl:flex-row justify-center items-start gap-4 md:gap-6 lg:gap-8 w-full max-w-[1600px] mx-auto py-4 md:py-6">
          {/* Formulário */}
          <div className="w-full xl:w-1/2 mb-4 xl:mb-0 xl:max-w-[650px]">
            <FormularioCadastrarProcesso
              processoEditando={processoEditando}
              onSalvo={handleSalvo}
              onCancelarEdicao={handleCancelarEdicao}
            />
          </div>

          {/* Lista de Processos */}
          <div className="w-full xl:w-1/2 xl:max-w-[650px]">
            <ItemListaProcesso
              onEdit={handleEdit}
              reloadKey={reloadKey}
            />
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default CadastrarProcesso;