import React, { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';
import LayoutBase from "../layouts/LayoutBase";
import CardUsuario from "../components/ListaUsuarios/CardUsuario";
import { api } from "../service/api";
import BarraTitulo from "../components/Ui/BarraTitulo";

export default function ListaUsuarios() {
    const TOKEN = `Bearer ${sessionStorage.getItem('token')}`;
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [filtro, setFiltro] = useState('');

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
                setListaUsuarios(response.data);
            })
            .catch(error => {
                console.error("Erro ao enviar o arquivo:", error);
            });
    }, []);

    // Filtra os usuários de acordo com o nome digitado
    const usuariosFiltrados = listaUsuarios.filter((usuario) => {
        const nome = usuario.nome || usuario.nomeFantasia || '';
        return nome.toLowerCase().includes(filtro.toLowerCase());
    });

    return (
        <LayoutBase backgroundClass="bg-cinzaAzulado">
            <div className="flex items-center justify-between mb-6">
                <BarraTitulo largura="medio2">Pesquisar Usuários</BarraTitulo>
                <div className="relative w-64 mt-2">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9BB62]"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-500">
                        🔍︎
                    </div>
                </div>
            </div>

            {/* Conteúdo dos cards */}
            <div className="w-[75%] overflow-auto max-h-[600px] flex flex-col gap-2 mt-4">
                {
                    usuariosFiltrados.length > 0 ? (
                        usuariosFiltrados.map((usuario) => (
                            <CardUsuario
                                key={usuario.id}
                                idUsuario={usuario.id}
                                imageUser={usuario.foto}
                                nomeUser={usuario.nome ? usuario.nome : usuario.nomeFantasia}
                                identificadorUser={usuario.oab}
                                usuarioPrimeiroAcesso={usuario.ativo}
                                token={usuario.tokenPrimeiroAcesso}
                                email={usuario.email}
                                telefone={usuario.telefone}
                                role={usuario.role}
                                status={usuario.status}
                                processos={usuario.procesos}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500">Nenhum usuário encontrado.</div>
                    )
                }
            </div>
        </LayoutBase>
    );
}