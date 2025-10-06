import React from 'react';

const KpisTotais = ({ dados }) => {
  if (!dados) return null;

  const kpiData = [
    { value: dados.quantidadeProcessosTotais, label: 'Total de Processos' },
    { value: dados.quantidadeAdvogados, label: 'Total de Advogados' },
    { value: dados.quantidadeClientes, label: 'Total de Clientes' },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-4 md:gap-0 p-2 md:p-4 border rounded-lg bg-white flex-1 h-auto md:h-[12rem] shadow-lg">
      {kpiData.map((kpi, index) => (
        <div key={index} className="flex flex-col items-center justify-center flex-1">
          <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-[6px] border-dourado text-dourado font-semibold text-3xl md:text-5xl">
            {kpi.value}
          </div>
          <span className="mt-3 md:mt-5 text-base md:text-lg font-semibold text-center font-quicksand">
            {kpi.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default KpisTotais;