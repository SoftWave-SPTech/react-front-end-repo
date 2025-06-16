import { useState } from "react";
import 'tailwindcss/tailwind.css';
import { api } from "../../service/api";

export default function Toggle(props) {
    const [ligado, setLigado] = useState(false);

    function mudarStatusUsuario(){
        setLigado(!ligado)

        
    }

    return (
        <div className="flex items-center space-x-4">
        <span className={`${ligado ? "text-verdeToggle" : "text-vermelhoToggle"} font-bold`}>
            {ligado ? "Ativo" : "Inativo"}
        </span>

        <button
            onClick={mudarStatusUsuario}
            className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ${
            ligado ? "bg-verdeToggle" : "bg-vermelhoToggle"
            }`}
        >
            <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                ligado ? "translate-x-6" : "translate-x-0"
            }`}
            ></div>
        </button>
        </div>
    );
}