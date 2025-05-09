import React from "react";

export default function ModalConfirmacao({ titulo = "Confirmar", mensagem, onConfirmar, onCancelar }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-3">{titulo}</h2>
        <p className="text-sm text-gray-700 mb-6">{mensagem}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancelar}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
