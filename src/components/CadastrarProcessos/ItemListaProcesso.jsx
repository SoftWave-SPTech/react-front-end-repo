import React, { useEffect, useState } from "react";
import { FiFileText, FiTrash } from "react-icons/fi";
import 'tailwindcss/tailwind.css';

const processosFakes = [
    { numero: "12345", descricao: "Casos sobre os direitos infantis" },
    { numero: "54321", descricao: "Casos sobre os direitos trabalhistas" },
    { numero: "67890", descricao: "Defesa de matrimônio" },
    { numero: "58525252", descricao: "Homicídio" },
    { numero: "09876", descricao: "Defesa da familia" },
    { numero: "12345", descricao: "Casos sobre os direitos infantis" },
    { numero: "54321", descricao: "Casos sobre os direitos trabalhistas" },
    { numero: "67890", descricao: "Defesa de matrimônio" },
    { numero: "58525252", descricao: "Homicídio" },
    { numero: "09876", descricao: "Defesa da familia" },
    { numero: "12345", descricao: "Casos sobre os direitos infantis" },
    { numero: "54321", descricao: "Casos sobre os direitos trabalhistas" },
    { numero: "67890", descricao: "Defesa de matrimônio" },
    { numero: "58525252", descricao: "Homicídio" },
    { numero: "09876", descricao: "Defesa da familia" },
    { numero: "12345", descricao: "Casos sobre os direitos infantis" },
    { numero: "54321", descricao: "Casos sobre os direitos trabalhistas" },
    { numero: "67890", descricao: "Defesa de matrimônio" },
    { numero: "58525252", descricao: "Homicídio" },
    { numero: "09876", descricao: "Defesa da familia" }
];

export default function ItemListaProcesso() {
    const [processos, setProcessos] = useState([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        setProcessos(processosFakes);
    }, []);


    const processosFiltrados = processos.filter(
        (proc) =>
            proc.numero.toLowerCase().includes(busca.toLowerCase()) ||
            proc.descricao.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="bg-AzulEscuro rounded-lg p-[2.5rem] font-sans w-full max-w-[56.25rem] mx-auto min-h-[40rem] flex flex-col" style={{ height: "70vh" }}>
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
                            key={processo.numero + processo.descricao}
                            className="bg-azulClaro rounded-lg flex justify-between items-center"
                            style={{
                                paddingLeft: "1.5rem",
                                paddingRight: "1.5rem",
                                paddingTop: "1rem",
                                paddingBottom: "1rem"
                            }}
                        >
                            <div className="flex flex-col min-w-0">
                                <p className="font-sans text-branco text-lg truncate">#{processo.numero}</p>
                                <p className="text-branco text-base truncate">{processo.descricao}</p>
                            </div>
                            <div className="flex space-x-6">
                                <button className="text-branco hover:text-dourado transition-colors" title="Visualizar Documento">
                                    <FiFileText size={24} className="md:w-6 md:h-6" />
                                </button>
                                <button className="text-branco hover:text-dourado transition-colors" title="Excluir">
                                    <FiTrash size={24} className="md:w-6 md:h-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {processosFiltrados.length === 0 && (
                        <div className="text-branco text-center py-8 opacity-70">Nenhum processo encontrado.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
