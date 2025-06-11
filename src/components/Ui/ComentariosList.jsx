import React from 'react';

const ComentariosList = ({ comentarios = [] }) => {
  return (
    <div style={{ flex: 1, padding: '10px' }}>
      <div style={{ backgroundColor: '#0f1b3e', color: 'white', borderRadius: '8px', padding: '10px' }}>
        {comentarios.length === 0 && <p style={{ color: '#aaa' }}>Nenhum comentário encontrado.</p>}
        {comentarios.map(com => (
          <div key={com.id} style={{ marginBottom: '15px' }}>
            <strong>{com.nome || 'Usuário'}</strong> <small>{com.dataCriacao}</small>
            <p>{com.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComentariosList;
