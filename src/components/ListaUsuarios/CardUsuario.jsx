import React, { useState } from "react";
import boneco from '../../assets/images/boneco.png';
import 'tailwindcss/tailwind.css';
import Toggle from "../Ui/Toggle";
import MenuLista from "../Ui/MenuLista";
import CardProcesso from "../ListaUsuarios/CardProcesso";
import { FiSmile, FiFrown, FiMail, FiPhone } from "react-icons/fi";

export default function CardUsuario(props) {
    const [processos] = useState(props.processos || []);
 
    const mostrarScroll = processos.length > 2;
    const processosVisiveis = mostrarScroll ? processos : processos.slice(0, 2);

    return (
      
        <div className="flex w-[98%] bg-white rounded-lg shadow-md p-4 gap-6">

            {/* 🔸 Lado esquerdo (30%) */}
            <div className="w-[30%] flex flex-col gap-4">

                {/* Parte superior (40%) */}
                <div className="flex h-[40%] gap-4">

                    {/* Foto */}
                    <div className="flex items-center justify-center w-[88px] h-[88px] rounded-full overflow-hidden bg-gray-100 shrink-0">
    <img
        src={props.imageUser != null ? `http://localhost:8080/${props.imageUser}` : boneco}
        alt="Foto do usuário"
        className="object-cover w-[88px] h-[88px]"
    />
</div>



                    {/* Infos básicas */}
                    <div className="flex flex-col justify-center">
                        <span className=" text-4xl font-bold text-lg text-gray-800">{props.nomeUser}</span>
                        {
                            props.identificadorUser ? <p className=" text-2xl text-sm text-gray-600"><b>OAB</b> {props.identificadorUser}</p> : ""
                        }
                    </div>
                </div>

                {/* Parte inferior (60%) */}
                <div className="flex flex-col gap-1 text-sm text-gray-700">
                    {
                        props.usuarioPrimeiroAcesso ? <p className="whitespace-nowrap"><b className="text-2xl text-black whitespace-nowrap">😊</b> Usuário Ativo em Sistema</p> : <p className="whitespace-nowrap"><b className="text-2xl text-black">😞</b> Ainda Não Realizou Primeiro Acesso</p>
                    }
                    {
                        props.token ? <p><b className="text-2xl text-black">🇹🇰</b> {props.token}</p> : ""
                    }
                    <p
                        onClick={() => props.onClickEmail && props.onClickEmail(props.email)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { props.onClickEmail && props.onClickEmail(props.email); } }}
                        role="button"
                        tabIndex={0}
                        title="Clique para reenviar token para este e-mail"
                        className="cursor-pointer hover:underline"
                    >
                        <b className="text-2xl text-black">✉️</b> {props.email}
                    </p>
                    <p><b className="text-2xl text-black">📱</b> {props.telefone}</p>
                </div>
        <div className="relative flex flex-col md:flex-row w-full bg-white rounded-lg shadow-md p-4 gap-4">
            {/* Versão Desktop */}
            <div className="hidden md:flex absolute top-4 right-4 items-center gap-3">
                {props.role !== "ROLE_USUARIO" && (
                    <MenuLista idUsuario={props.idUsuario} role={props.role} />
                )}
                <Toggle idUsuario={props.idUsuario} status={props.status} className="w-12 h-6 md:w-14 md:h-7" />
            </div>

            <div className="flex flex-col gap-4 w-full md:w-1/3">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-100 shrink-0">
                        <img
                            src={props.imageUser ? `http://localhost:8080/${props.imageUser}` : boneco}
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
                            <FiSmile className="text-base md:text-lg text-black shrink-0" /> Usuário Ativo em Sistema
                        </p>
                    ) : (
                        <p className="flex items-center gap-2">
                            <FiFrown className="text-base md:text-lg text-black shrink-0" /> Ainda Não Realizou Primeiro Acesso
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
                {props.role !== "ROLE_USUARIO" && (
                    <MenuLista idUsuario={props.idUsuario} role={props.role} />
                )}
                <Toggle idUsuario={props.idUsuario} status={props.status} className="w-12 h-6" />
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
