import React from 'react';

const ComentariosList = ({ comentarios = [] }) => {

  console.log("Comentários recebidos:", comentarios);

  return (
    <div style={{ flex: 1, padding: '10px' }}>
      <div style={{ backgroundColor: '#0f1b3e', color: 'white', borderRadius: '8px', padding: '10px' }}>
        {comentarios.length === 0 && <p style={{ color: '#aaa' }}>Nenhum comentário encontrado.</p>}
        {comentarios.map(com => {
          // Separar data e hora se vierem juntos (ex: 2025-06-13T00:43:29.835053)
          let dataHora = com.dataCriacao;
          if (typeof dataHora === 'string' && dataHora.includes('T')) {
            const [data, hora] = dataHora.split('T');
            dataHora = data + ' ' + (hora ? hora.slice(0,8) : '');
          }
          return (
            <div key={com.id} style={{ marginBottom: '15px' }}>
              <strong>{com.nomeUsuario || 'Usuário'}</strong>
              <br />
              <small style={{ color: '#bfc8e2', display: 'block', marginBottom: '4px' }}>{dataHora}</small>
              <p>{com.comentario}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComentariosList;