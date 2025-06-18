import React from "react";
import 'tailwindcss/tailwind.css';
import { useNavigate } from "react-router-dom";

export default function CardProcesso(props) {

    const navigate = useNavigate();

    const visualizarProcesso = () => {
        navigate(`/processos-advogado/${props.idUsuario}/${props.idProcesso}`);
    };

    return (
        <div className="w-[98%] bg-[#F4F4F4] p-4 rounded flex items-center justify-between">
            <p className="text-gray-800 text-sm font-medium">
                Processo Nº {props.numeroProcesso}
            </p>
            <button onClick={visualizarProcesso} className="text-3xl text-gray-600 font-extrabold hover:text-dourado">
                ›
            </button>
        </div>
    );
}