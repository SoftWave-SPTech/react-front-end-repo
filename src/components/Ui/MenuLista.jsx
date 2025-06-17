import { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';
import { api } from "../../service/api";

export default function MenuLista(props) {
    const [aberto, setAberto] = useState(false);
    const [titulo, setTitulo] = useState("");
    const role = props.role;
    const idUsuario = props.idUsuario;
    
    useEffect(() => {
        if(role == "ROLE_ADVOGADO"){
            setTitulo("Advogado")
        }else{
            setTitulo("Administrador")
        }  
    }, []);

    function atualizarRole(role){
        if(role == 2){
            setTitulo("Administrador")
        }else{
            setTitulo("Advogado")
        }

        api.put(`/usuarios/atualizar-role/${idUsuario}/${role}`,
            // {
            // headers: {
            //   "Authorization":  TOKEN
            // }
            // }
        )
                .then((res) => {
                    console.log(res)
                })
                .catch((error) =>{
                    console.log(error);
                })
    }

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
            <li onClick={() => atualizarRole(2)} className="hover:bg-azulMenu hover:rounded text-center cursor-pointer">Administrador</li>
            <li onClick={() => atualizarRole(1)} className="hover:bg-azulMenu hover:rounded text-center cursor-pointer">Advogado</li>
            </ul>
        )}
        </div>
    );
}