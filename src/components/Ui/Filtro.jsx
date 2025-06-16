import { useState } from "react";
import 'tailwindcss/tailwind.css';

export default function Filtro(props) {
    const [aberto, setAberto] = useState(false);
    const [selecionados, setSelecionados] = useState([]);

    
    const opcoes = ["Financeiro", "Jurídico", "RH", "Tecnologia"];

    const toggleOpcao = (opcao) => {
        setSelecionados((prev) =>
        prev.includes(opcao)
            ? prev.filter((item) => item !== opcao)
            : [...prev, opcao]
        );
    };

    return (
        <div className="w-64 p-4 bg-azulEscuroFraco shadow rounded font-sans">
        {/* Botão de abrir/fechar */}
        <button
            onClick={() => setAberto(!aberto)}
            className="flex items-center justify-center gap-2 w-full text-lg font-medium text-dourado"
        >
            
            <span>{props.nomeFiltro}</span>
        </button>

        {/* Lista de checkboxes */}
        {aberto && (
            <div className="mt-4 space-y-2 text-medium text-white">
            {opcoes.map((opcao) => (
                <label key={opcao} className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={selecionados.includes(opcao)}
                    onChange={() => toggleOpcao(opcao)}
                    className="accent-dourado"
                />
                {opcao}
                </label>
            ))}
            </div>
        )}

        {/* Exibição das opções selecionadas */}
        {selecionados.length > 0 && (
            <div className="mt-4 text-sm text-white">
            <strong>Selecionado:</strong> {selecionados.join(", ")}
            </div>
        )}
        </div>
    );
}