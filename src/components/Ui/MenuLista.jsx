import { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';

export default function MenuLista(props) {
    const [aberto, setAberto] = useState(false);
    const [titulo, setTitulo] = useState("");
    const role = props.role;
    
    useEffect(() => {
        if(role == "ROLE_ADVOGADO"){
            setTitulo("Advogado")
        }else{
            setTitulo("Administrador")
        }  
    }, []);

    return (
        <div className="w-64 p-4 bg-white rounded font-sans">
        {/* Cabeçalho do menu */}
        <button
            onClick={() => setAberto(!aberto)}
            className="flex items-center justify-center w-full text-xl font-medium text-gray-800 space-x-8"
        >
            {titulo}
            {aberto ? "▲" : "▼"}
        </button>

        {/* Lista de opções */}
        {aberto && (
            <ul className="mt-4 space-y-2 text-gray-700 text-base">
            <li onClick={() => setTitulo("Administrador")} className="hover:bg-azulMenu hover:rounded text-center cursor-pointer">Administrador</li>
            <li onClick={() => setTitulo("Advogado")} className="hover:bg-azulMenu hover:rounded text-center cursor-pointer">Advogado</li>
            </ul>
        )}
        </div>
    );
}