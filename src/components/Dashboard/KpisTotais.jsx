import React from 'react';

const KpisTotais = ({ dados }) => {
  if (!dados) return null;

  const kpiData = [
    { value: dados.quantidadeProcessosTotais, label: 'Total de Processos' },
    { value: dados.quantidadeAdvogados, label: 'Total de Advogados' },
    { value: dados.quantidadeClientes, label: 'Total de Clientes' },
  ];

  return (
    <div className="flex justify-evenly p-4 border rounded-lg bg-white flex-1 h-[12rem] shadow-lg">
      {kpiData.map((kpi, index) => (
        <div key={index} className="flex flex-col items-center justify-center flex-1">
          <div className="flex items-center justify-center w-20 h-20 rounded-full border-[6px] border-dourado text-dourado font-semibold text-5xl">
            {kpi.value}
          </div>
          <span className="mt-5 text-lg font-semibold text-center font-quicksand">
            {kpi.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default KpisTotais;
