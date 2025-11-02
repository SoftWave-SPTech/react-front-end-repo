import React, { useState, useEffect } from "react";
import boneco from '../../assets/images/boneco.png';
import 'tailwindcss/tailwind.css';
import Toggle from "../Ui/Toggle";
import MenuLista from "../Ui/MenuLista";
import CardProcesso from "../ListaUsuarios/CardProcesso";
import { FiSmile, FiFrown, FiMail, FiPhone } from "react-icons/fi";
import Botao from "../Ui/Botao";
import { api } from "../../service/api";

export default function CardUsuario(props) {
    const [processos] = useState(props.processos || []);
    const [fotoPerfil, setFotoPerfil] = useState(null);

    useEffect(() => {
        async function fetchFoto() {
            try {
                const response = await api.get(`/usuarios/foto-perfil/${props.idUsuario}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                setFotoPerfil(response.data);
            } catch (error) {
                console.error("Erro ao buscar foto de perfil", error.status);
                setFotoPerfil(null);
            }
        }
        fetchFoto();
    }, [props.idUsuario]);

    const mostrarScroll = processos.length > 2;
    const processosVisiveis = mostrarScroll ? processos : processos.slice(0, 2);

    return (
        <div className="relative flex flex-col md:flex-row w-full bg-white rounded-lg shadow-md p-4 gap-4">
            {/* Versão Desktop */}
            <div className="hidden md:flex absolute top-4 right-4 items-center gap-3">
                <Botao
                    onClick={() => props.onClickEmail && props.onClickEmail(props.email)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { props.onClickEmail && props.onClickEmail(props.email); } }}
                    role="button"
                    tabIndex={0}
                    title="Clique para reenviar token para este e-mail"
                    className="cursor-pointer hover:underline"
                    tamanho="pequeno"
                    largura="auto"
                >
                    Reenviar Token
                </Botao>
                {props.role !== "ROLE_USUARIO" && (
                    <MenuLista idUsuario={props.idUsuario} role={props.role} />
                )}
                <Toggle idUsuario={props.idUsuario} ativo={props.ativo} className="w-12 h-6 md:w-14 md:h-7" onStatusChange={props.onStatusChange} />
            </div>

            <div className="flex flex-col gap-4 w-full md:w-1/3">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-100 shrink-0">
                        <img
                            src={fotoPerfil && fotoPerfil !== "null" ? fotoPerfil : boneco}
                            alt="Foto do usuário"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col justify-center w-full">
                        <span className="font-bold text-base md:text-xl text-gray-800">{props.nomeUser}</span>
                        {props.identificadorUser && (
                            <p className="text-xs md:text-sm text-gray-600">
                                <b>OAB</b> {props.identificadorUser}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-700 w-full">
                    {props.usuarioPrimeiroAcesso ? (
                        <p className="flex items-center gap-2">
                            <FiSmile className="text-base md:text-lg text-black shrink-0" /> Já realizou o primeiro acesso
                        </p>
                    ) : (
                        <p className="flex items-center gap-2">
                            <FiFrown className="text-base md:text-lg text-black shrink-0" /> Ainda não realizou o primeiro acesso
                        </p>
                    )}
                    <p className="flex items-center gap-2 w-full whitespace-normal break-all">
                        <FiMail className="text-base md:text-lg text-black shrink-0" /> {props.email}
                    </p>
                    <p className="flex items-center gap-2">
                        <FiPhone className="text-base md:text-lg text-black shrink-0" /> {props.telefone}
                    </p>
                </div>
            </div>

            {/* Versão Mobile */}
            <div className="flex md:hidden flex-col items-center gap-2 mt-2">
                

                <Botao
                    onClick={() => props.onClickEmail && props.onClickEmail(props.email)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { props.onClickEmail && props.onClickEmail(props.email); } }}
                    role="button"
                    tabIndex={0}
                    title="Clique para reenviar token para este e-mail"
                    className="cursor-pointer hover:underline"
                    tamanho="pequeno"
                >
                    Reenviar Token
                </Botao>
                {props.role !== "ROLE_USUARIO" && (
                    <MenuLista idUsuario={props.idUsuario} role={props.role} />
                )}
                <Toggle idUsuario={props.idUsuario} ativo={props.ativo} className="w-12 h-6"  onStatusChange={props.onStatusChange} />
            </div>


            <div className="flex flex-col gap-4 w-full md:w-2/3 pr-2 mt-12">
                <div className={`${mostrarScroll ? "max-h-40 overflow-y-auto" : ""} flex flex-col gap-2`}>
                    {(mostrarScroll ? processos : processosVisiveis).map((processo, index) => (
                        <CardProcesso
                            key={processo.id}
                            idProcesso={processo.id}
                            numeroProcesso={processo.numeroProcesso}
                            idUsuario={props.idUsuario}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
