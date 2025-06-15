import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficoSetores = () => {
  const data = [
    { setor: 'Setor A', casos: 35 },
    { setor: 'Setor B', casos: 25 },
    { setor: 'Setor C', casos: 15 },
    { setor: 'Setor D', casos: 20 },
    { setor: 'Setor E', casos: 5 },
  ];

  return (
    <div className="p-2 bg-white border border-gold-500 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-bold text-black font-quicksand mb-2">Casos por Setor</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="setor" />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '1.2rem' }} />
          <Bar dataKey="casos" fill="#010D26" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoSetores;