import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import CardClientesProcessos from '../components/PesquisarProcessos/CardClientesProcessos';
import BotaoFiltros from '../components/PesquisarProcessos/BotaoFiltros';
import BarraTitulo from '../components/Ui/BarraTitulo';

const filtros = [
  { label: "Setor" },
  { label: "Fórum" },
  { label: "Vara" },
  { label: "Assunto" },
  { label: "Data" },
  { label: "Status Cliente" }
];

const PesquisarProcessos = () => {
  return (
    <LayoutBase tipoMenu="advogado">
      <div className="flex flex-col lg:flex-row w-full h-full px-2 md:px-8 py-4 gap-6">
        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <BarraTitulo>PESQUISAR PROCESSOS</BarraTitulo>
          </div>
          <div className="flex flex-col gap-6">
            <CardClientesProcessos />
            <CardClientesProcessos />
            <CardClientesProcessos />
          </div>
          {/* Botão voltar */}
          <div className="flex justify-end mt-8">
            <button className="bg-AzulEscuro text-branco rounded-md px-8 py-2 text-base font-normal hover:bg-azulClaro transition-colors">
              Voltar
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full max-w-[220px] mt-2">

          <div className="relative w-full mb-6">
            <input
              type="text"
              placeholder="Filtrar por Cliente ou Processo..."
              className="w-full rounded-md py-2 pl-4 pr-10 text-base bg-cinzaAzulado text-preto focus:outline-none"
            />
            <span className="absolute right-3 top-3 text-preto opacity-60 pointer-events-none">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {filtros.map(filtro => (
              <BotaoFiltros key={filtro.label} label={filtro.label} />
            ))}
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default PesquisarProcessos;