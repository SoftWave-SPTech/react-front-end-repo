import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';
import LayoutBase from '../layouts/LayoutBase';
import CardClientesProcessos from '../components/PesquisarProcessos/CardClientesProcessos';
import BotaoFiltros from '../components/PesquisarProcessos/BotaoFiltros';
import BarraTitulo from '../components/Ui/BarraTitulo';
import Botao from '../components/Ui/Botao';

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

    const buscarClientes = async () => {
      try {
        setLoading(true);
        let response;
        if (role === 'ROLE_ADMIN' || role === 'ROLE_DONO') {
          response = await api.get('/clientes/com-processos', {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
          });
        } else if (role === 'ROLE_ADVOGADO') {
          response = await api.get(`/clientes/com-processos/advogado/${usuarioId}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
          });
          console.log(response.data);
        }
        if (response) setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarClientes();
  }, [role, usuarioId]);

  const handleBusca = async (termo) => {
    if (!termo.trim()) {
      buscarClientes();
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
      console.error('Erro ao buscar clientes:', error);
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
      console.error('Erro ao aplicar filtro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLimparFiltros = async () => {
    setFiltroAtivo(null);
    setBusca("");
    try {
      setLoading(true);
      let response;
      if (role === 'ROLE_ADMIN' || role === 'ROLE_DONO') {
        response = await api.get('/clientes/com-processos', {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
      } else if (role === 'ROLE_ADVOGADO') {
        response = await api.get(`/clientes/com-processos/advogado/${usuarioId}`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
      }
      if (response) setClientes(response.data);
    } catch (error) {
      console.error('Erro ao limpar filtros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFiltro = (label) => {
    setFiltroAberto(filtroAberto === label ? null : label);
  };

  const clientesFiltrados = clientes.filter(cliente => 
    (cliente.nome?.toLowerCase() || '').includes(busca.toLowerCase()) ||
    (cliente.nomeFantasia?.toLowerCase() || '').includes(busca.toLowerCase()) ||
    cliente.processos.some(processo => 
      (processo.numeroProcesso?.toLowerCase() || '').includes(busca.toLowerCase())
    )
  );

  return (
    <LayoutBase tipoMenu="advogado">
      <div className="relative flex flex-col lg:flex-row w-full h-full min-h-screen px-[1.5rem] md:px-[3rem] py-[1.5rem] gap-[2rem]">
        <div className="flex-1 flex flex-col">
          <div className="mb-[1.5rem]">
            <BarraTitulo>PESQUISAR PROCESSOS</BarraTitulo>
          </div>
          <div className="flex flex-col gap-[1.5rem]">
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
        </div>

        <div className="flex flex-col w-full max-w-[14rem] mt-[0.5rem] relative">
          <div className="relative w-full mb-[1.5rem]">
            <input
              type="text"
              placeholder="Filtrar por Cliente ou Processo..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                handleBusca(e.target.value);
              }}
              className="w-full rounded-md py-[0.5rem] pl-[1rem] pr-[2.5rem] text-base bg-cinzaAzulado text-preto focus:outline-none"
            />
            <span className="absolute right-[0.75rem] top-[0.75rem] text-preto opacity-60 pointer-events-none">
              <svg width="1.25rem" height="1.25rem" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          <div className="flex flex-col gap-[1rem]">
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
          <div className="fixed right-[4.5rem] bottom-8 z-50 max-w-[14rem] w-full flex justify-end lg:justify-center">
            <Botao
              cor="padrao"
              largura="auto"
              onClick={() => navigate('/cadastrar-processos')}
            >
              Voltar
            </Botao>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default PesquisarProcessos;