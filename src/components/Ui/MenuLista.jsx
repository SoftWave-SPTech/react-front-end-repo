import { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';
import { api } from "../../service/api";

export default function MenuLista(props) {
    const [aberto, setAberto] = useState(false);
    const [titulo, setTitulo] = useState("");
    const role = props.role;
    const idUsuario = props.idUsuario;
    
    useEffect(() => {
        if(role === "ROLE_ADVOGADO"){
            setTitulo("Advogado")
        }else{
            setTitulo("Administrador")
        }  
    }, [role]);

    function atualizarRole(role){
        if(role === 2){
            setTitulo("Administrador")
        }else{
            setTitulo("Advogado")
        }

        api.put(`/usuarios/atualizar-role/${idUsuario}/${role}`)
            .then((res) => {
                console.log(res)
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    return (
        <div className="relative inline-block text-sm">
            {/* Botão principal */}
            <button
                onClick={() => setAberto(!aberto)}
                className="flex items-center justify-between px-2 py-1 text-branco bg-[#050e26] backdrop-blur-md rounded-md shadow-sm hover:bg-dourado/80 hover:text-black transition w-32"
            >
                <span className="truncate">{titulo}</span>
                {aberto ? "▲" : "▼"}
            </button>

            {/* Dropdown */}
            {aberto && (
                <ul className="absolute mt-1 w-32 bg-white/70 backdrop-blur-md rounded-md shadow-lg z-50 text-gray-800 text-xs">
                    <li 
                        onClick={() => {
                            atualizarRole(2);
                            setAberto(false);
                        }} 
                        className="px-3 py-2 hover:bg-dourado/80 hover:text-white rounded cursor-pointer text-center transition"
                    >
                        Administrador
                    </li>
                    <li 
                        onClick={() => {
                            atualizarRole(1);
                            setAberto(false);
                        }} 
                        className="px-3 py-2 hover:bg-dourado/80 hover:text-white rounded cursor-pointer text-center transition"
                    >
                        Advogado
                    </li>
                </ul>
            )}
        </div>
    );
}
