import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import ModalAguardando from './ModalAguardando';
import AlertStyle from '../Ui/AlertStyle';

const ProcessoAndamento = ({ andamentos = [], processoId, filtro = '' }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

  const andamentosFiltrados = andamentos.filter(item => {
    if (!filtro.trim()) return true;
    
    const filtroLower = filtro.toLowerCase();
    const data = item.data?.toLowerCase() || '';
    const movimento = item.movimento?.toLowerCase() || '';
    
    return data.includes(filtroLower) || movimento.includes(filtroLower);
  });

  if (!andamentos || andamentos.length === 0) {
    return (
      <div className="bg-[#0f1b3e] text-white rounded-lg p-4 text-center">
        Nenhum andamento encontrado.
      </div>
    );
  }

  function gerarAnaliseIA(item) {
    setLoading(true);
    api.post(`/analise-processo/${item.id}`)
      .then((res) =>{ 
        console.log("Análise IA gerada com sucesso:", res.data);
        setLoading(false);
        navigate(`/analise-ia/${processoId}/${item.id}`)
      })
      .catch((error) => {
        console.error("Erro ao gerar análise IA", error.status);
        setLoading(false);
        navigate(`/analise-ia/${processoId}/${item.id}`)
      });
  }

  return (
    <div className="flex flex-col">
      <ModalAguardando loadingEnd={!loading} />
      
      {/* Lista de andamentos */}
      <div className="overflow-y-auto space-y-3 pr-2" style={{ height: '280px' }}>
        {andamentosFiltrados.length === 0 ? (
          <div className="bg-[#0f1b3e] text-white rounded-lg p-4 text-center">
            Nenhum andamento encontrado para "{filtro}".
          </div>
        ) : (
          andamentosFiltrados.map((item, idx) => (
            <div key={item.id || idx} className="bg-[#0f1b3e] text-white rounded-lg p-4 flex items-start justify-between">
              <div className="flex-1 mr-3">
                <div className="text-sm font-medium mb-1">
                  {item.data}
                </div>
                <div className="text-xs text-gray-300 leading-relaxed overflow-hidden" 
                     style={{
                       display: '-webkit-box',
                       WebkitLineClamp: 2,
                       WebkitBoxOrient: 'vertical',
                       lineHeight: '1.4',
                       maxHeight: '2.8em'
                     }}>
                  {item.movimento || 'Movimentação do processo'}
                </div>
              </div>
              <button
                className="bg-white text-[#0f1b3e] rounded-lg font-bold py-2 px-4 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1b3e] flex-shrink-0"
                onClick={() => gerarAnaliseIA(item)}
              >
                Ver análise
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProcessoAndamento;