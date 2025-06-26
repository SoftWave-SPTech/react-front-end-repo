import React, { useState } from 'react';

const ComentarioCliente = () => {
  const [comentario, setComentario] = useState('');

  const enviarComentario = () => {
    if (comentario.trim()) {
      alert(`Comentário enviado: ${comentario}`);
      setComentario('');
    }
  };

  return (
    <div style={{
      marginTop: '30px',
      background: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px'
    }}>
      <h3>💬 Comentário ao Cliente</h3>
      <textarea
        rows="4"
        value={comentario}
        onChange={e => setComentario(e.target.value)}
        placeholder="Escreva um comentário para o cliente..."
        style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
      />
      <button
        onClick={enviarComentario}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default ComentarioCliente;