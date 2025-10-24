import React, { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';
import LayoutBase from "../layouts/LayoutBase";
import CardUsuario from "../components/ListaUsuarios/CardUsuario";
import { api } from "../service/api";
import BarraTitulo from "../components/Ui/BarraTitulo";
import ModalReenvioTokenPrimeiroAcesso from "../components/Ui/ModalReenvioTokenPrimeiroAcesso";
import AlertStyle from '../components/Ui/AlertStyle';

export default function ListaUsuarios() {
    const TOKEN = `Bearer ${sessionStorage.getItem('token')}`;
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [isModalReenvioOpen, setIsModalReenvioOpen] = useState(false);
    const [emailSelecionado, setEmailSelecionado] = useState("");
    const [reenviando, setReenviando] = useState(false);
    const [alert, setAlert] = useState();
    
    // Estados para paginação
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 6; // Número de itens por página

    useEffect(() => {
        fetchUsuarios(currentPage);
    }, [currentPage]);

    const fetchUsuarios = async (page) => {
        try {
            const response = await api.get(`/usuarios/listar-usuarios-e-processos?page=${page}&size=${itemsPerPage}`, {
                headers: {
                    "Authorization": TOKEN
                }
            });
            console.log("Consulta com sucesso:", response.data);
            setListaUsuarios(response.data.content); // Assumindo que a resposta tem a estrutura content
            setTotalPages(response.data.totalPages); // Total de páginas
        } catch (error) {
            console.error("Erro ao buscar usuários e processos:", error.status);
            if (error.status >= 500) {
                setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" });
            } else {
                setAlert({ show: true, message: error.response.data.message, type: "error" });
            }
        }
    };

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
            await api.put(`/usuarios/editar-email/${emailSelecionado}/${novoEmail}`, {
                headers: {
                    "Authorization": TOKEN
                }
            });
            console.log('Reenviar token para:', novoEmail);
            setIsModalReenvioOpen(false);
        } catch (error) {
            console.error('Erro ao reenviar token:', error);
            if (error.status >= 500) {
                setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" });
            } else {
                setAlert({ show: true, message: error.response.data.message, type: "error" });
            }
        } finally {
            setReenviando(false);
        }
    };

    // Função para mudar de página
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <LayoutBase backgroundClass="bg-cinzaAzulado">
            <div className="w-full mb-2 px-2">
                <BarraTitulo largura="full">Pesquisar Usuários</BarraTitulo>
            </div>

            {alert && (
                <AlertStyle
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

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
                                ativo={usuario.ativo}
                                processos={usuario.procesos}
                                onClickEmail={abrirModalReenvio}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500">Nenhum usuário encontrado.</div>
                    )
                }
            </div>

            {/* Paginação */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={`px-4 py-2 ${currentPage === index ? 'bg-AzulEscuro text-white' : 'bg-gray-200 text-AzulEscuro'} rounded mx-1`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                    Próxima
                </button>
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