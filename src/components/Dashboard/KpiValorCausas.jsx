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
    <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-white border rounded-lg shadow-lg flex-1 h-auto md:h-[12rem] min-w-0">
      <div className="flex mb-3 md:mb-4 items-baseline gap-1 md:gap-2 w-full justify-center overflow-hidden">
        <span className="text-2xl md:text-4xl font-medium text-dourado">R$</span>
        <span className="text-4xl md:text-6xl font-semibold text-dourado truncate max-w-[10ch] md:max-w-[16ch]">
          {valorFormatado.replace('R$', '').trim()}
        </span>
      </div>
      <span className="text-base md:text-xl font-semibold text-center font-quicksand break-words w-full">
        Valor Total das Causas
      </span>
    </div>
  );
};

export default KpiValorCausas;