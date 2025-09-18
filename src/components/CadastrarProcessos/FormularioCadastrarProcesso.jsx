import React, { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';
import { api } from '../../service/api';
import Alert from '../Ui/AlertStyle';

export default function FormularioCadastrarProcesso({
  processoEditando = null,
  onSalvo,
  onCancelarEdicao
}) {
  const [numero, setNumero] = useState("");
  const [descricao, setDescricao] = useState("");
  const [advogadosSelecionados, setAdvogadosSelecionados] = useState([]);
  const [clientesSelecionados, setClientesSelecionados] = useState([]);
  const [buscaAdvogado, setBuscaAdvogado] = useState("");
  const [buscaCliente, setBuscaCliente] = useState("");
  const [advogados, setAdvogados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

  // carrega listas
  useEffect(() => {
    api.get('/usuarios/listar-advogados', {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    })
    .then(res => {
      const data = Array.isArray(res.data) ? res.data : res.data.content || [];
      setAdvogados(data);
    })
    .catch(err => {
      console.error('Erro ao buscar advogados:', err);
      setAlert({ show: true, type: "error", message: "Erro ao carregar advogados." });
    });

    api.get('/usuarios/listar-clientes', {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    })
    .then(res => {
      const data = Array.isArray(res.data) ? res.data : res.data.content || [];
      setClientes(data);
    })
    .catch(err => {
      console.error('Erro ao buscar clientes:', err);
      setAlert({ show: true, type: "error", message: "Erro ao carregar clientes." });
    });
  }, []);

  // preenche se for edição
  useEffect(() => {
    const preencher = async () => {
      if (!processoEditando) {
        setNumero("");
        setDescricao("");
        setAdvogadosSelecionados([]);
        setClientesSelecionados([]);
        return;
      }

      setNumero(processoEditando.numeroProcesso || "");
      setDescricao(processoEditando.descricao || "");

      try {
        const detVinc = await api.get(`/processos/${processoEditando.id}/vinculos`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });

        const advIds = Array.isArray(detVinc.data?.advogadosIds)
          ? detVinc.data.advogadosIds.map(Number).filter(Boolean)
          : [];
        const cliIds = Array.isArray(detVinc.data?.clientesIds)
          ? detVinc.data.clientesIds.map(Number).filter(Boolean)
          : [];

        setAdvogadosSelecionados(advIds);
        setClientesSelecionados(cliIds);
        return;
      } catch (err) {
        console.warn('Endpoint /vinculos indisponível, tentando fallback /processos/:id', err);
      }

      try {
        const det = await api.get(`/processos/${processoEditando.id}`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
        const proc = det.data || {};

        let advIds = [];
        let cliIds = [];

        if (Array.isArray(proc.advogados) || Array.isArray(proc.clientes)) {
          advIds = (proc.advogados || []).map(a => Number(a?.id ?? a)).filter(Boolean);
          cliIds = (proc.clientes  || []).map(c => Number(c?.id ?? c)).filter(Boolean);
        } else if (Array.isArray(proc.usuarios)) {
          const usuarios = proc.usuarios;
          const temRole = usuarios.some(u => typeof u === 'object' && ('role' in u || 'papel' in u || 'tipoUsuario' in u));
          if (temRole) {
            advIds = usuarios
              .filter(u => (u.role || u.papel || u.tipoUsuario || '').toString().toUpperCase().includes('ADV'))
              .map(u => Number(u.id)).filter(Boolean);
            cliIds = usuarios
              .filter(u => (u.role || u.papel || u.tipoUsuario || '').toString().toUpperCase().includes('CLI'))
              .map(u => Number(u.id)).filter(Boolean);
          } else {
            cliIds = usuarios.map(u => Number(typeof u === 'object' ? u.id : u)).filter(Boolean);
          }
        }

        setAdvogadosSelecionados(advIds);
        setClientesSelecionados(cliIds);
      } catch (e) {
        console.warn('Não foi possível carregar vínculos do processo.', e);
        setAdvogadosSelecionados([]);
        setClientesSelecionados([]);
      }
    };

    preencher();
  }, [processoEditando]);

  const handleAdvogadoChange = (id) => {
    id = Number(id);
    setAdvogadosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const handleClienteChange = (id) => {
    id = Number(id);
    setClientesSelecionados((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numeroRegex = /^\d+-\d+\.\d+\.\d+\.\d+\.\d+$/;
    if (!numeroRegex.test(numero)) {
      setAlert({ show: true, type: "error", message: "O número do processo deve seguir o formato: 0000005-27.2025.8.26.0008" });
      return;
    }

    if (!numero || !descricao) {
      setAlert({ show: true, type: "error", message: "Preencha número e descrição." });
      return;
    }

    const usuariosIds = [...advogadosSelecionados, ...clientesSelecionados];
    if (usuariosIds.length === 0) {
      setAlert({ show: true, type: "error", message: "Selecione pelo menos um advogado ou cliente." });
      return;
    }

    const payload = {
      numeroProcesso: numero,
      descricao,
      usuarios: usuariosIds
    };

    try {
      if (processoEditando) {
        await api.put(`/processos/${processoEditando.id}`, payload, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
        setAlert({ show: true, type: "success", message: "Processo atualizado com sucesso!" });
      } else {
        await api.post('/processos', payload, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
        setAlert({ show: true, type: "success", message: "Processo cadastrado e clientes vinculados com sucesso!" });
      }

      setNumero('');
      setDescricao('');
      setAdvogadosSelecionados([]);
      setClientesSelecionados([]);
      onSalvo && onSalvo();

      setTimeout(() => setAlert({ ...alert, show: false }), 2000);

    } catch (error) {
      console.error("Erro ao salvar processo:", error);
      if (error.response?.status >= 500) {
        setAlert({ show: true, type: "error", message: "O serviço não está disponível! Por favor, contate o suporte para que possamos ajudá-lo!" });
      } else {
        setAlert({ show: true, type: "error", message: error.response?.data?.message || "Erro ao salvar processo." });
      }
    }
  };

  const advogadosFiltrados = advogados.filter((adv) =>
    (adv?.nomeFantasia || '').toLowerCase().includes(buscaAdvogado.toLowerCase())
  );

  const clientesFiltrados = clientes.filter((cliente) =>
    (cliente?.nome || '').toLowerCase().includes(buscaCliente.toLowerCase())
  );

  const emEdicao = Boolean(processoEditando);

  return (
    <div className="bg-white rounded-md w-full max-w-[500px] min-w-[28rem] px-[4rem] sm:px-[5rem] md:px-[6rem] pt-[2.5rem] pb-[2.5rem] shadow-[0.375rem_0.375rem_0_0_rgb(1,13,38)] ml-4 lg:ml-8"
         style={{ minHeight: "25rem", boxSizing: "border-box" }}>
      <h1 className="text-2xl md:text-3xl text-dourado text-center mb-6 font-normal">
        {emEdicao ? 'Editar Processo' : 'Novo Processo'}
      </h1>

      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
          className="mb-4"
        />
      )}

      <form onSubmit={handleSubmit}>
        {/* Número */}
        <div className="mb-4">
          <label className="block text-preto text-lg md:text-xl mb-1 font-normal" htmlFor="numero">
            Número:
          </label>
          <input
            id="numero"
            type="text"
            placeholder="0000005-27.2025.8.26.0008"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="border border-preto rounded-lg w-full py-[0.5rem] px-[0.75rem] text-preto text-base md:text-lg focus:outline-none focus:shadow-outline font-sans"
            required
          />
        </div>

        {/* Descrição */}
        <div className="mb-4">
          <label className="block text-preto text-lg md:text-xl mb-1 font-normal" htmlFor="descricao">
            Descrição:
          </label>
          <input
            id="descricao"
            type="text"
            placeholder="Casos Criminais envolvendo código penal..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border border-preto rounded-lg w-full py-[0.5rem] px-[0.75rem] text-preto text-base md:text-lg focus:outline-none truncate font-sans"
            required
          />
        </div>

        {/* Advogados */}
        <div className="mb-6">
          <label className="block text-preto text-lg md:text-xl mb-1 font-normal">Advogados</label>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Digite para pesquisar advogado..."
              value={buscaAdvogado}
              onChange={e => setBuscaAdvogado(e.target.value)}
              className="border border-preto rounded-lg w-full py-[0.5rem] px-[0.75rem] text-preto text-base md:text-lg focus:outline-none mb-2"
            />
          </div>
          <div className="border border-preto rounded-lg bg-branco max-h-[8rem] min-h-[2.5rem] overflow-y-auto px-[0.5rem] py-[0.25rem] flex items-center">
            {advogadosFiltrados.length > 0 ? (
              <div className="w-full">
                {advogadosFiltrados.map((advogado) => (
                  <div key={advogado.id} className="flex items-center mb-1 last:mb-0">
                    <input
                      type="checkbox"
                      id={`adv-${advogado.id}`}
                      checked={advogadosSelecionados.includes(Number(advogado.id))}
                      onChange={() => handleAdvogadoChange(Number(advogado.id))}
                      className="mr-2"
                    />
                    <label htmlFor={`adv-${advogado.id}`} className="text-preto text-base font-sans">
                      {advogado.nomeFantasia}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-preto text-sm italic w-full text-center">Nenhum advogado encontrado.</p>
            )}
          </div>
        </div
