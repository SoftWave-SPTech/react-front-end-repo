import React, { useState, useEffect } from "react";
import { FiMail, FiPhone, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api'; 
import AlertStyle from '../Ui/AlertStyle';
import boneco from '../../assets/images/boneco.png';

export default function CardClientesProcessos({ cliente }) {
  const navigate = useNavigate();
  const [frame, setFrame] = useState(0);
  const frameSize = 3;
  const processos = cliente.processos || [];
  const totalFrames = Math.ceil(processos.length / frameSize);
  const mostrarScroll = processos.length > frameSize;
  const processosVisiveis = processos.slice(frame * frameSize, frame * frameSize + frameSize);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [imageError, setImageError] = useState(false);
   // const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });
  const [alert, setAlert] = useState();

  useEffect(() => {
    async function fetchFoto() {
      try {
        setImageError(false); // Reseta o erro quando buscar nova foto
        const response = await api.get(`/usuarios/foto-perfil/${cliente.id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        if (response.data && response.data !== "null") {
          // Constroi a URL completa se necessário, igual nas páginas de perfil
          const fotoUrl = response.data.startsWith("http://") || response.data.startsWith("https://")
            ? response.data
            : `http://localhost:8080/${response.data}`;
          setFotoPerfil(fotoUrl);
        } else {
          setFotoPerfil(null);
        }
      } catch (error) {
        console.error("Erro ao buscar foto de perfil", error);
        setFotoPerfil(null);
        setImageError(false); // Garante que mostrará a imagem padrão
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

  const handleImageError = () => {
    setImageError(true);
  };

  const imageSrc = imageError || !fotoPerfil || fotoPerfil === "null"
    ? boneco
    : fotoPerfil;

  return (
    <div className="bg-branco rounded-xl shadow px-4 py-4 flex flex-col gap-2 md:gap-0 md:flex-row items-start md:items-center">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <img
          src={imageSrc}
          alt="Foto do cliente"
          className="w-16 h-16 rounded-full object-cover"
          onError={handleImageError}
        />

        <div className="min-w-0">
          {/* Nome e nome fantasia sempre quebram linha se necessário */}
          <div className="text-preto font-semibold text-lg md:text-xl break-words whitespace-pre-line">
            {cliente.nome}
          </div>
          {cliente.nomeFantasia && (
            <div className="text-preto font-semibold text-lg flex ">
              {cliente.nomeFantasia}
            </div>
          )}
          
          {/* Email e telefone: email quebra linha no mobile */}
            <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-700 w-full">
                          {(cliente.ativo) === true ? (
            <div className="text-dourado font-semibold text-sm md:text-base mt-1">Cliente Ativo</div>
          ) : (
            <div className="text-dourado font-semibold text-sm md:text-base mt-1">Cliente Inativo</div>
          )}
                           <p className="flex items-center gap-2 w-full whitespace-normal break-all">
                               <FiMail className="text-base md:text-lg text-black shrink-0" /> {cliente.email}
                           </p>
                           <p className="flex items-center gap-2">
                               <FiPhone className="text-base md:text-lg text-black shrink-0" /> {cliente.telefone}
                           </p>
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
        <div className="flex flex-col gap-2 max-h-[9.5rem] pr-4 overflow-y-auto scrollbar-thin scrollbar-thumb-cinzaAzulado scrollbar-track-gray-200">
          {processos.map((processo) => (
            <div
              key={processo.id}
              onClick={() => parametrosVisualizarProcesso(cliente.id, processo.id)}
              className="bg-cinzaAzulado rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-opacity-80 transition-colors"
              style={{ minHeight: "2.5rem" }}
            >
              <span className="text-preto text-sm md:text-base">
                Processo nº {processo.numeroProcesso}
              </span>
              <span className="text-AzulEscuro text-xl font-bold">{'>'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>    
  );
}