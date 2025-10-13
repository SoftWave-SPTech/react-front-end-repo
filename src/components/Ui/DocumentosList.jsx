import React from 'react';
import { FiFileText } from 'react-icons/fi';

const DocumentosList = ({ documentos = [] }) => {
  if (!documentos || documentos.length === 0) {
    return (
      <div style={{
        background: '#172042',
        color: '#bfc8e2',
        borderRadius: '8px',
        padding: '10px 16px',
        fontSize: '1rem',
        marginTop: '8px'
      }}>
        Nenhum documento encontrado.
      </div>
    );
  }

  return (
    <div className="flex-1 p-2">
      {documentos.map(doc => (
        <div
          key={doc.id}
          className="bg-white rounded-2xl shadow-md flex flex-col justify-between min-h-[110px] px-5 pt-5 pb-3 mb-4"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <FiFileText className="text-4xl text-[#0f1b3e] flex-shrink-0" />
            <p className="m-0 font-bold text-base text-center flex-1">{doc.nomeArquivo}</p>
          </div>
          <div className="mt-auto flex flex-col items-center w-full">
            <small className="text-gray-400 mb-1">{doc.data}</small>
            <a
              href={doc.urlArquivo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center border-2 border-[#0f1b3e] text-white bg-azulEscuroForte rounded-lg font-bold py-2 transition-colors duration-200 hover:bg-[#1b2a4e] hover:text-dourado"
            >
              Visualizar
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '15px',
  marginBottom: '10px',
  borderRadius: '8px',
  boxShadow: '0 0 6px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

export default DocumentosList;