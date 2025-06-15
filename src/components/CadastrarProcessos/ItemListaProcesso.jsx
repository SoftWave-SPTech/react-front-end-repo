import React, { useEffect, useState } from "react";
import { FiFileText, FiTrash } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import ModalConfirmacao from '../Ui/ModalConfirmacao';
import Botao from '../Ui/Botao';
import 'tailwindcss/tailwind.css';

export default function ItemListaProcesso() {
    const [processos, setProcessos] = useState([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(false);
    const [usuarioId, setUsuarioId] = useState("");
    const [role, setRole] = useState("");
    const [modalExcluir, setModalExcluir] = useState({ aberto: false, id: null });
    const navigate = useNavigate();

    useEffect(() => {
        const id = sessionStorage.getItem('id');
        const role = sessionStorage.getItem('role');
        if (id && role) {
            setUsuarioId(id);
            setRole(role);
        }
    }, []);

    useEffect(() => {
        const fetchProcessos = async () => {
            try {
                let response;
                if (role === 'ROLE_ADVOGADO') {
                    // Se for advogado, busca apenas os processos do usuário
                    response = await api.get(`/processos/usuario-id/${usuarioId}`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`
                        }
                    });
                } else if (role === 'ROLE_ADMIN' || role === 'ROLE_DONO') {
                    // Se for admin ou dono, busca todos os processos
                    response = await api.get('/processos', {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`
                        }
                    });
                }
                
                if (response) {
                    setProcessos(response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar processos:', error);
            }
        };

        if (role && usuarioId) {
            fetchProcessos();
        }
    }, [role, usuarioId]);

    const processosFiltrados = processos.filter(
        (proc) =>
            (proc.numeroProcesso?.toLowerCase().includes(busca.toLowerCase()) || "") ||
            (proc.descricao?.toLowerCase().includes(busca.toLowerCase()) || "")
    );

    // Função para visualizar processo
    const handleViewProcesso = (processoId) => {
        navigate(`/visualizar-processo/${processoId}`);
    };

    // Abrir modal de confirmação
    const confirmarExclusao = (id) => {
        if (role === 'ROLE_ADVOGADO') {
            alert('Você não tem permissão para excluir processos.');
            return;
        }
        setModalExcluir({ aberto: true, id });
    };

    // Cancelar exclusão
    const cancelarExclusao = () => {
        setModalExcluir({ aberto: false, id: null });
    };

    // Excluir processo
    const excluirProcesso = async () => {
        try {
            await api.delete(`/processos/${modalExcluir.id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            setProcessos(prev => prev.filter(proc => proc.id !== modalExcluir.id));
            setModalExcluir({ aberto: false, id: null });
            alert('Processo excluído com sucesso!');
        } catch (error) {
            alert('Erro ao excluir processo');
            setModalExcluir({ aberto: false, id: null });
        }
    };

    return (
        <div className="bg-AzulEscuro rounded-lg p-[2.5rem] font-sans w-full max-w-[56.25rem] mx-auto min-h-[44.5rem] flex flex-col" style={{ height: "70vh" }}>
            <div className="flex items-center mb-6 pb-4">
                <h2 className="text-3xl font-normal text-dourado flex-1">Processos</h2>
                <div className="relative w-[16rem] max-w-full">
                    <input
                        type="text"
                        placeholder="Número ou descrição"
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                        className="w-full rounded-md py-[0.5rem] pl-3 pr-8 text-lg bg-branco text-preto focus:outline-none"
                    />
                    <span className="absolute right-2 top-2 text-preto opacity-60 pointer-events-none">
                        <svg width="1.125rem" height="1.125rem" fill="none" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                            <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </span>
                </div>
            </div>
            <div
                className="overflow-y-auto custom-scrollbar flex-1 pr-6"
                style={{
                    minHeight: 0,
                    maxHeight: "100rem",
                }}
            >
                <style>
                    {`
                    .custom-scrollbar {
                        scrollbar-color: #0F2A5E ;
                    }
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 1.25rem;
                        background: #F4F4F4;
                        border-radius: 0.75rem;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #0F2A5E;
                        border-radius: 1.25rem;
                        border: 0.25rem solid #F4F4F4;
                    }
                    .custom-scrollbar::-webkit-scrollbar-button {
                        display: none;
                        width: 0;
                        height: 0;
                    }
                    `}
                </style>
                <div className="flex flex-col gap-4 h-full">
                    {processosFiltrados.map((processo) => (
                        <div
                            key={processo.id}
                            className="bg-azulClaro rounded-lg flex justify-between items-center"
                            style={{
                                paddingLeft: "1.5rem",
                                paddingRight: "1.5rem",
                                paddingTop: "1rem",
                                paddingBottom: "1rem"
                            }}
                        >
                            <div className="flex flex-col min-w-0">
                                <p className="font-sans text-branco text-2xl truncate">{processo.numeroProcesso}</p>
                                <p className="text-branco text-base truncate">{processo.descricao}</p>
                            </div>
                            <div className="flex space-x-6">
                                <button 
                                    onClick={() => handleViewProcesso(processo.id)}
                                    className="text-branco hover:text-dourado transition-colors" 
                                    title="Visualizar processo"
                                >
                                    <FiFileText size={24} className="md:w-6 md:h-6" />
                                </button>
                                    {(role === 'ROLE_ADMIN' || role === 'ROLE_DONO') && (
                                    <button 
                                        onClick={() => confirmarExclusao(processo.id)}
                                        className="text-branco hover:text-dourado transition-colors" 
                                        title="Excluir processo"
                                    >
                                        <FiTrash size={24} className="md:w-6 md:h-6" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {processosFiltrados.length === 0 && (
                        <div className="text-branco text-center py-8 opacity-70">Nenhum processo encontrado.</div>
                    )}
                </div>
            </div>
            {modalExcluir.aberto && (
                <ModalConfirmacao
                    titulo="Confirmar exclusão"
                    mensagem="Tem certeza que deseja excluir este processo?"
                    onConfirmar={excluirProcesso}
                    onCancelar={cancelarExclusao}
                />
            )}
        </div>
    );
}
