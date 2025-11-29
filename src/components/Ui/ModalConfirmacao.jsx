import React, { useEffect, useRef } from "react";
import Botao from "./Botao";

export default function ModalConfirmacao({
  titulo = "Confirmar",
  mensagem,
  onConfirmar,
  onCancelar
}) {
  const modalRef = useRef(null);

  // Fallback caso a mensagem venha vazia
  const textoFinal =
    mensagem && String(mensagem).trim() !== ""
      ? mensagem
      : "Tem certeza que deseja continuar?";

  // Fechar pelo ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onCancelar();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancelar]);

  // Focar modal ao abrir
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  // Fechar ao clicar fora
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) onCancelar();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h2 className="text-lg font-semibold mb-3">{titulo}</h2>

        <p className="text-sm text-gray-700 mb-6">
          {textoFinal}
        </p>

        <div className="flex justify-center gap-4">
          <Botao
            onClick={onCancelar}
            tamanho="grande"
            largura="medio"
            cor="contornoAzul"
          >
            Cancelar
          </Botao>

          <Botao
            onClick={onConfirmar}
            tamanho="grande"
            largura="medio"
            cor="padrao"
          >
            Confirmar
          </Botao>
        </div>
      </div>
    </div>
  );
}
