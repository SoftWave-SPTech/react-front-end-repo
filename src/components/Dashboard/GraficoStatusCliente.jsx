import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GraficoStatusCliente = () => {
  const data = [
    { name: 'Clientes Ativos', value: 70 },
    { name: 'Clientes Inativos', value: 30 },
  ];

  const COLORS = ['#010D26', '#D9BB62'];

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-col">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center">
            <span
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: COLORS[index], borderRadius: '50%' }}
            />
            <span style={{ color: '#000', fontSize: '1.2rem' }}>
              {entry.payload.name}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-2 bg-white border border-gold-500 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-bold text-black font-quicksand mb-2">Status dos Clientes</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="90%"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoStatusCliente;