import React from 'react';

const AtualizarProcessoBtn = () => {
  return (
    <div style={{ textAlign: 'right', marginBottom: '10px' }}>
      <button
        style={{
          background: '#ffc107',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Atualizar processo...')}
      >
        🔄 Atualize seu Processo
      </button>
    </div>
  );
};

export default AtualizarProcessoBtn;