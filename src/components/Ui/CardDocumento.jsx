import React from "react";
import { FiFileText, FiTrash2, FiDownload } from 'react-icons/fi';
import 'tailwindcss/tailwind.css';

export default function CardDocumento({ doc, onExcluir }) {
  function formatBytes(bytes) {
    if (!bytes) return "—";
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  }

  return (
    <div className="w-72 min-h-56 h-full bg-white rounded-md shadow-md p-4 flex flex-col items-center justify-center text-center relative">
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        onClick={onExcluir}
      >
        <FiTrash2 className="text-2xl" />
      </button>
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <FiFileText className="text-azulEscuroForte text-4xl mb-6" />
        <p className="text-sm font-medium text-gray-800 truncate w-full">{doc.nomeArquivo}</p>
      </div>
      <div className="flex gap-3 mt-4 justify-center w-full">
        <a
          href={`http://localhost:8080/${doc.urlArquivo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-950 hover:underline flex items-center gap-1 justify-center"
        >
          Visualizar
        </a>
        <a
          href={`http://localhost:8080/${doc.urlArquivo}`}
          download
          className="text-sm text-blue-950 hover:underline flex items-center gap-1 justify-center"
          title="Baixar documento"
        >
          <FiDownload />
          Baixar
        </a>
      </div>
    </div>
  );
}