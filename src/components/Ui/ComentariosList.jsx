import React from 'react';

const ComentariosList = ({ comentarios = [] }) => {

  console.log("Comentários recebidos:", comentarios);

  const ultimoComentario = comentarios.length > 0 ? comentarios[comentarios.length - 1] : null;

  return (
    <div className="bg-[#0f1b3e] text-white rounded-lg p-4">
      {!ultimoComentario && <p className="text-gray-400">Nenhum comentário encontrado.</p>}
      {ultimoComentario && (() => {
        let dataHora = ultimoComentario.dataCriacao;
        if (typeof dataHora === 'string' && dataHora.includes('T')) {
          const [data, hora] = dataHora.split('T');
          dataHora = data + ' ' + (hora ? hora.slice(0,8) : '');
        }
        return (
          <div key={ultimoComentario.id} className="mb-4">
            <div className="font-bold text-white mb-1">
              {ultimoComentario.nomeUsuario || 'Usuário'}
            </div>
            <div className="text-sm text-gray-300 mb-2">
              {dataHora}
            </div>
            <div className="text-sm text-gray-200 break-words">
              {ultimoComentario.comentario}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default ComentariosList;