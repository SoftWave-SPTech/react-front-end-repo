import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LayoutBase from '../layouts/LayoutBase';
import DocumentosList from '../components/Ui/DocumentosList';
import ProcessoAndamento from '../components/Ui/ProcessoAndamento';
import ComentariosList from '../components/Ui/ComentariosList';
import BarraTitulo from '../components/Ui/BarraTitulo';
import AlertStyle from '../components/Ui/AlertStyle';
import { api } from '../service/api';

const AreaCliente = () => {
    const { processoId } = useParams();
    const navigate = useNavigate();

    const [documentos, setDocumentos] = useState([]);
    const [andamentos, setAndamentos] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [advogado, setAdvogado] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

    let idAdvogado = 1; // ID padrão caso não exista

    useEffect(() => {
        // Buscar documentos
        api.get(`/documentos-processos/processo/${processoId}`)
            .then(res => setDocumentos(Array.isArray(res.data) ? res.data : []))
            .catch(error => {
                setDocumentos([]);
                console.error("Erro ao buscar documentos do processo:", error.status);
                if(error.status >= 500){
                    setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" });
                } else {
                    setAlert({ show: true, message: error.response?.data?.message || "Erro ao buscar documentos.", type: "error" });
                }
            });

        // Buscar andamentos
        api.get(`/ultimas-movimentacoes/processo/${processoId}/ordenadas`)
            .then(res => setAndamentos(Array.isArray(res.data) ? res.data : []))
            .catch(error => {
                setAndamentos([]);
                console.error("Erro ao buscar ultimas movimentações do processo:", error.status);
                if(error.status >= 500){
                    setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" });
                } else {
                    setAlert({ show: true, message: error.response?.data?.message || "Erro ao buscar andamentos.", type: "error" });
                }
            });

        // Buscar comentários
        api.get(`/comentarios-processos/buscar-por-proceso/${processoId}`)
            .then(res => {
                setComentarios(Array.isArray(res.data) ? res.data : []);
                if(res.data.length > 0) {
                    idAdvogado = res.data[res.data.length - 1].idUsuario;
                }
            })
            .catch(error => {
                setComentarios([]);
                console.error("Erro ao buscar análise e movimentação:", error.status);
                if(error.status >= 500){
                    setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" });
                } else {
                    setAlert({ show: true, message: error.response?.data?.message || "Erro ao buscar comentários.", type: "error" });
                }
            });
    }, [processoId]);

    // Buscar dados do advogado
    useEffect(() => {
        if (!idAdvogado) return;

        api.get(`/usuarios-fisicos/${idAdvogado}`)
            .then(res => setAdvogado(res.data))
            .catch(() => {
                api.get(`/usuarios-juridicos/${idAdvogado}`)
                    .then(res => setAdvogado(res.data))
                    .catch(() => setAdvogado(null));
            });
    }, [idAdvogado]);

    // Número do WhatsApp para contato
    let telefone = "11989833914"; // número padrão
    if (advogado) telefone = advogado.telefone || telefone;

    const whatsappNumber = "55" + telefone;
    const whatsappMessage = encodeURIComponent("Olá, gostaria de conversar sobre meu processo.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <LayoutBase backgroundClass="bg-cinzaAzulado">
            <BarraTitulo>Visualizar Processo</BarraTitulo>
            <div className="flex flex-col min-h-[60vh] rounded-2xl p-8">

                {alert.show && (
                    <AlertStyle
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert({ show: false, message: '', type: 'error' })}
                    />
                )}

                <div className="flex flex-row flex-wrap gap-8 justify-center items-start w-full">
                    {/* Documentos */}
                    <div className="flex-1 min-w-[320px] max-w-[350px] bg-[#020E29] rounded-2xl shadow-lg p-4 flex flex-col h-full max-h-[500px] overflow-y-auto order-1">
                        <h2 className="text-white text-xl font-bold mb-3 tracking-wide">Documentos do Processo</h2>
                        <DocumentosList documentos={documentos} />
                    </div>

                    {/* Andamento + Comentários em coluna */}
                    <div className="flex flex-col flex-1 min-w-[320px] max-w-[400px] gap-8 h-full order-2">
                        {/* Andamento */}
                        <div className="bg-[#020E29] rounded-2xl shadow-lg p-4 flex flex-col h-full text-white">
                            <h2 className="text-white text-xl font-bold mb-3 tracking-wide">Andamento</h2>
                            <ProcessoAndamento andamentos={andamentos} processoId={processoId} />
                        </div>

                        {/* Comentários */}
                        <div className="bg-[#020E29] rounded-2xl shadow-lg p-4 text-white flex flex-col">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-white text-xl font-bold tracking-wide">Resumo Processo</h2>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#25D366] flex items-center gap-2 text-white rounded-lg font-bold text-sm px-3 py-2 shadow-md transition-colors duration-200 hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.657.406 3.221 1.117 4.604L2 22l5.396-1.117A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.485 0-2.91-.402-4.145-1.162l-.295-.176-3.203.662.662-3.203-.176-.295A7.963 7.963 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.297-6.255c-.237-.119-1.399-.691-1.616-.77-.217-.079-.375-.119-.532.119-.158.237-.609.77-.747.928-.138.158-.276.178-.513.059-.237-.119-.999-.368-1.903-1.174-.703-.627-1.179-1.403-1.318-1.64-.138-.237-.015-.364.104-.483.107-.106.237-.276.356-.414.119-.138.158-.237.237-.395.079-.158.04-.296-.02-.414-.059-.119-.532-1.287-.729-1.762-.192-.462-.388-.399-.532-.406-.138-.007-.296-.009-.454-.009-.158 0-.414.059-.63.296-.217.237-.827.808-.827 1.97s.847 2.285.965 2.445c.119.158 1.667 2.548 4.043 3.463.566.195 1.007.312 1.352.399.568.144 1.085.124 1.494.075.456-.055 1.399-.572 1.599-1.126.198-.553.198-1.027.139-1.126-.059-.099-.217-.158-.454-.277z"/>
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>
                            <ComentariosList comentarios={comentarios} />
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-center mt-8">
                    <button
                        className="bg-[#0f1b3e] text-white rounded-lg font-bold text-lg px-16 py-3 shadow-md transition-colors duration-200 hover:bg-[#20294a] hover:text-[#d4b063] focus:outline-none focus:ring-2 focus:ring-[#d4b063] focus:ring-offset-2"
                        onClick={() => navigate(-1)}
                    >
                        Voltar
                    </button>
                </div>
             </div>
        </LayoutBase>
    );
};

export default AreaCliente;
