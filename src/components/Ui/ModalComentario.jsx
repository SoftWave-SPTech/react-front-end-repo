import React, { useEffect, useState } from "react";
import Botao from "./Botao";
import { formatarData } from "../../Utils/mascaras";

export default function ModalComentario({
  isOpen,
  onClose,
  onSalvar,
  onExcluir,
  comentario,
  modoEdicao,
  setModoEdicao
}) {
  const [texto, setTexto] = useState("");

  const idUsuario = Number (sessionStorage.getItem("id"));
  const idUsuarioComentario = Number (comentario?.idUsuario || 0);

  useEffect(() => {
    if (comentario && modoEdicao === true) {
      // Abrindo para visualizar um comentário já salvo
      setTexto(comentario.comentario);
    } else if (!comentario && modoEdicao === false) {
      // Criando um novo comentário
      setTexto("");
    }
  }, [comentario, modoEdicao]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#0A1A33] text-white rounded-xl w-full max-w-2xl p-6 relative max-h-[60vh] overflow-y-auto">

        {/* Cabeçalho */}
        <div className="bg-[#2454D3] rounded-t-xl px-4 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white w-full text-center">
            Comentário do advogado
          </h3>
          <button
            onClick={onClose}
            className="absolute right-6 top-4 text-white text-2xl font-light"
          >
            &times;
          </button>
        </div>

        {/* Nome, data e botão */}
        <div className="flex items-center justify-between mt-6 mb-4 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img
              src={comentario.fotoUsuario.includes("http") ? comentario.fotoUsuario : `http://localhost:8080/${comentario.fotoUsuario}`}
              alt="Foto do advogado"
              className="w-12 h-12 rounded-full border border-white"
            />
            <div>
              <p className="font-bold">{comentario?.nomeUsuario}</p>
              <p className="text-sm text-gray-300">
                {formatarData(comentario?.dataComentario || new Date().toISOString()) }
              </p>
            </div>
          </div>

          {modoEdicao ? (
            <Botao
              largura="auto"
              cor="padrao"
              tamanho="medio"
              onClick={() => onSalvar(texto, comentario?.index)}
            >
              Salvar
            </Botao>
          ) : (
            <>
            {idUsuarioComentario === idUsuario && (
              <div className="flex gap-1">
                <Botao
                  largura="auto"
                  cor="padrao"
                  tamanho="medio"
                  onClick={() => setModoEdicao(true)}
                >
                  Editar
                </Botao>
                <Botao
                  largura="auto"
                  cor="padrao"
                  tamanho="medio"
                  onClick={() => onExcluir(comentario?.id, comentario?.index)}
                >
                  Excluir
                </Botao>
              </div>
            )}
            </>
          )}
        </div>

        {/* Conteúdo do comentário */}
        <div className="mt-4">
          {modoEdicao ? (
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="w-full h-64 p-4 rounded-lg text-black resize-none focus:outline-none"
              placeholder="Digite seu comentário aqui..."
            />
          ) : (
            <p className="whitespace-pre-wrap break-words text-white max-w-full">
              {comentario?.comentario || "Nenhum comentário disponível."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
