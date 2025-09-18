import React, { useState, useEffect } from "react";
import { FiMail, FiPhone, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api'; 
import AlertStyle from '../Ui/AlertStyle';

export default function CardClientesProcessos({ cliente }) {
  const navigate = useNavigate();
  const [frame, setFrame] = useState(0);
  const frameSize = 3;
  const totalFrames = Math.ceil(cliente.processos.length / frameSize);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

  useEffect(() => {
    async function fetchFoto() {
      try {
        const response = await api.get(`/usuarios/foto-perfil/${cliente.id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        setFotoPerfil(response.data); 
      } catch (error) {
        console.error("Erro ao buscar foto de perfil", error.status);
        if(error.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: error.response.data.message, type: "error" })
          }
        setFotoPerfil(null);
      }
    }
    fetchFoto();
  }, [cliente.id]);

  const handleNextFrame = () => {
    if (frame < totalFrames - 1) setFrame(frame + 1);
  };

  const handlePrevFrame = () => {
    if (frame > 0) setFrame(frame - 1);
  };

  const parametrosVisualizarProcesso = (clienteId,processoId) => {
    navigate(`/processos-advogado/${clienteId}/${processoId}`);
  };

  const visibleProcessos = cliente.processos.slice(frame * frameSize, frame * frameSize + frameSize);

  return (
    <div className="bg-branco rounded-xl shadow px-4 py-4 flex flex-col gap-2 md:gap-0 md:flex-row items-start md:items-center">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <img
          src={
            fotoPerfil
              ? fotoPerfil.startsWith('http') || fotoPerfil.startsWith('https')
                ? fotoPerfil
                : `http://localhost:8080/${fotoPerfil.replace(/\\\\/g, '/').replace(/\\/g, '/')}`
              : "src/assets/images/boneco.png"
          }
          alt="Foto do cliente"
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <div className="text-preto font-semibold text-lg md:text-xl">{cliente.nome || cliente.nomeFantasia}</div>
          {(cliente.ativo) === true ? (
            <div className="text-dourado font-semibold text-sm md:text-base mt-1">Cliente Ativo</div>
          ) : (
            <div className="text-dourado font-semibold text-sm md:text-base mt-1">Cliente Inativo</div>
          )}
          <div className="flex items-center gap-2 text-preto text-xs mt-1">
            <FiMail className="inline" /> {cliente.email}
          </div>
          <div className="flex items-center gap-2 text-preto text-xs">
            <FiPhone className="inline" /> {cliente.telefone}
          </div>
        </div>
      </div>

      {alert && (
                <AlertStyle
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
      
      <div className="flex-1 flex flex-col mt-4 md:mt-0 md:ml-8">
        <div className="flex flex-col gap-2">
          {/* Botão para subir (seta para cima) */}
          {frame > 0 && (
            <div className="flex justify-center mb-2">
              <button
                type="button"
                onClick={handlePrevFrame}
                className="flex justify-center items-center text-AzulEscuro hover:text-dourado transition-colors"
                aria-label="Voltar processos"
              >
                <FiChevronUp size={28} />
              </button>
            </div>
          )}
          {/* Lista de processos */}
          {visibleProcessos.map((processo) => (
            <div
              key={processo.id}
              onClick={() => parametrosVisualizarProcesso( cliente.id,processo.id)}
              className="bg-cinzaAzulado rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-opacity-80 transition-colors"
              style={{ minHeight: "2.5rem" }}
            >
              <span className="text-preto text-sm md:text-base">
                Processo nº {processo.numeroProcesso}
              </span>
              <span className="text-AzulEscuro text-xl font-bold">{'>'}</span>
            </div>
          ))}
          {/* Botão para descer (seta para baixo) */}
          {frame < totalFrames - 1 && (
            <div className="flex justify-center mt-2">
              <button
                type="button"
                onClick={handleNextFrame}
                className="flex justify-center items-center text-AzulEscuro hover:text-dourado transition-colors"
                aria-label="Ver mais processos"
              >
                <FiChevronDown size={28} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>    
  );
}