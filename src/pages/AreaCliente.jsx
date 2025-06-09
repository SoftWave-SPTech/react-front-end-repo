import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import DocumentosList from '../components/Ui/DocumentosList';
import ProcessoAndamento from '../components/Ui/ProcessoAndamento';
import ComentariosList from '../components/Ui/ComentariosList';
import BarraTitulo from '../components/Ui/BarraTitulo';

const VisualizarDocumentosProcesso = () => {
    return (
        <LayoutBase tipoMenu="cliente">
            <BarraTitulo>Contratos e petições</BarraTitulo>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row', // Garante lin
                    flexWrap: 'wrap',
                    gap: '32px',
                    padding: '32px',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    background: '#e7ecfa',
                    borderRadius: '16px',
                    minHeight: '60vh',
                }}
            >
                <div
                    style={{
                        flex: '1 1 320px',
                        minWidth: '320px',
                        maxWidth: '350px',
                        background: '#020E29',
                        borderRadius: '16px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        order: 1,
                        maxHeight: '500px', // Limite de altura
                        overflowY: 'auto'
                    }}
                >
                    <h2 style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        marginBottom: '12px',
                        color: 'white',
                        letterSpacing: '1px'
                    }}>Documentos</h2>
                    <DocumentosList />
                </div>
                {/* Andamento + Comentários em coluna */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1 1 400px',
                        minWidth: '320px',
                        maxWidth: '400px',
                        gap: '32px',
                        height: '100%',
                        order: 2
                    }}
                >
                    {/* Andamento */}
                    <div
                        style={{
                            background: '#020E29',
                            borderRadius: '16px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            color: 'white',
                        }}
                    >
                        <h2 style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            marginBottom: '12px',
                            color: 'white',
                            letterSpacing: '1px'
                        }}>Andamento</h2>
                        <ProcessoAndamento />
                    </div>

                    <div
                        style={{
                            background: '#020E29',
                            borderRadius: '16px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            padding: '16px',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <h2 style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            marginBottom: '12px',
                            color: 'white',
                            letterSpacing: '1px'
                        }}>Comentários</h2>
                        <ComentariosList />
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <button
                    style={{
                        padding: '12px 40px',
                        backgroundColor: '#001e3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        transition: 'background 0.2s',
                    }}
                    onMouseOver={e => (e.target.style.backgroundColor = '#003366')}
                    onMouseOut={e => (e.target.style.backgroundColor = '#001e3c')}
                >
                    Voltar
                </button>
            </div>
        </LayoutBase>
    );
};

export default VisualizarDocumentosProcesso;