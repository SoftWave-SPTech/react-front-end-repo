import React, { useEffect, useState } from 'react';
import LayoutBase from '../layouts/LayoutBase';
import ProcessosRecentes from '../components/Dashboard/ProcessosRecentes';
import SetoresCasos from '../components/Dashboard/GraficoSetores';
import Clientes from '../components/Dashboard/GraficoStatusCliente';
import Receita from '../components/Dashboard/GraficoReceita';
import KpiValorCausas from '../components/Dashboard/KpiValorCausas';
import KPIs from '../components/Dashboard/KpisTotais';
import BarraTitulo from '../components/Ui/BarraTitulo';
import { api } from '../service/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dadosDashboard, setDadosDashboard] = useState(null);

  const fetchDados = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setError('Token não encontrado');
      setLoading(false);
      return;
    }

    setLoading(true);
    api.get('/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('Dados do dashboard:', res.data);
        setDadosDashboard(res.data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erro ao buscar dados: ' + err.message);
        console.log(err)
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDados();

    const intervalo = setInterval(() => {
      fetchDados();
    }, 3600000);

    return () => clearInterval(intervalo);
  }, []);

  if (loading) return <div>Carregando dados...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <div className="px-4">
        <BarraTitulo tamanho="responsivo" className="mb-4 shadow-lg font-bold">
          Dashboard
        </BarraTitulo>

        <div className="flex gap-2 mb-2">
          <div className="flex-none w-2/5">
            <KpiValorCausas valorTotal={dadosDashboard?.valorTotalProcessos} />
          </div>
          <div className="flex-1">
            <KPIs dados={dadosDashboard} />
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-2 mb-4 min-h-[16rem]">
          <div className="flex-1 min-w-[300px]">
            <SetoresCasos dados={dadosDashboard?.qtdProcessosPorSetor} />
          </div>
          <div className="flex-1 min-w-[300px]">
            <Clientes dados={dadosDashboard?.clientesInativosAndAtivos} />
          </div>
           {/* <div className="flex-1 min-w-[250px]">
            <Receita valor={dadosDashboard?.valorTotalProcessos} />
          </div> */}
        </div>
        <div>
          <ProcessosRecentes processos={dadosDashboard?.processosOrdenadosPorData} />
        </div>
      </div>
    </LayoutBase>
  );
};

export default Dashboard;
