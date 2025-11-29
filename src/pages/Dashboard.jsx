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
import AlertStyle from '../components/Ui/AlertStyle';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dadosDashboard, setDadosDashboard] = useState(null);
  const [alert, setAlert] = useState();

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
        console.error("Erro ao buscar dados da dashboard:", err);
        const status = err?.response?.status;
        const msgBackend = err?.response?.data?.message;
        setError('Erro ao buscar dados: ' + (msgBackend || 'tente novamente mais tarde.'));

        if (status >= 500) {
          setAlert({
            show: true,
            message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!",
            type: "error"
          });
        } else {
          setAlert({
            show: true,
            message: msgBackend || "Erro ao buscar dados da dashboard.",
            type: "error"
          });
        }
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

  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <div className="px-2 md:px-4">
        <BarraTitulo tamanho="responsivo" className="mb-4 shadow-lg">
          Dashboard
        </BarraTitulo>

        {alert && (
          <AlertStyle
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* KPIs principais */}
        <div className="flex flex-col md:flex-row gap-2 mb-2">
          <div className="w-full md:w-2/5">
            <KpiValorCausas valorTotal={dadosDashboard?.valorTotalProcessos} />
          </div>
          <div className="w-full md:flex-1 mt-2 md:mt-0">
            <KPIs dados={dadosDashboard} />
          </div>
        </div>

        {/* Gráficos */}
        <div className="flex flex-col md:flex-row flex-wrap gap-2 mb-4 min-h-[16rem]">
          <div className="flex-1 min-w-[250px]">
            <SetoresCasos dados={dadosDashboard?.qtdProcessosPorSetor} />
          </div>
          <div className="flex-1 min-w-[250px] mt-2 md:mt-0">
            <Clientes dados={dadosDashboard?.clientesInativosAndAtivos} />
          </div>
          <div className="flex-1 min-w-[200px] mt-2 md:mt-0">
            <Receita dados={dadosDashboard?.receitaUltimos6Meses} />
          </div>
        </div>

        {/* Processos recentes */}
        <div className="mt-2">
          <ProcessosRecentes processos={dadosDashboard?.processosOrdenadosPorData} />
        </div>
      </div>
    </LayoutBase>
  );
};

export default Dashboard;