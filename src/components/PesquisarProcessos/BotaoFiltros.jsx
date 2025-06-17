import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi';

export default function BotaoFiltros({ label, onClick, ativo, isOpen, onToggle }) {
  const [valorSelecionado, setValorSelecionado] = useState('');

  const handleClick = () => {
    onToggle(label);
  };

  const handleSelecionarValor = (valor) => {
    setValorSelecionado(valor);
    onToggle(label);
    onClick(valor);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={handleClick}
        className={`w-full flex items-center justify-between bg-AzulEscuro text-dourado rounded-md px-4 py-2 text-base font-normal hover:bg-azulClaro hover:text-branco transition-colors ${ativo ? 'ring-2 ring-dourado' : ''}`}
        type="button"
      >
        <span className="flex items-center gap-2">
          {label}
        </span>
        {isOpen ? <FiFilter className="text-dourado" /> : <FiFilter className="text-dourado" />}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-branco rounded-md shadow-lg">
          <div className="py-1">
            <input
              type="text"
              placeholder="Digite para filtrar..."
              className="w-full px-4 py-2 text-sm text-preto border-b border-cinzaAzulado focus:outline-none"
              value={valorSelecionado}
              onChange={(e) => setValorSelecionado(e.target.value)}
            />
            <button
              onClick={() => handleSelecionarValor(valorSelecionado)}
              className="w-full px-4 py-2 text-sm text-preto hover:bg-cinzaAzulado"
            >
              Aplicar Filtro
            </button>
          </div>
        </div>
      )}
    </div>
  );
}