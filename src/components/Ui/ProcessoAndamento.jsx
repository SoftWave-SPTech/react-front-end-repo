import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import ModalAguardando from './ModalAguardando';

const ProcessoAndamento = ({ andamentos = [], processoId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  if (!andamentos || andamentos.length === 0) {
    return (
      <div style={{
        background: '#172042',
        color: '#bfc8e2',
        borderRadius: '8px',
        padding: '10px 16px',
        fontSize: '1rem',
        marginTop: '8px'
      }}>
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
      .catch(() => {
        console.error("Erro ao gerar análise IA");
        setLoading(false);
        navigate(`/analise-ia/${processoId}/${item.id}`)
      });
  }

  return (
    <div className="timeline-horizontal-container">
      <ModalAguardando loadingEnd={!loading} />
      <ul className="timeline-horizontal">
        {andamentos.map((item, idx) => (
          <li key={item.id || idx} className="timeline-horizontal-item">
            <div className="timeline-horizontal-date">{item.data}</div>
            <div className="timeline-horizontal-icon">
              <span
                style={{
                  display: 'inline-block',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'white',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div className="timeline-horizontal-status">
              <button
                className="timeline-horizontal-btn bg-[#0f1b3e] text-white rounded-lg font-bold py-2 px-4 transition-colors duration-200 hover:bg-[#20294a] hover:text-[#d4b063] focus:outline-none focus:ring-2 focus:ring-[#d4b063] focus:ring-offset-2"
                onClick={() => gerarAnaliseIA(item)}
                style={{ minWidth: '120px' }}
              >
                Ver análise
              </button>
            </div>
            {idx < andamentos.length - 1 && (
              <div className="timeline-horizontal-line" />
            )}
          </li>
        ))}
      </ul>
      <style>{`
        .timeline-horizontal-container {
          overflow-x: auto;
          padding: 24px 0;
        }
        .timeline-horizontal {
          display: flex;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .timeline-horizontal-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 120px;
          position: relative;
        }
        .timeline-horizontal-date {
          font-size: 0.95rem;
          margin-bottom: 8px;
          color: white;
        }
        .timeline-horizontal-icon {
          margin-bottom: 8px;
        }
        .timeline-horizontal-status {
          margin-top: 8px;
        }
        .timeline-horizontal-btn {
          background: #0f1b3e;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 12px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s;
        }

        .timeline-horizontal-btn:hover {
          background: #3451a3;
        }
        .timeline-horizontal-line {
          position: absolute;
          top: 50%;
          right: -60px;
          width: 120px;
          height: 4px;
          background: white;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export default ProcessoAndamento;