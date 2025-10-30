import React from 'react';
import { FiFileText } from 'react-icons/fi';
import { api } from '../../service/api';

const DocumentosList = ({ documentos = [], filtro = '' }) => {
  const documentosFiltrados = documentos.filter(doc =>
    doc.nomeArquivo?.toLowerCase().includes(filtro.toLowerCase()) ||
    doc.data?.toLowerCase().includes(filtro.toLowerCase())
  );

  // Função para visualizar documento - igual nas outras telas
  const visualizarDocumento = (doc) => {
    const urlArquivo = doc.urlArquivo;
    
    if (!urlArquivo) {
      console.error("URL do arquivo não encontrada");
      return;
    }

    // Se é URL do S3 (começa com https://), precisa chamar endpoint de download
    // porque URLs do S3 não podem ser acessadas diretamente (dão Access Denied)
    if (urlArquivo.startsWith("https://") || urlArquivo.startsWith("http://")) {
      // Se tem ID, chama a API de download como nas outras telas
      if (doc.id) {
        const TOKEN = `Bearer ${sessionStorage.getItem('token')}`;
        api.get(`/documentos-processos/${doc.id}/download`, {
          headers: { "Authorization": TOKEN },
        })
        .then(response => {
          // Se o back devolve um objeto { url: "..." } ou a URL diretamente
          const fileUrl = response.data.url || response.data;
          window.open(fileUrl, "_blank");
        })
        .catch(error => {
          console.error("Erro ao gerar link de download:", error);
          // Se o endpoint não existir ou falhar, mostra mensagem
          alert("Erro ao abrir documento. O endpoint de download pode não estar disponível no backend.");
        });
      } else {
        // Se não tem ID mas é URL completa, tenta abrir (vai dar Access Denied se for S3)
        window.open(urlArquivo, "_blank");
      }
    } else {
      // Se é um caminho relativo, constrói a URL completa com localhost:8080
      window.open(`http://localhost:8080/${urlArquivo}`, "_blank");
    }
  };

  if (!documentos || documentos.length === 0) {
    return (
      <div className="bg-[#0f1b3e] text-white rounded-lg p-4 text-center">
        Nenhum documento encontrado.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Lista de documentos */}
      <div className="overflow-y-auto space-y-3 pr-2" style={{ height: '280px' }}>
        {documentosFiltrados.length === 0 ? (
          <div className="bg-[#0f1b3e] text-white rounded-lg p-4 text-center">
            Nenhum documento encontrado para "{filtro}".
          </div>
        ) : (
          documentosFiltrados.map((doc, index) => (
            <div key={index} className="mt-auto flex flex-col items-center w-full border-2 border-[#0f1b3e] rounded-lg p-3">
              <small className="text-gray-400 mb-1">{doc.data}</small>
              <div className="flex items-center flex-1 mr-3 w-full">
                <FiFileText className="text-2xl text-white flex-shrink-0 mr-3" />
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1 text-white">
                    {doc.nomeArquivo}
                  </div>
                  <div className="text-xs text-gray-300">
                    {doc.data}
                  </div>
                </div>
              </div>
              <button
                onClick={() => visualizarDocumento(doc)}
                className="bg-white text-[#0f1b3e] rounded-lg font-bold py-2 px-4 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1b3e] flex-shrink-0 w-full text-center mt-2"
              >
                Visualizar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default DocumentosList;