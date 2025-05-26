import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutBase from '../layouts/LayoutBase';
import CardClientesProcessos from '../components/PesquisarProcessos/CardClientesProcessos';
import BotaoFiltros from '../components/PesquisarProcessos/BotaoFiltros';
import BarraTitulo from '../components/Ui/BarraTitulo';
import Botao from '../components/Ui/Botao';

const filtros = [
  { label: "Setor" },
  { label: "Fórum" },
  { label: "Vara" },
  { label: "Assunto" },
  { label: "Data" },
  { label: "Status Cliente" }
];

const PesquisarProcessos = () => {
  const navigate = useNavigate();

  return (
    <LayoutBase tipoMenu="advogado">
      <div className="relative flex flex-col lg:flex-row w-full h-full min-h-screen px-[1.5rem] md:px-[3rem] py-[1.5rem] gap-[2rem]">
        <div className="flex-1 flex flex-col">
          <div className="mb-[1.5rem]">
            <BarraTitulo>PESQUISAR PROCESSOS</BarraTitulo>
          </div>
          <div className="flex flex-col gap-[1.5rem]">
            <CardClientesProcessos />
            <CardClientesProcessos />
            <CardClientesProcessos />
          </div>
        </div>

        <div className="flex flex-col w-full max-w-[14rem] mt-[0.5rem] relative">
          <div className="relative w-full mb-[1.5rem]">
            <input
              type="text"
              placeholder="Filtrar por Cliente ou Processo..."
              className="w-full rounded-md py-[0.5rem] pl-[1rem] pr-[2.5rem] text-base bg-cinzaAzulado text-preto focus:outline-none"
            />
            <span className="absolute right-[0.75rem] top-[0.75rem] text-preto opacity-60 pointer-events-none">
              <svg width="1.25rem" height="1.25rem" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          <div className="flex flex-col gap-[1rem]">
            {filtros.map(filtro => (
              <BotaoFiltros key={filtro.label} label={filtro.label} />
            ))}
          </div>
          <div className="fixed right-[4.5rem] bottom-8 z-50 max-w-[14rem] w-full flex justify-end lg:justify-center">
            <Botao
              cor="padrao"
              largura="auto"
                            onClick={() => navigate('/cadastrar-processo')}
            >
              Voltar
            </Botao>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default PesquisarProcessos;