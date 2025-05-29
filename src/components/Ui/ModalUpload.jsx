import React, { useState } from "react";
import 'tailwindcss/tailwind.css';
import Botao from "./Botao";
import { Input } from './Input';

export default function ModalUpload({ onClose, onUpload }) {
  const [arquivo, setArquivo] = useState(null);
  const [descArquivo, setDescArquivo] = useState("");

  const handleUpload = () => {
    if (!arquivo) return;
    const novoDoc = {
      nome: descArquivo,
      url: URL.createObjectURL(arquivo),
      file: arquivo,
    };
    onUpload(novoDoc);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg min-h-[30%] flex flex-col justify-between">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Anexar Documento</h2>
        <input
          type="file"
          className="mb-4 w-full"
          onChange={(e) => setArquivo(e.target.files[0])}
        />

        <Input
        type={"text"}
        label={"Descrição Documento"}
        onChange={(e) => setDescArquivo(e.target.value)} />

        <div className="flex justify-end gap-2 mt-auto">
          <Botao
            className="text-xs px-2 py-0.5 rounded"
            onClick={onClose}
            disabled={false}
            cor="contornoAzul"
            variant="secondary"
            tamanho="responsivo"
          >
            Cancelar
          </Botao>
          <Botao
            className="text-xs px-2 py-0.5 rounded"
            onClick={handleUpload}
            disabled={!arquivo}
            variant="primary"
          >
            Upload
          </Botao>
        </div>
      </div>
    </div>
  );
}