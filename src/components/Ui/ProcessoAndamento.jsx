import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { api, apiGemini } from '../../service/api';
import ModalAguardando from './ModalAguardando';
import AlertStyle from '../Ui/AlertStyle';

const ProcessoAndamento = ({ andamentos = [], processoId, filtro = '' }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

  // Função para formatar data no formato DD/MM/YYYY com barras
  const formatarData = (data) => {
    if (!data) return '';
    
    // Se já está no formato DD/MM/YYYY, retorna como está
    if (typeof data === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
      return data;
    }
    
    // Se é um objeto Date
    if (data instanceof Date) {
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }
    
    // Converte para string e trata diferentes formatos
    let dataStr = String(data).trim();
    
    // Substitui vírgulas por barras
    dataStr = dataStr.replace(/,/g, '/');
    
    // Se está no formato YYYY-MM-DD (ISO), converte para DD/MM/YYYY
    if (/^\d{4}-\d{2}-\d{2}/.test(dataStr)) {
      const partes = dataStr.split('T')[0].split('-');
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`;
    }
    
    // Se está no formato com barras ou hífens, tenta extrair as partes
    const match = dataStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (match) {
      const [, parte1, parte2, ano] = match;
      // Se a primeira parte é maior que 12, assume que é dia (DD/MM/YYYY)
      if (parseInt(parte1) > 12) {
        return `${parte1.padStart(2, '0')}/${parte2.padStart(2, '0')}/${ano}`;
      } 
      // Se a segunda parte é maior que 12, assume MM/DD/YYYY e inverte
      else if (parseInt(parte2) > 12) {
        return `${parte2.padStart(2, '0')}/${parte1.padStart(2, '0')}/${ano}`;
      }
      // Caso contrário, assume que já está no formato correto ou tenta inferir
      // Por padrão, assume DD/MM/YYYY
      return `${parte1.padStart(2, '0')}/${parte2.padStart(2, '0')}/${ano}`;
    }
    
    // Se não conseguiu formatar, retorna a string original (substituindo vírgulas por barras)
    return dataStr;
  };

  const andamentosFiltrados = andamentos.filter(item => {
    if (!filtro.trim()) return true;
    
    const filtroLower = filtro.toLowerCase();
    const dataFormatada = formatarData(item.data);
    const data = typeof dataFormatada === 'string' ? dataFormatada.toLowerCase() : '';
    const movimento = (item.movimento || '').toLowerCase();
    
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
    apiGemini.post(`/analise-processo/${item.id}`)
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
            <div key={item.id || idx} className="bg-[#0f1b3e] text-white rounded-lg p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1 sm:mr-3">
                <div className="text-sm font-medium mb-1">
                  {formatarData(item.data)}
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
                className="bg-white text-[#0f1b3e] rounded-lg font-bold py-2 px-4 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1b3e] flex-shrink-0 w-full sm:w-auto text-center"
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