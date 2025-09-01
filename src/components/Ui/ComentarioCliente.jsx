import React, { useState } from 'react';
import Alert from './AlertStyle';

const AtualizarProcessoBtn = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <div style={{ textAlign: 'right', marginBottom: '10px' }}>
      {showAlert && (
        <Alert
          type="info"
          message="Atualizar processo..."
          onClose={handleClose}
        />
      )}
      <button
        style={{
          background: '#ffc107',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        🔄 Atualize seu Processo
      </button>
    </div>
  );
};

export default AtualizarProcessoBtn;