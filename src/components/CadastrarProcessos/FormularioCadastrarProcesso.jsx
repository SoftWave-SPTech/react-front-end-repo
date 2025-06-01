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

export default function FormularioCadastrarProcesso() {
    const [numero, setNumero] = useState("");
    const [descricao, setDescricao] = useState("");
    const [advogadosSelecionados, setAdvogadosSelecionados] = useState([]);

    const handleAdvogadoChange = (nome) => {
        setAdvogadosSelecionados((prev) =>
            prev.includes(nome)
                ? prev.filter((n) => n !== nome)
                : [...prev, nome]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // lógica de submit
    };

    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="bg-cinzaAzulado rounded-md px-4 sm:px-8 md:px-10 lg:px-12 pt-8 pb-8 w-full max-w-[500px] min-h-[400px] shadow-[6px_6px_0px_0px_rgb(1,13,38)] font-sans">
                <h1 className="text-3xl md:text-4xl text-dourado text-center mb-6 font-normal">Novo Processo</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-preto text-xl md:text-2xl mb-1 font-normal" htmlFor="numero">
                            Número:
                        </label>
                        <input
                            id="numero"
                            type="text"
                            placeholder="00000"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            className="border border-preto rounded-lg w-full py-2 px-3 text-preto text-base md:text-lg focus:outline-none focus:shadow-outline font-sans"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-preto text-xl md:text-2xl mb-1 font-normal" htmlFor="descricao">
                            Descrição:
                        </label>
                        <input
                            id="descricao"
                            type="text"
                            placeholder="Caso envolvendo direitos trabalhistas"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="border border-preto rounded-lg w-full py-2 px-3 text-preto text-base md:text-lg focus:outline-none focus:shadow-outline truncate font-sans"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-preto text-xl md:text-2xl mb-1 font-normal">
                            Advogados
                        </label>
                        <div className="border border-preto rounded-lg bg-branco max-h-24 overflow-y-auto px-2 py-1">
                            {advogadosMock.map((nome) => (
                                <div key={nome} className="flex items-center mb-1 last:mb-0">
                                    <input
                                        type="checkbox"
                                        id={nome}
                                        checked={advogadosSelecionados.includes(nome)}
                                        onChange={() => handleAdvogadoChange(nome)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={nome} className="text-preto text-base font-sans">{nome}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Botao
                            tamanho="grande"
                            largura="cheia"
                            cor="padrao"
                            type="submit"
                            className="text-xl md:text-2xl font-sans"
                        >
                            CADASTRAR
                        </Botao>
                    </div>
                </form>
            </div>
        </div>
    );
}