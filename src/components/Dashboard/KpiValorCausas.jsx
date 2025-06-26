import React from 'react';

const KpiValorCausas = ({ valorTotal }) => {
  const numero = Number(
    String(valorTotal).replace(/\./g, '').replace(',', '.')
  );
  if (isNaN(numero)) return null;

  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(numero);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg shadow-lg flex-1 h-[12rem]">
      <div className="flex mb-4 items-baseline gap-2">
        <span className="text-4xl font-medium text-dourado">R$</span>
        <span className="text-6xl font-semibold text-dourado">
          {valorFormatado.replace('R$', '').trim()}
        </span>
      </div>
      <span className="text-xl font-semibold text-center font-quicksand">
        Valor Total das Causas
      </span>
    </div>
  );
};

export default KpiValorCausas;
