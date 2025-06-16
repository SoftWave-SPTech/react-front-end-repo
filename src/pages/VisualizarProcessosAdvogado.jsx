import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import Botao from '../components/Ui/Botao';
import { PiSealQuestionBold } from 'react-icons/pi';
import BarraTitulo from '../components/Ui/BarraTitulo';

const VisualizarProcessosAdvogado = () => {
  const blocoStyle = {
    background: '#F5F6FA',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    marginBottom: '20px'
  };

  const tituloBlocoStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  return (
    <LayoutBase>
      <div style={{ padding: '20px', fontFamily: 'Segoe UI, sans-serif', color: '#2f2f2f' }}>
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <span className="font-bold text-3xl">VISUALIZAR PROCESSO</span>
 <div style={{ display: 'flex', gap: '10px' }}>
            <Botao tamanho='pequeno'>
              Atualize seu processo
            </Botao>
            <Botao tamanho='pequeno'>
              Documentos do Processo
            </Botao>
          </div>
        </div>

        {/* Conteúdo */}
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Coluna Esquerda */}
          <div style={{ flex: 1 }}>
            {/* Dados Cliente */}
            <div style={{ ...blocoStyle, display: 'flex', gap: '16px' }}>
              <img
                alt="Cliente"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <div style={tituloBlocoStyle}>Dados Cliente</div>
                <p style={{ fontWeight: 'bold' }}>Letícia da Fonseca</p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#555',
                  background: '#e9e9e9',
                  display: 'inline-block',
                  padding: '4px 6px',
                  borderRadius: '4px',
                  marginBottom: '6px'
                }}>Cliente ainda não acessou a plataforma</p>
                <p>leticia.fonseca@sqtech.school</p>
                <p>+55 (11) 90000 - 0000</p>
              </div>
            </div>

            {/* Documentos Cliente */}
            <div style={blocoStyle}>
              <div style={tituloBlocoStyle}>Documentos Cliente</div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px'
              }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
                  <div key={i} style={{
                    background: '#fff',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    padding: '10px',
                    textAlign: 'center'
                  }}>
                    <img alt="PDF" style={{ height: '40px', marginBottom: '6px' }} />
                    <p style={{ fontWeight: 'bold' }}>RG</p>
                    <p style={{ fontSize: '0.75rem' }}>arquivo.pdf</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita */}
          <div style={{ flex: 1 }}>
            {/* Dados Processo */}
            <div style={blocoStyle}>
              <div style={tituloBlocoStyle}>Dados Processo</div>
              <p><strong>Número do processo:</strong> 0001234-56.2024.8.26.0100</p>
              <p><strong>Assunto:</strong> Responsabilidade civil / Danos morais</p>
              <p><strong>Vara:</strong> Foro Central Cível – 12ª Vara Cível de São Paulo/SP</p>
              <p><strong>Segredo de Justiça:</strong> Não</p>
              <p><strong>Instância:</strong> 1ª Instância</p>
              <p><strong>Valor da causa:</strong> R$ 25.000,00</p>
              <p><strong>Justiça Gratuita:</strong> Deferida do autor</p>
              <p><strong>Área:</strong> Cível</p>
            </div>

            {/* Documentos Processo / Advogados */}
            <div style={blocoStyle}>
              <h4 style={{ margin: '10px 0 5px' }}>Advogados Representantes</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li>☑️ Cristhian Lauriano</li>
                <li>☑️ Luana Cruz</li>
                <li>☑️ Bryan Henrique</li>
              </ul>
            </div>

            {/* Linha do Tempo */}
            <div style={{
              ...blocoStyle,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
              {['09-04-2025', '02-04-2025', '01-04-2025', '10-03-2025'].map((data, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <p style={{ marginBottom: '4px' }}>Atualização<br />{data}</p>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#000',
                    borderRadius: '50%',
                    margin: '6px auto'
                  }}></div>
                  <button style={{
                    background: '#0A1F44',
                    color: '#fff',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>Ver análise</button>
                </div>
              ))}
            </div>

            {/* Comentário */}
            <div style={blocoStyle}>
              <div style={tituloBlocoStyle}>Comentário</div>
              <input
                type="text"
                placeholder="Adicione um comentário para o Cliente..."
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginTop: '8px'
                }}
              />
            <Botao tamanho='pequeno'>
              ENVIAR
            </Botao>
            </div>
          </div>
        </div>

        {/* Botão Voltar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <Botao tamanho='pequeno' cores='padrao'>
              VOLTAR
            </Botao>
        </div>
      </div>
    </LayoutBase>
  );
};

export default VisualizarProcessosAdvogado;
