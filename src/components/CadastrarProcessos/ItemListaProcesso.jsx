import React, { useEffect, useState } from "react";
import { FiFileText, FiTrash, FiEdit2 } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import ModalConfirmacao from '../Ui/ModalConfirmacao';
import Botao from '../Ui/Botao';
import Alert from '../Ui/AlertStyle';
import 'tailwindcss/tailwind.css';

export default function ItemListaProcesso() {
    const [processos, setProcessos] = useState([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(false);
    const [usuarioId, setUsuarioId] = useState("");
    const [role, setRole] = useState("");
    const [modalExcluir, setModalExcluir] = useState({ aberto: false, id: null });
    const [alert, setAlert] = useState({ open: false, type: "info", message: "" });
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
                    response = await api.get(`/processos/usuario-id/${usuarioId}`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`
                        }
                    });
                } else if (role === 'ROLE_ADMIN' || role === 'ROLE_DONO') {
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
                setAlert({
                    open: true,
                    type: "error",
                    message: "Erro ao buscar processos."
                });
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

    const parametrosVisualizarProcesso = async (processo) => {
        try {
            const response = await api.get(`/clientes/com-processos`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    
            const listaClientes = response.data;
    
            for (let cliente of listaClientes) {
                const processoEncontrado = cliente.processos.find(p => p.id === processo.id);
                if (processoEncontrado) {
                    navigate(`/processos-advogado/${cliente.id}/${processo.id}`, {
                        state: {
                            tipoUsuario: cliente.tipoUsuario
                        }
                    });
                    return;
                }
            }
    
            setAlert({
                open: true,
                type: "warning",
                message: "Processo não vinculado a nenhum cliente encontrado."
            });
    
        } catch (error) {
            setAlert({
                open: true,
                type: "error",
                message: "Erro ao buscar cliente do processo."
            });
            console.error("Erro ao buscar cliente do processo:", error);
        }
    };
    
    // Abrir modal de confirmação
    const confirmarExclusao = (id) => {
        if (role === 'ROLE_ADVOGADO') {
            setAlert({
                open: true,
                type: "warning",
                message: "Você não tem permissão para excluir processos."
            });
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
            setAlert({
                open: true,
                type: "success",
                message: "Processo excluído com sucesso!"
            });
        } catch (error) {
            setAlert({
                open: true,
                type: "error",
                message: "Erro ao excluir processo"
            });
            setModalExcluir({ aberto: false, id: null });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <div className="bg-AzulEscuro rounded-lg p-[2.5rem] font-sans w-full max-w-[56.25rem] mx-auto min-h-[45.8rem] flex flex-col" style={{ height: "70vh" }}>
            {alert.open && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={handleCloseAlert}
                />
            )}
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
        {processosFiltrados.map((processo) => (
          <div
            key={processo.id}
            className="bg-azulClaro rounded-lg flex justify-between items-center px-6 py-4"
          >
            <div className="flex flex-col min-w-0">
              <p className="font-sans text-branco text-2xl truncate">{processo.numeroProcesso}</p>
              <p className="text-branco text-base truncate">{processo.descricao}</p>
            </div>

            <div className="flex space-x-6">
              {/* Editar */}
              {podeEditar && (
                <button
                  onClick={() => onEdit && onEdit(processo)}
                  className="text-branco hover:text-dourado transition-colors"
                  title="Editar processo"
                >
                  <FiEdit2 size={24} className="md:w-6 md:h-6" />
                </button>
              )}

              {/* Visualizar */}
              <button
                onClick={() => parametrosVisualizarProcesso(processo)}
                className="text-branco hover:text-dourado transition-colors"
                title="Visualizar processo"
              >
                <FiFileText size={24} className="md:w-6 md:h-6" />
              </button>

              {/* Excluir */}
              {podeEditar && (
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
    );
}
