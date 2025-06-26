import React from 'react';

const ProcessosRecentes = ({ processos }) => {
  if (!processos || processos.length === 0) {
    return (
      <div className="p-4 bg-white border border-gold-500 rounded-lg shadow-lg">
        <h2 className="text-[1.2em] font-bold mb-3 text-black font-quicksand">
          Processos Cadastrados Recentemente
        </h2>
        <p className="text-gray-500 font-quicksand">Nenhum processo recente encontrado.</p>
      </div>
    );
  }

  const TAMANHO_LISTA_PROCESSOS = 5; // Define o tamanho máximo da lista de processos

  return (
    <div className="p-4 bg-white border border-gold-500 rounded-lg shadow-lg">
      <h2 className="text-[1.2em] font-bold mb-3 text-black font-quicksand">
        Processos Cadastrados Recentemente
      </h2>
      <ul className="space-y-1">
        {processos.slice(0, TAMANHO_LISTA_PROCESSOS).map((processo) => (
          <li
            key={processo.id}
            className="flex justify-between items-start py-3 px-3 rounded-lg bg-azulEscuroForte text-white border-b border-azulEscuroForte hover:bg-azulEscuroFraco hover:text-dourado cursor-pointer transition-colors"
          >
            <div className="flex-1 text-sm font-quicksand">
              <span className="font-semibold">Nº do Processo: {processo.numeroProcesso || processo.id} | </span>
              <span>Processo: {processo.assunto || processo.nome} | </span>
              <span>Setor: {processo.area || processo.setor}</span>
            </div>
            <div className="text-white text-sm font-quicksand whitespace-nowrap">
              Data Criação: {processo.dataCriacao ? new Date(processo.dataCriacao).toLocaleDateString('pt-BR') : 'Não disponível'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessosRecentes;