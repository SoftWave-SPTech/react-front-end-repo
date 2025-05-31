import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import 'tailwindcss/tailwind.css';

const processosFakes = [
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
        <div className="bg-AzulEscuro rounded-lg p-4 sm:p-6 md:p-8 font-sans w-full max-w-[900px] mx-auto min-h-[400px]">
            <div className="flex items-center mb-4 md:mb-6 pb-4">
                <h2 className="text-2xl md:text-3xl font-normal text-dourado flex-1">Processos</h2>
                <div className="relative w-56 md:w-60">
                    <input
                        type="text"
                        placeholder="Número ou descrição"
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                        className="w-full rounded-md py-1.5 md:py-2 pl-3 pr-8 text-base bg-branco text-preto focus:outline-none"
                    />
                    <span className="absolute right-2 top-2 text-preto opacity-60 pointer-events-none">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                            <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </span>
                </div>
            </div>
            <div

                className="overflow-y-auto h-[300px] sm:h-[350px] md:h-[400px] pr-2 md:pr-4 custom-scrollbar"
            >
                <style>
                    {`
                    .custom-scrollbar {
                        scrollbar-color: #0F2A5E ;
                    }
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 20px;
                        background: #F4F4F4;
                        border-radius: 12px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #0F2A5E;
                        border-radius: 20px;
                        border: 4px solid #F4F4F4;
                    }
                    .custom-scrollbar::-webkit-scrollbar-button {
                        display: none;
                        width: 0;
                        height: 0;
                    }
                    `}
                </style>
                <div className="flex flex-col gap-4 md:gap-4 h-full">
                    {processosFiltrados.map((processo) => (
                        <div
                            key={processo.numero + processo.descricao}
                            className="bg-azulClaro rounded-lg px-4 md:px-6 py-3 md:py-4 flex justify-between items-center"
                        >
                            <div className="flex flex-col min-w-0">
                                <p className="font-sans text-branco text-base md:text-lg truncate">#{processo.numero}</p>
                                <p className="text-branco text-sm md:text-base truncate">{processo.descricao}</p>
                            </div>
                            <div className="flex space-x-4 md:space-x-6">
                                <button className="text-branco hover:text-dourado transition-colors" title="Editar">
                                    <FiEdit2 size={20} className="md:w-6 md:h-6" />
                                </button>
                                <button className="text-branco hover:text-dourado transition-colors" title="Excluir">
                                    <FiTrash size={20} className="md:w-6 md:h-6" />
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
