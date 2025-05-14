import React, { useState } from 'react';
import LayoutBase from '../layouts/LayoutBase';
import BarraTitulo from '../components/Ui/BarraTitulo';
import BotaoAdicionar from '../components/Ui/BotaoAdicionarCircular';
import ModalUpload from '../components/Ui/ModalUpload';
import CardDocumento from '../components/Ui/CardDocumento';
import ModalConfirmacao from '../components/Ui/ModalConfirmacao';

export default function VisualizarDocumentosProcesso() {
  const [documentos, setDocumentos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [modalExcluir, setModalExcluir] = useState({ aberto: false, index: null });

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const adicionarDocumento = (novoDoc) => {
    setDocumentos([...documentos, novoDoc]);
    fecharModal();
  };

  const excluirDocumento = () => {
    const novaLista = documentos.filter((_, i) => i !== modalExcluir.index);
    setDocumentos(novaLista);
    setModalExcluir({ aberto: false, index: null });
  };

  const confirmarExclusao = (index) => {
    setModalExcluir({ aberto: true, index });
  };

  const cancelarExclusao = () => {
    setModalExcluir({ aberto: false, index: null });
  };

  const documentosFiltrados = documentos.filter((doc) =>
    doc.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <LayoutBase tipoMenu="cliente">
      <div className="p-6 relative">
        <BarraTitulo className="mb-6">Documentos do Processo</BarraTitulo>

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
                key={doc.id || idx}
                doc={doc}
                onExcluir={() => confirmarExclusao(idx)}
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
}