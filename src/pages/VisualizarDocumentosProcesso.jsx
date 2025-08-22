import React, { useEffect, useState } from 'react';
import LayoutBase from '../layouts/LayoutBase';
import BarraTitulo from '../components/Ui/BarraTitulo';
import BotaoAdicionar from '../components/Ui/BotaoAdicionarCircular';
import ModalUpload from '../components/Ui/ModalUpload';
import CardDocumento from '../components/Ui/CardDocumento';
import ModalConfirmacao from '../components/Ui/ModalConfirmacao';
import { api } from '../service/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function VisualizarDocumentosProcesso() {
  const [documentos, setDocumentos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [modalExcluir, setModalExcluir] = useState({ aberto: false, index: null });
  const TOKEN = `Bearer ${sessionStorage.getItem('token')}`;
  const { idProcesso } = useParams();
  const navigate = useNavigate();

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  useEffect(() => {
    api.get(`/documentos-processos/processo/${idProcesso}`, {
      headers: {
        "Authorization":  TOKEN
      }
      })
      .then(response => {
      console.log("Upload realizado com sucesso:", response.data);
      setDocumentos(response.data)
      })
      .catch(error => {
      console.error("Erro ao enviar o arquivo:", error);
    });

  }, []);

  const adicionarDocumento = (novoDoc) => {
    setDocumentos([...documentos, novoDoc]);
    
    const formData = new FormData();
    formData.append("nomeArquivo", novoDoc.nome);
    formData.append("documentoProcesso", novoDoc.file);
    formData.append("idProcesso", idProcesso)
    
    api.post("/documentos-processos", formData, {
            headers: {
                "Authorization":  TOKEN
            }
            })
            .then(response => {
            console.log("Upload realizado com sucesso:", response.data);
            window.location.reload()
            })
            .catch(error => {
            console.error("Erro ao enviar o arquivo:", error);
            });

    fecharModal();
  };

  const excluirDocumento = () => {
    const novaLista = documentos.filter((_, i) => i !== modalExcluir.index);
    setDocumentos(novaLista);

    api.delete(`/documentos-processos/${modalExcluir.id}`, {
      headers: {
        "Authorization":  TOKEN
      }
    })
    .then(response => {
      console.log("Documento Deletado com sucesso");
    })
    .catch(error => {
      console.error("Erro ao enviar o arquivo:", error);
    });

    setModalExcluir({ aberto: false, index: null, id: null });
  };

  const confirmarExclusao = (id, index) => {
    setModalExcluir({ aberto: true, index, id });
  };

  const cancelarExclusao = () => {
    setModalExcluir({ aberto: false, index: null, id: null });
  };

  const documentosFiltrados = documentos.filter((doc) =>
    doc.nomeArquivo?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <LayoutBase tipoMenu="cliente">
      <div className="p-4 sm:p-6 relative">
        <BarraTitulo className="mb-4 sm:mb-6">Documentos do Processo</BarraTitulo>

        <div className="flex justify-end mb-4 sm:mb-6">
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

        <div
          className="
            flex flex-wrap gap-4
            sm:gap-6
            md:grid md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            w-full
          "
        >
          {documentosFiltrados.length === 0 ? (
            <p className="text-gray-500 text-sm col-span-full">Nenhum documento encontrado.</p>
          ) : (
            documentosFiltrados.map((doc, idx) => (
              <div key={doc.id} className="flex-1 min-w-[220px] max-w-full">
                <CardDocumento
                  doc={doc}
                  onExcluir={() => confirmarExclusao(doc.id, idx)}
                />
              </div>
            ))
          )}
        </div>

        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8">
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