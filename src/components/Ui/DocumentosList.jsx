import React from 'react';

const DocumentosList = ({ documentos = [] }) => {
  if (!documentos || documentos.length === 0) {
    return (
      <div style={{
        background: '#172042',
        color: '#bfc8e2',
        borderRadius: '8px',
        padding: '10px 16px',
        fontSize: '1rem',
        marginTop: '8px'
      }}>
        Nenhum documento encontrado.
      </div>
    );
  }

  return (
    <div style={{ flex: 1, padding: '10px' }}>
      {documentos.map(doc => (
        <div key={doc.id} style={{
          ...cardStyle,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'left',
          minHeight: '70px',
        }}>
          <div style={{ fontSize: '40px', flexShrink: 0 }}>📄</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.05rem' }}>{doc.nomeArquivo}</p>
            <small style={{ color: '#888' }}>{doc.data}</small>
            <div style={{ marginTop: '6px' }}>
              <a
                href={`http://localhost:8080/${doc.urlArquivo}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#001e3c',
                  textDecoration: 'underline',
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Visualizar
              </a>
            </div>
          </div>
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