import React from 'react';

const ComentariosList = ({ comentarios = [] }) => {

  console.log("Comentários recebidos:", comentarios);

  const ultimoComentario = comentarios.length > 0 ? comentarios[comentarios.length - 1] : null;

  return (
    <div style={{ flex: 1, padding: '10px' }}>
      <div style={{ backgroundColor: '#0f1b3e', color: 'white', borderRadius: '8px', padding: '10px' }}>
        {!ultimoComentario && <p style={{ color: '#aaa' }}>Nenhum comentário encontrado.</p>}
        {ultimoComentario && (() => {
          let dataHora = ultimoComentario.dataCriacao;
          if (typeof dataHora === 'string' && dataHora.includes('T')) {
            const [data, hora] = dataHora.split('T');
            dataHora = data + ' ' + (hora ? hora.slice(0,8) : '');
          }
          return (
            <div key={ultimoComentario.id} style={{ marginBottom: '15px' }}>
              <strong>{ultimoComentario.nomeUsuario || 'Usuário'}</strong>
              <br />
              <small style={{ color: '#bfc8e2', display: 'block', marginBottom: '4px' }}>{dataHora}</small>
              <p>{ultimoComentario.comentario}</p>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default ComentariosList;