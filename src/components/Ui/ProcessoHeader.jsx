import React from 'react';

const ProcessoHeader = () => {
  return (
    <div style={{
      background: '#f0f2f5',
      padding: '20px',
      borderRadius: '8px',
      width: '70%'
    }}>
      <h2>Dados do Cliente</h2>
      <p><strong>Nome:</strong> João da Silva</p>
      <p><strong>Email:</strong> joao@email.com</p>
      <p><strong>Telefone:</strong> (11) 99999-9999</p>

      <h2 style={{ marginTop: '20px' }}>Dados do Processo</h2>
      <p><strong>Nº do Processo:</strong> 123456789-00.2022.8.26.0100</p>
      <p><strong>Assunto:</strong> Ação de Cobrança</p>
      <p><strong>Vara:</strong> 10ª Vara Cível</p>
    </div>
  );
};

export default ProcessoHeader;
