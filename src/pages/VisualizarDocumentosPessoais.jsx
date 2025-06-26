import React from 'react';
import LayoutBase from '../layouts/LayoutBase';

const VisualizarDocumentosProcesso = () => 
{
  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <div className="p-2 relative">
        <BarraTitulo className="mb-6">Meus documentos</BarraTitulo>

        <div className="flex justify-end mb-6">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Pesquisar documento..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-[#ffffff] text-black placeholder-black text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {documentosFiltrados.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhum documento encontrado.</p>
          ) : (
            documentosFiltrados.map((doc, idx) => (
              <CardDocumento
                key={doc.id}
                doc={doc}
                onExcluir={() => confirmarExclusao(doc.id, idx)}
              />
            ))
          )}
        </div>

        <div className="fixed bottom-8 right-8">
          <BotaoAdicionar onClick={abrirModal} />
        </div>

        {modalAberto && (
          <ModalUpload
            onClose={fecharModal}
            onUpload={adicionarDocumento}
          />
        )}
        {modalExcluir.aberto && (
          <ModalConfirmacao
            titulo="Excluir Documento"
            mensagem="Tem certeza que deseja excluir este documento?"
            onConfirmar={excluirDocumento}
            onCancelar={cancelarExclusao}
          />
        )}
      </div>
    </LayoutBase>
  );
};

export default VisualizarDocumentosProcesso;
