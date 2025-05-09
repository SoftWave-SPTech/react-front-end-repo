import React, { useState } from "react";
import 'tailwindcss/tailwind.css';

export default function ModalUpload({ onClose, onUpload }) {
  const [arquivo, setArquivo] = useState(null);

  const handleUpload = () => {
    if (!arquivo) return;
    const novoDoc = {
      nome: arquivo.name,
      url: URL.createObjectURL(arquivo),
    };
    onUpload(novoDoc);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Anexar Documento</h2>

        <input 
          type="file" 
          className="mb-4 w-full" 
          onChange={(e) => setArquivo(e.target.files[0])}
        />

        <div className="flex justify-end gap-4">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleUpload}
            disabled={!arquivo}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
