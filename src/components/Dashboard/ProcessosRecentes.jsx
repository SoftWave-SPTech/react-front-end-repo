import React from 'react';

const ProcessosRecentes = () => {
  const processos = [
    { id: '#1445', nome: 'Ana Claudia Ferreira Silva', setor: 'Vara da Infância', data: '04/04/2025' },
    { id: '#15256', nome: 'Leticia da Fonseca Santos', setor: 'Criminal', data: '05/04/2025' },
    { id: '#22678', nome: 'Bryjan Henrique Ferro', setor: 'Trabalhista', data: '06/04/2025' },
    { id: '#35668', nome: 'Leticia da Fonseca Santos', setor: 'Criminal', data: '07/04/2025' },
    { id: '#56985', nome: 'Leonardo de Carvalho', setor: 'Trabalhista', data: '20/04/2025' },
  ];

  return (
    <div className="p-4 bg-white border border-gold-500 rounded-lg shadow-lg">
      <h2 className="text-[1.2em] font-bold mb-3 text-black font-quicksand">
        Processos Cadastrados Recentemente
      </h2>
      <ul className="space-y-1">
        {processos.map((processo) => (
          <li
            key={processo.id}
            className="flex justify-between items-start py-3 px-3 rounded-lg bg-azulEscuroForte text-white border-b border-azulEscuroForte hover:bg-azulEscuroFraco hover:text-dourado cursor-pointer transition-colors"
          >
            <div className="flex-1 text-sm font-quicksand">
              <span className="font-semibold">Nº do Processo: {processo.id} | </span>
              <span>Processo: {processo.nome} | </span>
              <span>Setor: {processo.setor}</span>
            </div>
            <div className="text-white text-sm font-quicksand whitespace-nowrap">
              Nova Atualização: {processo.data}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessosRecentes;
