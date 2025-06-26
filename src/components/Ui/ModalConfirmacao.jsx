import React from "react";
import Botao from "./Botao";

export default function ModalConfirmacao({ titulo = "Confirmar", mensagem, onConfirmar, onCancelar }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h2 className="text-lg font-semibold mb-3">{titulo}</h2>
        <p className="text-sm text-gray-700 mb-6">{mensagem}</p>
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