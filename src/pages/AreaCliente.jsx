import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../service/api';
import LayoutBase from '../layouts/LayoutBase';
import DocumentosList from '../components/Ui/DocumentosList';
import ProcessoAndamento from '../components/Ui/ProcessoAndamento';
import ComentariosList from '../components/Ui/ComentariosList';
import BarraTitulo from '../components/Ui/BarraTitulo';

const AreaCliente = () => {
    const { processoId } = useParams();
    const navigate = useNavigate();
    const [documentos, setDocumentos] = useState([]);
    const [andamentos, setAndamentos] = useState([]);
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        api.get(`/documentos-processos/processo/${processoId}`)
            .then(res => setDocumentos(Array.isArray(res.data) ? res.data : []))
            .catch(() => setDocumentos([]));

        api.get(`/ultimas-movimentacoes/processo/${processoId}/ordenadas`)
            .then(res => setAndamentos(Array.isArray(res.data) ? res.data : []))
            .catch(() => setAndamentos([]));

        api.get(`/comentarios-processos/buscar-por-proceso/${processoId}`)
            .then(res => setComentarios(Array.isArray(res.data) ? res.data : []))
            .catch(() => setComentarios([]));
    }, [processoId]);

    return (
        <LayoutBase tipoMenu="cliente">
            <BarraTitulo>Contratos e petições</BarraTitulo>
            <div className="flex flex-col min-h-[60vh] bg-[#e7ecfa] rounded-2xl p-8">
                <div className="flex flex-row flex-wrap gap-8 justify-center items-start w-full">
                    {/* Documentos */}
                    <div className="flex-1 min-w-[320px] max-w-[350px] bg-[#020E29] rounded-2xl shadow-lg p-4 flex flex-col h-full max-h-[500px] overflow-y-auto order-1">
                        <h2 className="text-white text-xl font-bold mb-3 tracking-wide">Documentos</h2>
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
                            <h2 className="text-white text-xl font-bold mb-3 tracking-wide">Comentários</h2>
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