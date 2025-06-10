import React from 'react';

const DocumentosList = ({ documentos = [] }) => {
  return (
    <div style={{ flex: 1, padding: '10px' }}>
      {documentos.map(doc => (
        <div key={doc.id} style={cardStyle}>
          <p>{doc.nome}</p>
          <div style={{ fontSize: '48px' }}>📄</div>
          <small>{doc.data}</small>
        </div>
      ))}
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '15px',
  marginBottom: '10px',
  borderRadius: '8px',
  boxShadow: '0 0 6px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

export default DocumentosList;
