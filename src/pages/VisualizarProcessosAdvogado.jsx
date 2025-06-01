import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import ProcessoHeader from '../components/Ui/ProcessoHeader';
import DocumentosCliente from '../components/Ui/DocumentosCliente';
import LinhaDoTempoProcesso from '../components/Ui/LinhaDoTempoProcesso';
import ComentarioCliente from '../components/Ui/ComentarioCliente';
import Botao from '../components/Ui/Botao';

const VisualizarProcessosAdvogado = () => {
  // Exemplo de handlers para os botões
  const handleAtualizar = () => {
    // lógica para atualizar processo
  };

  const handleDocumentos = () => {
    // lógica para visualizar documentos do processo
  };

  const handleVoltar = () => {
    // lógica para voltar
  };

  return (
    <LayoutBase>
<div className="container" style={{ padding: '20px' }}>
  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
    <Botao
      onClick={handleAtualizar}
      variant="primary"
      style={{ padding: '4px 12px', fontSize: '0.85rem', minWidth: 'unset' }}
    >
      Atualizar Processo
    </Botao>
    <Botao
      onClick={handleDocumentos}
      variant="secondary"
      style={{ padding: '4px 12px', fontSize: '0.85rem', minWidth: 'unset' }}
    >
      Documentos do Processo
    </Botao>
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
    <ProcessoHeader />
    <img
      src="src/pages/Tigre.jpg"
      alt="Foto do Cliente"
      style={{
        width: '260px',
        height: '260px',
        objectFit: 'cover',
        borderRadius: '8px',
        border: '2px solid #eee',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
      }}
    />
  </div>
  <div style={{ marginTop: '20px' }}>
    <DocumentosCliente />
  </div>
  <LinhaDoTempoProcesso />
  <ComentarioCliente />
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
    <Botao
      onClick={handleVoltar}
      variant="outline"
      style={{ padding: '4px 12px', fontSize: '0.85rem', minWidth: 'unset' }}
    >
      Voltar
    </Botao>
  </div>
</div>
    </LayoutBase>
  );
};

export default VisualizarProcessosAdvogado;