import React from 'react';

const KpisTotais = () => {
  const kpiData = [
    { value: 3, label: 'Total de Processos' },
    { value: 6, label: 'Total de Advogados' },
    { value: 9, label: 'Total de Clientes' },
  ];

  return (
    <div className="flex justify-evenly mb-6 p-4 border rounded-lg bg-white flex-1 h-full shadow-lg">
      {kpiData.map((kpi, index) => (
        <div key={index} className="flex flex-col items-center flex-1 justify-center">
          <div className="flex items-center justify-center w-28 h-28 rounded-full border-8 border-dourado text-dourado font-semibold text-6xl">
            {kpi.value}
          </div>
          <span className="mt-2 text-xl font-semibold text-center font-quicksand">
            {kpi.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default KpisTotais;