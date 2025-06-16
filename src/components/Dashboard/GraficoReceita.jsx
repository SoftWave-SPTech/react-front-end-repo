import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficoReceita = () => {
  const data = [
    { produto: 'Produto A', receita: 80 },
    { produto: 'Produto B', receita: 70 },
    { produto: 'Produto C', receita: 90 },
    { produto: 'Produto D', receita: 50 },
  ];

  return (
    <div className="p-2 bg-white border border-gold-500 rounded-lg shadow-lg w-full"> {/* Sombra ajustada */}
      <h2 className="text-xl font-bold text-black font-quicksand mb-2">Receita Mensal</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="produto" />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '1.2rem' }} />
          <Bar dataKey="receita" fill="#010D26" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoReceita;