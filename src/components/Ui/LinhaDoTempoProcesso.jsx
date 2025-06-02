import React from 'react';

const LinhaDoTempoProcesso = () => {
  const eventos = [
    { data: '10/01/2024', descricao: 'Petição Inicial protocolada' },
    { data: '20/01/2024', descricao: 'Despacho do juiz' },
    { data: '01/02/2024', descricao: 'Audiência marcada' },
  ];

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>📅 Status do Processo</h3>
      <div style={{ display: 'flex', overflowX: 'auto', gap: '20px' }}>
        {eventos.map((evento, idx) => (
          <div key={idx} style={{
            minWidth: '200px',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '8px',
            background: '#fafafa'
          }}>
            <p><strong>{evento.data}</strong></p>
            <p>{evento.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinhaDoTempoProcesso;
