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
    const [dadosProcesso, setDadosProcesso] = useState({});
    const [documentos, setDocumentos] = useState([]);
    const [andamentos, setAndamentos] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [advogados, setAdvogados] = useState([]);
    const [filtroDocumentos, setFiltroDocumentos] = useState('');
    const [filtroAndamentos, setFiltroAndamentos] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

    useEffect(() => {
        // Buscar dados completos do processo (inclui advogados)
        api.get(`/processos/visualizar-processo/${processoId}`)
            .then(res => {
                setDadosProcesso(res.data);
                setAdvogados(res.data.advogados || []);
                console.log("Dados do processo:", res.data);
                console.log("Advogados:", res.data.advogados);
            })
            .catch(error => {
                console.error("Erro ao buscar dados do processo:", error);
                setDadosProcesso({});
                setAdvogados([]);
            });

        // Buscar documentos do processo

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

        // Buscar andamentos do processo
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

        // Buscar comentários do processo
        api.get(`/comentarios-processos/buscar-por-proceso/${processoId}`)
            .then(res => {
                setComentarios(Array.isArray(res.data) ? res.data : []);
                console.log("Comentários:", res.data);
            })
            .catch(() => setComentarios([]));
    }, [processoId]);

    // Número do WhatsApp para contato (usando número padrão por enquanto)
    const telefone = "11989833914";
    const whatsappNumber = "55" + telefone;
    const whatsappMessage = encodeURIComponent("Olá, gostaria de conversar sobre meu processo.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <LayoutBase backgroundClass="bg-cinzaAzulado">
          {alert.show && (
            <AlertStyle message={alert.message} type={alert.type} onClose={() => setAlert({ show: false, message: '', type: 'error' })} />
           )}
            <BarraTitulo>Visualizar Processo</BarraTitulo>
            <div className="flex flex-col min-h-[60vh] rounded-2xl p-4 lg:p-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 w-full max-w-7xl mx-auto">
                    <div className="flex flex-col gap-6">
                    {/* Dados Processo */}
                                <div className="bg-white rounded-lg p-4 shadow w-full h-[400px] flex flex-col">
                                  <div className="text-lg font-bold mb-3 text-[#0C1833]"><strong>Dados Processo</strong></div>
                                  
                                  {/* Dados do processo em grid */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 flex-1 overflow-y-auto">
                                    <p className="break-words text-sm"><strong>Número do processo:</strong> {dadosProcesso.numeroProcesso}</p>
                                    <p className="break-words text-sm"><strong>Área:</strong> {dadosProcesso.area}</p>
                                    <p className="break-words text-sm"><strong>Assunto:</strong> {dadosProcesso.assunto}</p>
                                    <p className="break-words text-sm"><strong>Vara:</strong> {dadosProcesso.vara}</p>
                                    <p className="break-words text-sm"><strong>Fórum:</strong> {dadosProcesso.foro}</p>
                                    <p className="break-words text-sm"><strong>Juiz:</strong> {dadosProcesso.juiz}</p>
                                    <p className="break-words md:col-span-2 text-sm"><strong>Valor da causa:</strong> {dadosProcesso.valorAcao}</p>
                                  </div>

                                  {/* Seção de Advogados */}
                                  <div className="border-t pt-3 mt-auto">
                                    <div className="mb-2">
                                      <strong className="text-sm">Advogados:</strong>
                                    </div>
                                    {advogados && advogados.length > 0 ? (
                                      <div className="grid grid-cols-1 gap-2 max-h-20 overflow-y-auto">
                                        {advogados.map((advogado, index) => (
                                          <div key={index} className="text-xs text-gray-1000 bg-gray-50 p-2 rounded border">
                                            {advogado}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-xs text-gray-500">Nenhum advogado vinculado</p>
                                    )}
                                  </div>
                                </div>
                    {/* Comentários */}
                    <div className="bg-[#020E29] rounded-2xl shadow-lg p-4 flex flex-col h-[400px]">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-white text-lg lg:text-xl font-bold tracking-wide">Resumo Processo</h2>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#25D366] flex items-center gap-2 text-white rounded-lg font-bold text-xs lg:text-sm px-2 lg:px-3 py-2 shadow-md transition-colors duration-200 hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.657.406 3.221 1.117 4.604L2 22l5.396-1.117A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.485 0-2.91-.402-4.145-1.162l-.295-.176-3.203.662.662-3.203-.176-.295A7.963 7.963 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.297-6.255c-.237-.119-1.399-.691-1.616-.77-.217-.079-.375-.119-.532.119-.158.237-.609.77-.747.928-.138.158-.276.178-.513.059-.237-.119-.999-.368-1.903-1.174-.703-.627-1.179-1.403-1.318-1.64-.138-.237-.015-.364.104-.483.107-.106.237-.276.356-.414.119-.138.158-.237.237-.395.079-.158.04-.296-.02-.414-.059-.119-.532-1.287-.729-1.762-.192-.462-.388-.399-.532-.406-.138-.007-.296-.009-.454-.009-.158 0-.414.059-.63.296-.217.237-.827.808-.827 1.97s.847 2.285.965 2.445c.119.158 1.667 2.548 4.043 3.463.566.195 1.007.312 1.352.399.568.144 1.085.124 1.494.075.456-.055 1.399-.572 1.599-1.126.198-.553.198-1.027.139-1.126-.059-.099-.217-.158-.454-.277z"/>
                                </svg>
                                <span className="hidden sm:inline">WhatsApp</span>
                            </a>
                        </div>
                        <div className="overflow-y-auto flex-1 pr-2">
                            <ComentariosList comentarios={comentarios} />
                        </div>
                    </div>
                    </div>
                    {/* Andamento + Documentos em coluna */}
                    <div className="flex flex-col gap-6">
                        
                        {/* Documentos */}
                        <div className="bg-[#020E29] rounded-2xl shadow-lg p-4 flex flex-col h-[400px] text-white">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
                                <h2 className="text-white text-lg lg:text-xl font-bold tracking-wide">Documentos do Processo</h2>
                                <div className="relative w-full sm:w-64">
                                    <input
                                        type="text"
                                        placeholder="Pesquisar documentos..."
                                        value={filtroDocumentos}
                                        onChange={(e) => setFiltroDocumentos(e.target.value)}
                                        className="w-full bg-[#1a2a4a] text-white rounded-lg px-3 py-2 pl-10 text-sm border border-gray-600 focus:border-white focus:outline-none"
                                    />
                                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <DocumentosList documentos={documentos} filtro={filtroDocumentos} />
                        </div>
                        {/* Andamento */}
                        <div className="bg-[#020E29] rounded-2xl shadow-lg p-4 flex flex-col h-[400px] text-white">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
                                <h2 className="text-white text-lg lg:text-xl font-bold tracking-wide">Andamento</h2>
                                <div className="relative w-full sm:w-64">
                                    <input
                                        type="text"
                                        placeholder="Pesquisar andamento..."
                                        value={filtroAndamentos}
                                        onChange={(e) => setFiltroAndamentos(e.target.value)}
                                        className="w-full bg-[#1a2a4a] text-white rounded-lg px-3 py-2 pl-10 text-sm border border-gray-600 focus:border-white focus:outline-none"
                                    />
                                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <ProcessoAndamento andamentos={andamentos} processoId={processoId} filtro={filtroAndamentos} />
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
