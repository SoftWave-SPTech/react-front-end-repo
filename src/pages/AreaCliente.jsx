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
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '64px', // aumentado
                    padding: '64px', // aumentado
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    background: '#e7ecfa',
                    borderRadius: '32px', // aumentado
                    minHeight: '80vh', // aumentado
                }}
            >
                <div
                    style={{
                        flex: '1 1 640px', // aumentado
                        minWidth: '640px', // aumentado
                        maxWidth: '700px', // aumentado
                        background: '#020E29',
                        borderRadius: '32px', // aumentado
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)', // aumentado
                        padding: '32px', // aumentado
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        order: 1,
                        maxHeight: '900px', // aumentado
                        overflowY: 'auto'
                    }}
                >
                    <h2 style={{
                        fontSize: '2.4rem', // aumentado
                        fontWeight: 'bold',
                        marginBottom: '24px', // aumentado
                        color: 'white',
                        letterSpacing: '2px' // aumentado
                    }}>Documentos</h2>
                    <DocumentosList />
                </div>
                {/* Andamento + Comentários em coluna */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1 1 800px', // aumentado
                        minWidth: '640px', // aumentado
                        maxWidth: '900px', // aumentado
                        gap: '64px', // aumentado
                        height: '100%',
                        order: 2
                    }}
                >
                    {/* Andamento */}
                    <div
                        style={{
                            background: '#020E29',
                            borderRadius: '32px', // aumentado
                            boxShadow: '0 4px 16px rgba(0,0,0,0.08)', // aumentado
                            padding: '32px', // aumentado
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            color: 'white',
                        }}
                    >
                        <h2 style={{
                            fontSize: '2.4rem', // aumentado
                            fontWeight: 'bold',
                            marginBottom: '24px', // aumentado
                            color: 'white',
                            letterSpacing: '2px' // aumentado
                        }}>Andamento</h2>
                        <ProcessoAndamento />
                    </div>

                    <div
                        style={{
                            background: '#020E29',
                            borderRadius: '32px', // aumentado
                            boxShadow: '0 4px 16px rgba(0,0,0,0.08)', // aumentado
                            padding: '32px', // aumentado
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <h2 style={{
                            fontSize: '2.4rem', // aumentado
                            fontWeight: 'bold',
                            marginBottom: '24px', // aumentado
                            color: 'white',
                            letterSpacing: '2px' // aumentado
                        }}>Comentários</h2>
                        <ComentariosList />
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '64px' }}> {/* aumentado */}
                <button
                    style={{
                        padding: '24px 80px', // aumentado
                        backgroundColor: '#001e3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '16px', // aumentado
                        fontSize: '2.2rem', // aumentado
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)', // aumentado
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