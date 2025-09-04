import React from 'react';

const DocumentosCliente = () => {
  const docs = ['RG.pdf', 'CPF.pdf', 'Comprovante de Endereço.pdf'];

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
      <h3>📎 Documentos do Cliente</h3>
      <ul>
        {docs.map((doc, idx) => (
          <li key={idx}>
            📄 {doc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentosCliente;