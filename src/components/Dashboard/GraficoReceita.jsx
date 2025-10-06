import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficoReceita = () => {
  const data = [
    { produto: 'Produto A', receita: 80 },
    { produto: 'Produto B', receita: 70 },
    { produto: 'Produto C', receita: 90 },
    { produto: 'Produto D', receita: 50 },
  ];

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
        <BarChart data={data}>
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