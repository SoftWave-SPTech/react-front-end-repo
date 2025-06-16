import React, { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';
import LayoutBase from "../layouts/LayoutBase";
import CardUsuario from "../components/ListaUsuarios/CardUsuario";
import { api } from "../service/api";

export default function ListaUsuarios() {
    const TOKEN = `Bearer ${sessionStorage.getItem('token')}`;
    const [listaUsuarios, setListaUsuarios] = useState([])

    useEffect(() => {
          api.get('/usuarios/listar-usarios-e-procesos', 
            // {
            // headers: {
            //   "Authorization":  TOKEN
            // }
            // }
        )
            .then(response => {
            console.log("Consulta com sucesso:", response.data);
            setListaUsuarios(response.data)
            })
            .catch(error => {
            console.error("Erro ao enviar o arquivo:", error);
          });
      
    }, []);


    return (
        <LayoutBase  backgroundClass="bg-[#D8E0F2]">
            <div className="h-full flex flex-col justify-between">
                {/* Cabeçalho */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-4xl font-light text-gray-800">Lista de Usuários</h1>

                    <div className="relative w-64">
                        <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-500">
                            🔍︎
                        </div>
                    </div>
                </div>


                {/* Conteúdo dos cards */}
                <div className="w-[75%] overflow-auto max-h-[600px] flex flex-col gap-2 mt-4 mb-4">
        
                    {
                        listaUsuarios.map((usuario) => (
                            <CardUsuario
                            idUsuario={usuario.id}
                            imageUser={usuario.foto}
                            nomeUser={usuario.nome ? usuario.nome : usuario.nomeFantasia}
                            identificadorUser={usuario.oab}
                            usuarioPrimeiroAcesso={usuario.ativo}
                            token={usuario.tokenPrimeiroAcesso}
                            email={usuario.email}
                            telefone={usuario.telefone}
                            role={usuario.role}
                            processos={usuario.processos} />
                        ))
                    }
                </div>


                {/* Rodapé com botão voltar */}
                <div className="flex justify-end mt-4">
                    <button className="bg-[#0A307E] hover:bg-[#071f54] text-white px-6 py-2 rounded-lg shadow">
                        Voltar
                    </button>
                </div>
            </div>
        </LayoutBase>
    );
}
