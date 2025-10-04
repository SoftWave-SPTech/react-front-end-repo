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
    setReloadKey((k) => k + 1); 
  };

  const handleCancelarEdicao = () => setProcessoEditando(null);

  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <BarraTitulo>Cadastrar Processos</BarraTitulo>

      <div
        className="flex flex-col lg:flex-row justify-center items-stretch gap-8 lg:gap-12 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 py-6"
        style={{ minHeight: 600 }}
      >
        {/* Formulário */}
        <div className="w-full lg:w-1/2 flex justify-center items-start mb-8 lg:mb-0">
          <div className="w-full max-w-md">
            <FormularioCadastrarProcesso
              processoEditando={processoEditando}
              onSalvo={handleSalvo}
              onCancelarEdicao={handleCancelarEdicao}
            />
          </div>
        </div>

        {/* Lista de processos */}
        <div className="w-full lg:w-1/2 flex justify-center items-start">
          <div className="w-full max-w-xl">
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