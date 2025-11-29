import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GraficoStatusCliente = ({ dados }) => {
  const COLORS = ['#010D26', '#D9BB62'];

  if (!dados || dados.length === 0) {
    return (
      <div className="p-2 md:p-4 bg-white border border-gold-500 rounded-lg shadow-lg w-full h-full min-w-0">
        <h2 className="text-base md:text-[1.2em] font-semibold text-black font-quicksand mb-2 text-center">
          Status dos Clientes
        </h2>
        <div className="h-[180px] md:h-[220px] flex items-center justify-center">
          <p className="text-gray-500 text-sm md:text-base">Sem dados para exibir</p>
        </div>
      </div>
    );
  }

  const data = dados.map((item) => ({
    name: item.clienteAtivoOrInativo,
    value: item.qtdClienteAtivoOrInativo,
  }));

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-col gap-1">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center text-sm md:text-base text-black">
            <span
              className="w-3 h-3 mr-2"
              style={{ backgroundColor: COLORS[index], borderRadius: '50%' }}
            />
            {entry.payload.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-2 md:p-4 bg-white border border-gold-500 rounded-lg shadow-lg w-full h-full min-w-0">
      <h2 className="text-base md:text-[1.2em] font-semibold text-black font-quicksand mb-2 text-center">
        Status dos Clientes
      </h2>
      <div className="h-[180px] md:h-[220px] flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height="95%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="40%"
              innerRadius="50%"
              outerRadius="85%"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontSize: 14 }} />
            <Legend
              verticalAlign="bottom"
              align="center"
              contentStyle={{ fontSize: 14 }}
              content={renderLegend}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficoStatusCliente;