import React, { useState } from "react";
import 'tailwindcss/tailwind.css';
import Botao from "../Ui/Botao";

const advogadosMock = [
    "Cristhian Lauriano",
    "Luana Cruz",
    "Bryan Henrique",
    "Ana Claudia",
    "Leticia da Fonseca",
    "Leonardo de Carvalho"
];

const clientesMock = [
    "Leticia da Fonseca",
    "Cristian Lauriano",
    "Ana Claudia",
    "Leonardo de Carvalho"
];

export default function FormularioCadastrarProcesso() {
    const [numero, setNumero] = useState("");
    const [descricao, setDescricao] = useState("");
    const [advogadosSelecionados, setAdvogadosSelecionados] = useState([]);
    const [clientesSelecionados, setClientesSelecionados] = useState([]);
    const [buscaAdvogado, setBuscaAdvogado] = useState("");
    const [buscaCliente, setBuscaCliente] = useState("");

    const handleAdvogadoChange = (nome) => {
        setAdvogadosSelecionados((prev) =>
            prev.includes(nome)
                ? prev.filter((n) => n !== nome)
                : [...prev, nome]
        );
    };

    const handleClienteChange = (nome) => {
        setClientesSelecionados((prev) =>
            prev.includes(nome)
                ? prev.filter((n) => n !== nome)
                : [...prev, nome]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validações básicas
        const erros = {};
        if (!numero) erros.numero = "Número do processo é obrigatório";
        if (!descricao) erros.descricao = "Descrição é obrigatória";
        if (advogadosSelecionados.length === 0) erros.advogados = "Selecione pelo menos um advogado";
        if (clientesSelecionados.length === 0) erros.clientes = "Selecione pelo menos um cliente";

        if (Object.keys(erros).length > 0) {
            Object.values(erros).forEach(erro => alert(erro));
            return;
        }

        // Aqui você pode adicionar a chamada para a API
        console.log({
            numero,
            descricao,
            advogados: advogadosSelecionados,
            clientes: clientesSelecionados
        });
    };

    // Filtra advogados e clientes pelo texto digitado
    const advogadosFiltrados = advogadosMock.filter((adv) =>
        adv.toLowerCase().includes(buscaAdvogado.toLowerCase())
    );
    const clientesFiltrados = clientesMock.filter((cliente) =>
        cliente.toLowerCase().includes(buscaCliente.toLowerCase())
    );

    return (
        <div className="flex justify-center items-center min-h-screen w-full bg-cinzaAzulado">
            <div
                className="bg-cinzaAzulado rounded-md w-full max-w-[80rem] min-w-[28rem] px-[4rem] sm:px-[5rem] md:px-[6rem] pt-[2.5rem] pb-[2.5rem] shadow-[0.375rem_0.375rem_0_0_rgb(1,13,38)]"
                style={{
                    minHeight: "25rem",
                    boxSizing: "border-box"
                }}
            >
                <h1 className="text-2xl md:text-3xl text-dourado text-center mb-6 font-normal">Novo Processo</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-preto text-lg md:text-xl mb-1 font-normal" htmlFor="numero">
                            Número:
                        </label>
                        <input
                            id="numero"
                            type="text"
                            placeholder="#00000"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            className="border border-preto rounded-lg w-full py-[0.5rem] px-[0.75rem] text-preto text-base md:text-lg focus:outline-none focus:shadow-outline font-sans"
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
                        />
                    </div>
                    {/* Advogados checkpoints */}
                    <div className="mb-6">
                        <label className="block text-preto text-lg md:text-xl mb-1 font-normal">
                            Advogados
                        </label>
                        {/* Pesquisar Advogado */}
                        <div className="mb-2">
                            <input
                                type="text"
                                placeholder="Digite para pesquisar advogado..."
                                value={buscaAdvogado}
                                onChange={e => setBuscaAdvogado(e.target.value)}
                                className="border border-preto rounded-lg w-full py-[0.5rem] px-[0.75rem] text-preto text-base md:text-lg focus:outline-none mb-2"
                            />
                        </div>
                        <div className="border border-preto rounded-lg bg-branco max-h-[8rem] overflow-y-auto px-[0.5rem] py-[0.25rem]">
                            {advogadosFiltrados.map((nome) => (
                                <div key={nome} className="flex items-center mb-1 last:mb-0">
                                    <input
                                        type="checkbox"
                                        id={`adv-${nome}`}
                                        checked={advogadosSelecionados.includes(nome)}
                                        onChange={() => handleAdvogadoChange(nome)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`adv-${nome}`} className="text-preto text-base font-sans">{nome}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Clientes checkpoints */}
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
                        <div className="border border-preto rounded-lg bg-branco max-h-[8rem] overflow-y-auto px-[0.5rem] py-[0.25rem]">
                            {clientesFiltrados.map((nome) => (
                                <div key={nome} className="flex items-center mb-1 last:mb-0">
                                    <input
                                        type="checkbox"
                                        id={`cli-${nome}`}
                                        checked={clientesSelecionados.includes(nome)}
                                        onChange={() => handleClienteChange(nome)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`cli-${nome}`} className="text-preto text-base font-sans">{nome}</label>
                                </div>
                            ))}
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
        </div>
    );
}