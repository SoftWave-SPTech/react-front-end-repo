import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import ProcessosRecentes from '../components/Dashboard/ProcessosRecentes';
import SetoresCasos from '../components/Dashboard/GraficoSetores';
import Clientes from '../components/Dashboard/GraficoStatusCliente';
import Receita from '../components/Dashboard/GraficoReceita';
import CasosFinalizados from '../components/Dashboard/KpiValorCausas';
import KPIs from '../components/Dashboard/KpisTotais';
import BarraTitulo from '../components/Ui/BarraTitulo';

const Dashboard = () => {
  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <div className="pt-2 px-6">
        <BarraTitulo tamanho='Full' className="mb-6 shadow-lg">Dashboard</BarraTitulo>
        <div className="flex mb-6 h-64">
          <div className="flex-none w-2/5">
            <CasosFinalizados />
          </div>
          <div className="flex-1">
            <KPIs />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[250px]">
            <SetoresCasos />
          </div>
          <div className="flex-1 min-w-[250px]">
            <Clientes />
          </div>
          <div className="flex-1 min-w-[250px]">
            <Receita />
          </div>
        </div>
        <div className="mb-6">
          <ProcessosRecentes />
        </div>
      </div>
    </LayoutBase>
  );
};

export default Dashboard;