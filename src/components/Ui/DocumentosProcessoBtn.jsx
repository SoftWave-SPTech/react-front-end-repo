import React, { useState } from 'react';
import AlertStyle from './AlertStyle';

const DocumentosProcessoBtn = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
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
        onClick={() => setShowAlert(true)}
      >
        📁 Documentos do Processo
      </button>
      {showAlert && (
        <Alert
          type="info"
          message="Abrir documentos do processo..."
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default DocumentosProcessoBtn;