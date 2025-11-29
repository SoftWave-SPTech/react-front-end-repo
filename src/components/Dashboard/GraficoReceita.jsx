import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficoReceita = ({ dados }) => {

  if (!dados || dados.length === 0) {
    return (
      <div className="p-2 md:p-3 bg-white border border-gold-500 rounded-lg shadow-lg w-full h-full min-w-0">
        <h2 className="text-base md:text-[1.2em] font-semibold text-black font-quicksand mb-4 md:mb-6 text-center">
          Receita Mensal
        </h2>
        <p className="text-center text-gray-500 text-sm md:text-[1em]">Sem dados para exibir</p>
      </div>
    );
  }

   const dadosReceita = dados.map(item => ({
    produto: `${item.mes}/${item.ano}`,
    receita: item.receita,
  }));

  // Custom tick com rotação para evitar sobreposição
  const CustomTick = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#010D26"
        fontSize={12}
        transform="rotate(-35)"
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 60,
        }}
      >
        {payload.value.length > 12 ? payload.value.slice(0, 12) + '...' : payload.value}
      </text>
    </g>
  );

  return (
    <div className="p-2 md:p-4 bg-white border border-gold-500 rounded-lg shadow-lg w-full min-w-0">
      <h2 className="text-lg md:text-xl font-bold text-black font-quicksand mb-2 text-center">Receita Mensal</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={dadosReceita}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="produto"
            tick={<CustomTick />}
            interval={0}
            height={50}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '1rem' }} />
          <Bar dataKey="receita" fill="#010D26" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoReceita;