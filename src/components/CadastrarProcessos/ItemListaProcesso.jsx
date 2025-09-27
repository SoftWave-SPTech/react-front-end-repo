import React, { useEffect, useState } from "react";
import { FiFileText, FiTrash, FiEdit2 } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import ModalConfirmacao from '../Ui/ModalConfirmacao';
import Alert from '../Ui/AlertStyle';
import 'tailwindcss/tailwind.css';

export default function ItemListaProcesso({ onEdit, reloadKey = 0 }) {
  const [processos, setProcessos] = useState([]);
  const [busca, setBusca] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [role, setRole] = useState("");
  const [modalExcluir, setModalExcluir] = useState({ aberto: false, id: null });
  const [alert, setAlert] = useState({ show: false, message: '', type: 'info' });
  const navigate = useNavigate();

  // Pega id e role do usuário logado
  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const r = sessionStorage.getItem('role');
    if (id && r) {
      setUsuarioId(id);
      setRole(r);
    }
  }, []);

  // Função para buscar processos
  const fetchProcessos = async () => {
    try {
      let response;
      if (role === 'ROLE_ADVOGADO') {
        response = await api.get(`/processos/usuario-id/${usuarioId}`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
      } else if (role === 'ROLE_ADMIN' || role === 'ROLE_DONO') {
        response = await api.get('/processos', {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
      }
      if (response) setProcessos(response.data);
    } catch (error) {
      console.error('Erro ao buscar processos:', error);
      if (error.status >= 500) {
        setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte.", type: "error" });
      } else {
        setAlert({ show: true, message: error.response?.data?.message || "Erro ao buscar processos.", type: "error" });
      }
    }
  };

  // Busca processos quando role/id mudam ou reloadKey é atualizado
  useEffect(() => {
    if (role && usuarioId) fetchProcessos();
  }, [role, usuarioId, reloadKey]);

  // Filtra processos pelo número ou descrição
  const processosFiltrados = processos.filter((proc) =>
    (proc.numeroProcesso?.toLowerCase().includes(busca.toLowerCase()) || "") ||
    (proc.descricao?.toLowerCase().includes(busca.toLowerCase()) || "")
  );

  // Visualizar processo
  const parametrosVisualizarProcesso = async (processo) => {
    try {
      const response = await api.get(`/clientes/com-processos`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      });
      const listaClientes = response.data;

      for (let cliente of listaClientes) {
        const processoEncontrado = cliente.processos.find(p => p.id === processo.id);
        if (processoEncontrado) {
          navigate(`/processos-advogado/${cliente.id}/${processo.id}`, {
            state: { tipoUsuario: cliente.tipoUsuario }
          });
          return;
        }
      }

      setAlert({ show: true, type: "warning", message: "Processo não vinculado a nenhum cliente encontrado." });
    } catch (error) {
      console.error("Erro ao buscar cliente do processo:", error);
      if (error.status >= 500) {
        setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte.", type: "error" });
      } else {
        setAlert({ show: true, message: error.response?.data?.message || "Erro ao buscar processo.", type: "error" });
      }
    }
  };

  // Confirmação de exclusão
  const confirmarExclusao = (id) => {
    if (role === 'ROLE_ADVOGADO') {
      setAlert({ show: true, type: "warning", message: "Você não tem permissão para excluir processos." });
      return;
    }
    setModalExcluir({ aberto: true, id });
  };

  const cancelarExclusao = () => setModalExcluir({ aberto: false, id: null });

  // Excluir processo
  const excluirProcesso = async () => {
    try {
      await api.delete(`/processos/${modalExcluir.id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      });
      setProcessos(prev => prev.filter(proc => proc.id !== modalExcluir.id));
      setModalExcluir({ aberto: false, id: null });
      setAlert({ show: true, type: "success", message: "Processo excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir processo:", error);
      if (error.status >= 500) {
        setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte.", type: "error" });
      } else {
        setAlert({ show: true, message: error.response?.data?.message || "Erro ao excluir processo.", type: "error" });
      }
      setModalExcluir({ aberto: false, id: null });
    }
  };

  const podeEditar = role === 'ROLE_ADMIN' || role === 'ROLE_DONO';

  return (
    <div className="bg-AzulEscuro rounded-lg p-[2.5rem] font-sans w-full max-w-[56.25rem] mx-auto min-h-[45.8rem] flex flex-col" style={{ height: "70vh" }}>
      
      {/* ALERT */}
      {alert.show && (
        <Alert type={alert.type} onClose={() => setAlert({ ...alert, show: false })}>
          {alert.message}
        </Alert>
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

      <div className="overflow-y-auto custom-scrollbar flex-1 pr-6" style={{ minHeight: 0, maxHeight: "100rem" }}>
        <style>{`
          .custom-scrollbar { scrollbar-color: #0F2A5E ; }
          .custom-scrollbar::-webkit-scrollbar { width: 1.25rem; background: #F4F4F4; border-radius: 0.75rem; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #0F2A5E; border-radius: 1.25rem; border: 0.25rem solid #F4F4F4; }
          .custom-scrollbar::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
        `}</style>

        <div className="flex flex-col gap-4 h-full">
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
                {podeEditar && (
                  <button
                    onClick={() => onEdit && onEdit(processo)}
                    className="text-branco hover:text-dourado transition-colors"
                    title="Editar processo"
                  >
                    <FiEdit2 size={24} className="md:w-6 md:h-6" />
                  </button>
                )}
                <button
                  onClick={() => parametrosVisualizarProcesso(processo)}
                  className="text-branco hover:text-dourado transition-colors"
                  title="Visualizar processo"
                >
                  <FiFileText size={24} className="md:w-6 md:h-6" />
                </button>
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
