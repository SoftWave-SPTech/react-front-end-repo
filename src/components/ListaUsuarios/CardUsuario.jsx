import React, { useState } from "react";
import boneco from '../../assets/images/boneco.png';
import 'tailwindcss/tailwind.css';
import Toggle from "../Ui/Toggle";
import MenuLista from "../Ui/MenuLista";
import CardProcesso from "../ListaUsuarios/CardProcesso";
import { FiSmile } from "react-icons/fi";
import { FaSadTear } from "react-icons/fa";

export default function CardUsuario(props) {
    const [processos, setProcessos] = useState(props.processos || []);

    return (
        <div className="flex w-[98%] bg-white rounded-lg shadow-md p-4 gap-6">
            
            {/* 🔸 Lado esquerdo (30%) */}
            <div className="w-[30%] flex flex-col gap-4">
                
                {/* Parte superior (40%) */}
                <div className="flex h-[40%] gap-4">
                    
                    {/* Foto */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                        <img
                            src={props.imageUser != null ? `http://localhost:8080/${props.imageUser}` : boneco}
                            alt="Foto do usuário"
                            className="w-full h-full object-cover"
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
                        props.usuarioPrimeiroAcesso ? <p><b className="text-2xl text-black">😊</b> Usuário Ativo em Sistema</p> : <p><b className="text-2xl text-black">😞</b> Ainda Não Realizou Primeiro Acesso</p>
                    }
                    {
                        props.token ? <p><b className="text-2xl text-black">🇹🇰</b> {props.token }</p> : ""
                    }
                    <p><b className="text-2xl text-black">✉️</b> {props.email}</p>
                    <p><b className="text-2xl text-black">📱</b> {props.telefone}</p>
                </div>
            </div>

            {/* 🔸 Lado direito (70%) */}
            <div className="w-[70%] flex flex-col gap-4 relative">
    
                {/* 🔝 Toggle no canto superior direito */}
                <div className="absolute top-0 right-0">
                    <Toggle />
                </div>

                {/* 📋 Menu centralizado */}
                <div className="flex justify-center items-center h-[20%]">
                    {props.role != "ROLE_USUARIO" && (
                        <MenuLista role={props.role} />
                    )}  
                </div>

                {/* 📑 Lista de processos com scroll se ultrapassar 2 */}
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[180px] pr-2">
                    
                    {
                        processos.map((processo) => (
                             <CardProcesso
                                idProcesso={processo.idProcesso}
                                numeroProcesso={processo.numeroProcesso}
                                idUsuario={props.idUsuario} />                       
                        ))
                    }
                </div>
            </div>

        </div>
    );
}
