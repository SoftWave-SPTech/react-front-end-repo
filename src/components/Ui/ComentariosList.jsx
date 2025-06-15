import React from 'react';

const comentarios = [
  {
    id: 1,
    nome: 'Cristian Lauriano',
    data: 'Abril 05, 2025',
    texto: 'Reunião agendada para o dia 07/04/2025'
  },
  {
    id: 2,
    nome: 'Cristian Lauriano',
    data: 'Abril 05, 2025',
    texto: 'Nova petição enviada.'
  }
];

const ComentariosList = () => {
  return (
    <div style={{ flex: 1, padding: '10px' }}>
      <div style={{ backgroundColor: '#0f1b3e', color: 'white', borderRadius: '8px', padding: '10px' }}>
        {comentarios.map(com => (
          <div key={com.id} style={{ marginBottom: '15px' }}>
            <strong>{com.nome}</strong> <small>{com.data}</small>
            <p>{com.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComentariosList;
