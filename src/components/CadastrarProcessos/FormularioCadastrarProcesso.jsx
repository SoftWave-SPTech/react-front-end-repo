import React, { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';
import { api } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import Alert from '../Ui/AlertStyle';

export default function FormularioCadastrarProcesso() {
    const [numero, setNumero] = useState("");
    const [descricao, setDescricao] = useState("");
    const [advogadosSelecionados, setAdvogadosSelecionados] = useState([]);
    const [clientesSelecionados, setClientesSelecionados] = useState([]);
    const [buscaAdvogado, setBuscaAdvogado] = useState("");
    const [buscaCliente, setBuscaCliente] = useState("");
    const [advogados, setAdvogados] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/usuarios/listar-advogados', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            const advogadosData = Array.isArray(response.data) ? response.data : response.data.content || [];
            setAdvogados(advogadosData);
        })
        .catch(error => {
            setAlert({
                type: "error",
                message: "Erro ao buscar advogados."
            });
            console.error('Erro ao buscar advogados:', error);
        });

        api.get('/usuarios/listar-clientes', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            const clientesData = Array.isArray(response.data) ? response.data : response.data.content || [];
            setClientes(clientesData);
        })
        .catch(error => {
            setAlert({
                type: "error",
                message: "Erro ao buscar clientes."
            });
            console.error('Erro ao buscar clientes:', error);
        });
        const proc = det.data || {};

        let advIds = [];
        let cliIds = [];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const numeroRegex = /^\d+-\d+\.\d+\.\d+\.\d+\.\d+$/;
        if (!numeroRegex.test(numero)) {
            setAlert({
                type: "warning",
                message: "O número do processo deve conter apenas números, pontos e hífens, seguindo o formato: 0000005-27.2025.8.26.0008"
            });
            return;
        }

        if (!numero || !descricao || advogadosSelecionados.length === 0 || clientesSelecionados.length === 0) {
            setAlert({
                type: "warning",
                message: "Por favor, preencha todos os campos obrigatórios"
            });
            return;
        }

        try {
            const processoData = {
                numeroProcesso: numero,
                descricao,
                usuarios: [...advogadosSelecionados, ...clientesSelecionados]
            };

            await api.post('/processos', processoData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            setAlert({
                type: "success",
                message: "Processo cadastrado e clientes vinculados com sucesso!"
            });
            setNumero('');
            setDescricao('');
            setAdvogadosSelecionados([]);
            setClientesSelecionados([]);
            setTimeout(() => {
                setAlert(null);
                window.location.reload();
            }, 1800);
        } catch (error) {
            setAlert({
                type: "error",
                message: error.response?.data?.message || JSON.stringify(error.response?.data) || 'Erro ao cadastrar processo'
            });
            console.error('Erro ao cadastrar processo:', error);
        }
    };

    preencher();
  }, [processoEditando]);

  const handleAdvogadoChange = (id) => {
    id = Number(id);
    setAdvogadosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );

    const clientesFiltrados = clientes.filter((cliente) =>
        cliente?.nome?.toLowerCase().includes(buscaCliente.toLowerCase()) || ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validação do número
    const numeroRegex = /^\d+-\d+\.\d+\.\d+\.\d+\.\d+$/;
    if (!numeroRegex.test(numero)) {
      alert('O número do processo deve seguir o formato: 0000005-27.2025.8.26.0008');
      return;
    }

    if (!numero || !descricao) {
      alert('Preencha número e descrição.');
      return;
    }
    return (
        <div
            className="bg-white rounded-md w-full max-w-[80rem] min-w-[28rem] px-[4rem] sm:px-[5rem] md:px-[6rem] pt-[2.5rem] pb-[2.5rem] shadow-[0.375rem_0.375rem_0_0_rgb(1,13,38)]"
            style={{
                minHeight: "25rem",
                boxSizing: "border-box"
            }}
        >
            <h1 className="text-2xl md:text-3xl text-dourado text-center mb-6 font-normal">Novo Processo</h1>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-preto text-lg md:text-xl mb-1 font-normal" htmlFor="numero">
                        Número:
                    </label>
                    <input
                        id="numero"
                        type="text"
                        placeholder="00000"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        className="border border-preto rounded-lg w-full py-[0.5rem] px-[0.75rem] text-preto text-base md:text-lg focus:outline-none focus:shadow-outline font-sans"
                        required
                    />
                </div>
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
                        className="border border-preto rounded-lg w-full py-[0.5rem] px-[0.75rem] text-preto text-base md:text-lg focus:outline-none focus:shadow-outline truncate font-sans"
                        required
                    />
                </div>

                {/* Advogados */}
                <div className="mb-6">
                    <label className="block text-preto text-lg md:text-xl mb-1 font-normal">
                        Advogados
                    </label>
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
                                            checked={advogadosSelecionados.includes(advogado.id)}
                                            onChange={() => handleAdvogadoChange(advogado.id)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`adv-${advogado.id}`} className="text-preto text-base font-sans">{advogado.nomeFantasia}</label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-preto text-sm italic w-full text-center">Nenhum advogado encontrado.</p>
                        )}
                    </div>
                </div>

                {/* Clientes */}
                <div className="mb-6">
                    <label className="block text-preto text-lg md:text-xl mb-1 font-normal">
                        Clientes
                    </label>
                    <input
                        type="text"
                        placeholder="Digite para pesquisar cliente..."
                        value={buscaCliente}
                        onChange={e => setBuscaCliente(e.target.value)}
                        className="border border-preto rounded-lg w-full py-[0.5rem] px-[0.75rem] text-preto text-base md:text-lg focus:outline-none mb-2"
                    />
                    <div className="border border-preto rounded-lg bg-branco max-h-[8rem] min-h-[2.5rem] overflow-y-auto px-[0.5rem] py-[0.25rem] flex items-center">
                        {clientesFiltrados.length > 0 ? (
                            <div className="w-full">
                                {clientesFiltrados.map((cliente) => (
                                    <div key={cliente.id} className="flex items-center mb-1 last:mb-0">
                                        <input
                                            type="checkbox"
                                            id={`cli-${cliente.id}`}
                                            checked={clientesSelecionados.includes(cliente.id)}
                                            onChange={() => handleClienteChange(cliente.id)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`cli-${cliente.id}`} className="text-preto text-base font-sans">{cliente.nome}</label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-preto text-sm italic w-full text-center">Nenhum cliente encontrado.</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="w-full bg-AzulEscuro text-branco text-lg md:text-xl font-sans font-semibold rounded-lg py-[0.75rem] hover:bg-azulClaro transition-colors"
                    >
                        CADASTRAR
                    </button>
                </div>
            </form>
        </div>
    );
}
