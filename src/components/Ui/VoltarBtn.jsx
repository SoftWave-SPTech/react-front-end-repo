import React from 'react';
import { useNavigate } from 'react-router-dom';

const VoltarBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        marginTop: '30px',
        padding: '10px 20px',
        background: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      ⬅️ Voltar
    </button>
  );
};

export default VoltarBtn;
