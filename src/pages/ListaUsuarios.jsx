import React, { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';
import LayoutBase from "../layouts/LayoutBase";
import CardUsuario from "../components/ListaUsuarios/CardUsuario";
import { api } from "../service/api";
import BarraTitulo from "../components/Ui/BarraTitulo";
import ModalReenvioTokenPrimeiroAcesso from "../components/Ui/ModalReenvioTokenPrimeiroAcesso";

export default function ListaUsuarios() {
    const TOKEN = `Bearer ${sessionStorage.getItem('token')}`;
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [isModalReenvioOpen, setIsModalReenvioOpen] = useState(false);
    const [emailSelecionado, setEmailSelecionado] = useState("");
    const [reenviando, setReenviando] = useState(false);

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

    const abrirModalReenvio = (email) => {
        setEmailSelecionado(email || "");
        setIsModalReenvioOpen(true);
    };

    const fecharModalReenvio = () => {
        setIsModalReenvioOpen(false);
    };

    const handleReenviar = async (novoEmail) => {
        try {
            setReenviando(true);
            await api.put(`/usuarios/editar-email/${emailSelecionado}/${novoEmail}`,{
                headers: {
                    "Authorization": TOKEN
                }
            });
            console.log('Reenviar token para:', novoEmail);
            setIsModalReenvioOpen(false);
        } catch (error) {
            console.error('Erro ao reenviar token:', error);
            alert(error.response.data.message);
        } finally {
            setReenviando(false);
        }
    };

    return (
        <LayoutBase backgroundClass="bg-cinzaAzulado">
            {/* Barra de título responsiva */}
            <div className="w-full mb-2 px-2">
                <BarraTitulo largura="full">Pesquisar Usuários</BarraTitulo>
            </div>
            {/* Input de busca centralizado e responsivo */}
            <div className="flex justify-end mb-6 px-2">
                <div className="relative w-full max-w-xs ">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9BB62] text-base sm:text-lg"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-500">
                        🔍︎
                    </div>
                </div>
            </div>

            {/* Cards responsivos */}
            <div className="w-full flex flex-col gap-2 mt-4 px-2">
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
                                onClickEmail={abrirModalReenvio}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500">Nenhum usuário encontrado.</div>
                    )
                }
            </div>

            <ModalReenvioTokenPrimeiroAcesso
                isOpen={isModalReenvioOpen}
                onClose={fecharModalReenvio}
                onReenviar={handleReenviar}
                emailAtual={emailSelecionado}
                loading={reenviando}
            />
        </LayoutBase>
    );
}