import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const GraficoSetores = ({ dados }) => {
  if (!dados || dados.length === 0) {
    return (
      <div className="p-3 bg-white border border-gold-500 rounded-lg shadow-lg w-full h-full">
        <h2 className="text-[1.2em] font-semibold text-black font-quicksand mb-6">
          Casos por Setor
        </h2>
        <p className="text-center text-gray-500 text-[1em]">Sem dados para exibir</p>
      </div>
    );
  }

  const dataFormatada = dados.map(item => ({
    setor: item.setor,
    casos: item.qtdProcessos,
  }));

  return (
    <div className="p-3 bg-white border border-gold-500 rounded-lg shadow-lg w-full h-full">
      <h2 className="text-[1.2em] font-semibold text-black font-quicksand mb-2">
        Casos por Setor
      </h2>
      <div className="mt-4 h-[75%] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataFormatada}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="setor" tick={{ fontSize: 15 }} />
            <YAxis tick={{ fontSize: 15 }} />
            <Tooltip contentStyle={{ fontSize: 16 }} />
            <Legend wrapperStyle={{ fontSize: 16 }} />
            <Bar dataKey="casos" fill="#010D26" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficoSetores;
