import React from "react";

export default function Alert({ type = "info", message, onClose }) {
  const colors = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  // Se message vier vazia, undefined ou null → usa fallback
  const finalMessage =
    message && String(message).trim() !== ""
      ? message
      : "Ocorreu um erro inesperado.";

  return (
    <div
      className={`border-l-4 p-4 mb-4 rounded flex items-center justify-between shadow ${colors[type]}`}
    >
      <span>{finalMessage}</span>

      {onClose && (
        <button
          className="ml-4 text-xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
      )}
    </div>
  );
}
