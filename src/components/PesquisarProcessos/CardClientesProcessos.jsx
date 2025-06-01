import React, { useState } from "react";
import { FiMail, FiPhone, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function CardClientesProcessos() {
  // Exemplo de processos, substitua pelo seu array real se necessário
  const processos = [
    "Processo nº 0823478-15.2023.8.26.0100",
    "Processo nº 0823478-15.2023.8.26.0100",
    "Processo nº 0823478-15.2023.8.26.0100",
    "Processo nº 0823478-15.2023.8.26.0100",
    "Processo nº 0823478-15.2023.8.26.0100",
    "Processo nº 0823478-15.2023.8.26.0100",
    "Processo nº 0823478-15.2023.8.26.0100"
  ];

  const [frame, setFrame] = useState(0);
  const frameSize = 3;
  const totalFrames = Math.ceil(processos.length / frameSize);

  const handleNextFrame = () => {
    if (frame < totalFrames - 1) setFrame(frame + 1);
  };

  const handlePrevFrame = () => {
    if (frame > 0) setFrame(frame - 1);
  };

  const visibleProcessos = processos.slice(frame * frameSize, frame * frameSize + frameSize);

  return (
    <div className="bg-branco rounded-xl shadow px-4 py-4 flex flex-col gap-2 md:gap-0 md:flex-row items-start md:items-center">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <img
          src="src/assets/images/boneco.png"
          alt="Foto do cliente"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <div className="text-preto font-semibold text-base">Leticia da Fonseca</div>
          <div className="text-dourado text-xs mt-1">Cliente Ativo no Sistema</div>
          <div className="flex items-center gap-2 text-preto text-xs mt-1">
            <FiMail className="inline" /> leticia.fonseca@sptech.school
          </div>
          <div className="flex items-center gap-2 text-preto text-xs">
            <FiPhone className="inline" /> +55 (11) 90000 - 0000
          </div>
        </div>
      </div>
      
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
          {visibleProcessos.map((proc, idx) => (
            <div
              key={idx + frame * frameSize}
              className="bg-cinzaAzulado rounded-lg px-4 py-2 flex items-center justify-between"
              style={{ minHeight: "2.5rem" }}
            >
              <span className="text-preto text-sm md:text-base">
                {proc}
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