import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';
import LayoutBase from '../layouts/LayoutBase';
import CardClientesProcessos from '../components/PesquisarProcessos/CardClientesProcessos';
import BotaoFiltros from '../components/PesquisarProcessos/BotaoFiltros';
import BarraTitulo from '../components/Ui/BarraTitulo';
import AlertStyle from '../components/Ui/AlertStyle';

const filtros = [
  { label: "Setor", endpoint: "filtro-setor" },
  { label: "Fórum", endpoint: "filtro-foro" },
  { label: "Vara", endpoint: "filtro-vara" },
  { label: "Assunto", endpoint: "filtro-assunto" },
  { label: "Descrição", endpoint: "filtro-descricao" },
  { label: "Status Cliente", endpoint: "filtro-status-cliente" }
];

const PesquisarProcessos = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState(null);
  const [role, setRole] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [filtroAberto, setFiltroAberto] = useState(null);
  const [alert, setAlert] = useState();

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6; // Número de itens por página

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (id && role) {
      setUsuarioId(id);
      setRole(role);
    }
  }, []);

  useEffect(() => {
    if (!role || !usuarioId) return;
    buscarClientes(currentPage);
  }, [role, usuarioId, currentPage]);

  const buscarClientes = async (page = 0) => {
    try {
      setLoading(true);
      let response;
      if (role === 'ROLE_ADMIN' || role === 'ROLE_DONO') {
        response = await api.get(`/clientes/com-processos?page=${page}&size=${itemsPerPage}`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
      } else if (role === 'ROLE_ADVOGADO') {
        response = await api.get(`/clientes/com-processos/advogado/${usuarioId}?page=${page}&size=${itemsPerPage}`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
      }
      if (response) {
        setClientes(response.data.content); // Assumindo que a resposta tem a estrutura content
        setTotalPages(response.data.totalPages); // Total de páginas
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error.status);
      if (error.status >= 500) {
        setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" });
      } else {
        setAlert({ show: true, message: error.response.data.message, type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBusca = async (termo) => {
    if (!termo.trim()) {
      buscarClientes(currentPage);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/clientes/pesquisa/${termo}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error.status);
      if (error.response?.data?.message?.includes("Nenhuma pesquisa encontrado")) {
        setClientes([]);
      }
      if (error.status >= 500) {
        setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" });
      } else {
        setAlert({ show: true, message: error.response.data.message, type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFiltro = async (filtro, valor) => {
    if (!filtro.endpoint) return;

    try {
      setLoading(true);
      const response = await api.get(`/clientes/${filtro.endpoint}/${valor}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      setClientes(response.data);
      setFiltroAtivo({ ...filtro, valor });
    } catch (error) {
      console.error('Erro ao aplicar filtro:', error.status);
      if (error.status >= 500) {
        setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" });
      } else {
        setAlert({ show: true, message: error.response.data.message, type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLimparFiltros = async () => {
    setFiltroAtivo(null);
    setBusca("");
    await buscarClientes(currentPage);
  };

  const handleToggleFiltro = (label) => {
    setFiltroAberto(filtroAberto === label ? null : label);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const clientesFiltrados = Array.isArray(clientes) ? clientes.filter(cliente =>
    (cliente.nome?.toLowerCase() || '').includes(busca.toLowerCase()) ||
    (cliente.nomeFantasia?.toLowerCase() || '').includes(busca.toLowerCase()) ||
    cliente.processos.some(processo =>
      (processo.numeroProcesso?.toLowerCase() || '').includes(busca.toLowerCase())
    )
  ) : [];

  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <div className="w-full mb-6">
        <BarraTitulo largura="full">Pesquisar Processos</BarraTitulo>
      </div>
      <div className="relative flex flex-col lg:flex-row w-full h-full min-h-screen px-3 right-2 md:gap-8">
        {/* Conteúdo principal */}
        <div className="flex-1 flex flex-col order-2 lg:order-1 w-full ">
          {/* Barra de pesquisa - MOBILE */}
          <div className="block lg:hidden mb-6">
            <div className="w-full max-w-lg mx-auto relative">
              <input
                type="text"
                placeholder="Filtrar por Cliente ou Processo..."
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  handleBusca(e.target.value);
                }}
                className="w-full rounded-md py-2 pl-4 pr-10 text-base bg-white text-preto focus:outline-none shadow"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-preto opacity-60 pointer-events-none">
                <svg width="1.25rem" height="1.25rem" fill="none" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>

          {/* Filtros - MOBILE */}
          {role !== 'ROLE_ADVOGADO' && (
            <div className="block lg:hidden flex flex-col gap-4 mb-4 w-full max-w-lg mx-auto">
              {filtros.map(filtro => (
                <BotaoFiltros
                  key={filtro.label}
                  label={filtro.label}
                  onClick={(valor) => handleFiltro(filtro, valor)}
                  ativo={filtroAtivo?.label === filtro.label}
                  isOpen={filtroAberto === filtro.label}
                  onToggle={handleToggleFiltro}
                />
              ))}
              {filtroAtivo && (
                <div className="flex justify-center w-full">
                  <button
                    className="text-s text-azulEscuro underline mt-2 hover:text-dourado transition-colors font-semibold"
                    onClick={handleLimparFiltros}
                    type="button"
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}
            </div>
          )}

          {alert && (
            <AlertStyle
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          {/* Cards dos processos */}
          <div className="flex flex-col gap-6">
            {loading ? (
              <div className="text-center py-8">Carregando...</div>
            ) : clientesFiltrados.length > 0 ? (
              clientesFiltrados.map(cliente => (
                <CardClientesProcessos key={cliente.id} cliente={cliente} />
              ))
            ) : filtroAtivo ? (
              <div className="text-center py-8">Nenhum processo encontrado para o filtro aplicado</div>
            ) : (
              <div className="text-center py-8">Nenhum processo encontrado</div>
            )}
          </div>

          {/* Paginação */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`px-4 py-2 ${currentPage === index ? 'bg-AzulEscuro text-white' : 'bg-gray-200 text-AzulEscuro'} rounded mx-1`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>

        {/* 🔽 Sidebar de filtros (DESKTOP) - agora desce abaixo do título */}
        <div className="hidden lg:flex flex-col w-full max-w-full lg:max-w-[18rem] relative order-1 lg:order-2 translate-y-2 left-6">
          <div className="w-full flex flex-col gap-4">
            <div className="relative w-full mb-4">
              <input
                type="text"
                placeholder="Filtrar por Cliente ou Processo..."
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  handleBusca(e.target.value);
                }}
                className="w-full rounded-md py-2 pl-4 pr-10 text-base bg-white text-preto focus:outline-none shadow"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-preto opacity-60 pointer-events-none">
                <svg width="1.25rem" height="1.25rem" fill="none" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>

            {role !== 'ROLE_ADVOGADO' && (
              <div className="flex flex-col gap-4">
                {filtros.map(filtro => (
                  <BotaoFiltros
                    key={filtro.label}
                    label={filtro.label}
                    onClick={(valor) => handleFiltro(filtro, valor)}
                    ativo={filtroAtivo?.label === filtro.label}
                    isOpen={filtroAberto === filtro.label}
                    onToggle={handleToggleFiltro}
                  />
                ))}
                {filtroAtivo && (
                  <div className="flex justify-center w-full">
                    <button
                      className="text-s text-azulEscuro underline mt-2 hover:text-dourado transition-colors font-semibold"
                      onClick={handleLimparFiltros}
                      type="button"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default PesquisarProcessos;