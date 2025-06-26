import React from 'react';

const DocumentosProcessoBtn = () => {
  return (
    <button
      style={{
        height: 'fit-content',
        padding: '10px 15px',
        background: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
      onClick={() => alert('Abrir documentos do processo...')}
    >
      📁 Documentos do Processo
    </button>
  );
};

export default DocumentosProcessoBtn;