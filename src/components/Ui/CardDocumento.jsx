import React from "react";
import { FiFileText, FiTrash2 } from 'react-icons/fi';
import 'tailwindcss/tailwind.css';

export default function CardDocumento({ doc, onExcluir }) {
  return (
    <div className="w-60 bg-white rounded-md shadow-md p-4 flex flex-col items-center text-center relative">
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        onClick={onExcluir}
      >
        <FiTrash2 />
      </button>
      <FiFileText className="text-azulEscuroForte text-4xl mb-2" />
      <p className="text-sm font-medium text-gray-800 truncate w-full">{doc.nome}</p>
      <a
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        Visualizar
      </a>
    </div>
  );
}
