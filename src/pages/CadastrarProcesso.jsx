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

      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-20 w-full max-w-[1920px] mx-auto px-2 py-6" style={{ minHeight: 600 }}>
        <div className="flex justify-center items-start w-full max-w-[500px] lg:max-w-[500px] mb-8 lg:mb-0">
          <FormularioCadastrarProcesso
            processoEditando={processoEditando}
            onSalvo={handleSalvo}
            onCancelarEdicao={handleCancelarEdicao}
          />
        </div>

        <div className="flex justify-center items-start w-full max-w-[600px] lg:max-w-[600px]">
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