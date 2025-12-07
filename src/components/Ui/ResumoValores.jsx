// src/components/Ui/ResumoValores.jsx
import React from 'react';
import { formatCurrencyBRL } from '../../Utils/format';

export default function ResumoValores({ titulo, valor }) {
  // aceita tanto string já formatada quanto número cru
  const textoValor = typeof valor === 'number' ? formatCurrencyBRL(valor) : (valor ?? '');

  return (
    <div className="flex flex-col text-center text-white min-w-[120px]">
      <span className="text-xs">{titulo}</span>
      <span className="font-bold text-lg">{textoValor}</span>
    </div>
  );
}
