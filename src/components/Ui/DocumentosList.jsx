import React from 'react';
import { FiFileText } from 'react-icons/fi';

const DocumentosList = ({ documentos = [], filtro = '' }) => {
  const documentosFiltrados = documentos.filter(doc =>
    doc.nomeArquivo?.toLowerCase().includes(filtro.toLowerCase()) ||
    doc.data?.toLowerCase().includes(filtro.toLowerCase())
  );

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
          <div className="mt-auto flex flex-col items-center w-full">
            <small className="text-gray-400 mb-1">{doc.data}</small>
            <a
              href={doc.urlArquivo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center border-2 border-[#0f1b3e] text-white bg-azulEscuroForte rounded-lg font-bold py-2 transition-colors duration-200 hover:bg-[#1b2a4e] hover:text-dourado"
            >
              <div className="flex items-center flex-1 mr-3">
                <FiFileText className="text-2xl text-white flex-shrink-0 mr-3" />
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1">
                    {doc.nomeArquivo}
                  </div>
                  <div className="text-xs text-gray-300">
                    {doc.data}
                  </div>
                </div>
              </div>
              <a
                href={`http://localhost:8080/${doc.urlArquivo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#0f1b3e] rounded-lg font-bold py-2 px-4 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1b3e] flex-shrink-0"
              >
                Visualizar
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default DocumentosList;