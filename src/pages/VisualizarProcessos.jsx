import React, { useState, useEffect } from 'react';
import MenuLateralAdvogado from '../components/Menu/MenuLateral';
import BarraTitulo from '../components/Ui/BarraTitulo';
import {Input} from '../components/Ui/Input';
import Botao from '../components/Ui/Botao';
import ModalConfirmacao from '../components/Ui/ModalConfirmacao';
import { api } from '../service/api';


const processosFake = [
  {
    id: 1,
    numero: '2023.0001',
    cliente: 'João da Silva',
    advogado: 'Dr. Marcos',
    status: 'Em andamento',
    inicio: '10/03/2023',
    classe: 'Ação Civil Pública',
    assunto: 'Danos Morais',
    foro: 'TJSP',
    movimentacao: 'Audiência realizada em 12/04/2023',
  },
  {
    id: 2,
    numero: '2023.0002',
    cliente: 'Maria Oliveira',
    advogado: 'Dra. Paula',
    status: 'Finalizado',
    inicio: '21/01/2023',
    classe: 'Ação Trabalhista',
    assunto: 'Rescisão Contratual',
    foro: 'TRT 2ª Região',
    movimentacao: 'Sentença proferida em 10/05/2023',
  },
  {
    id: 3,
    numero: '2023.0003',
    cliente: 'Maria Oliveira',
    advogado: 'Dra. Paula',
    status: 'Finalizado',
    inicio: '21/01/2023',
    classe: 'Ação Trabalhista',
    assunto: 'Rescisão Contratual',
    foro: 'TRT 2ª Região',
    movimentacao: 'Sentença proferida em 10/05/2023',
  },
  {
    id: 4,
    numero: '2023.0004',
    cliente: 'Maria Oliveira',
    advogado: 'Dra. Paula',
    status: 'Finalizado',
    inicio: '21/01/2023',
    classe: 'Ação Trabalhista',
    assunto: 'Rescisão Contratual',
    foro: 'TRT 2ª Região',
    movimentacao: 'Sentença proferida em 10/05/2023',
  },
  {
    id: 5,
    numero: '2023.0005',
    cliente: 'Maria Oliveira',
    advogado: 'Dra. Paula',
    status: 'Finalizado',
    inicio: '21/01/2023',
    classe: 'Ação Trabalhista',
    assunto: 'Rescisão Contratual',
    foro: 'TRT 2ª Região',
    movimentacao: 'Sentença proferida em 10/05/2023',
  },
  {
    id: 6,
    numero: '2023.0006',
    cliente: 'Maria Oliveira',
    advogado: 'Dra. Paula',
    status: 'Finalizado',
    inicio: '21/01/2023',
    classe: 'Ação Trabalhista',
    assunto: 'Rescisão Contratual',
    foro: 'TRT 2ª Região',
    movimentacao: 'Sentença proferida em 10/05/2023',
  },
  {
    id: 7,
    numero: '2023.0007',
    cliente: 'Maria Oliveira',
    advogado: 'Dra. Paula',
    status: 'Finalizado',
    inicio: '21/01/2023',
    classe: 'Ação Trabalhista',
    assunto: 'Rescisão Contratual',
    foro: 'TRT 2ª Região',
    movimentacao: 'Sentença proferida em 10/05/2023',
  },
  {
    id: 8,
    numero: '2023.0008',
    cliente: 'Maria Oliveira',
    advogado: 'Dra. Paula',
    status: 'Finalizado',
    inicio: '21/01/2023',
    classe: 'Ação Trabalhista',
    assunto: 'Rescisão Contratual',
    foro: 'TRT 2ª Região',
    movimentacao: 'Sentença proferida em 10/05/2023',
  },
  {
    id: 9,
    numero: '2023.0009',
    cliente: 'Maria Oliveira',
    advogado: 'Dra. Paula',
    status: 'Finalizado',
    inicio: '21/01/2023',
    classe: 'Ação Trabalhista',
    assunto: 'Rescisão Contratual',
    foro: 'TRT 2ª Região',
    movimentacao: 'Sentença proferida em 10/05/2023',
  },
  {
    id: 10,
    numero: '2023.00010',
    cliente: 'Maria Oliveira',
    advogado: 'Dra. Paula',
    status: 'Finalizado',
    inicio: '21/01/2023',
    classe: 'Ação Trabalhista',
    assunto: 'Rescisão Contratual',
    foro: 'TRT 2ª Região',
    movimentacao: 'Sentença proferida em 10/05/2023',
  },
  {
    id: 11,
    numero: '2023.00011',
    cliente: 'Maria Oliveira',
    advogado: 'Dra. Paula',
    status: 'Finalizado',
    inicio: '21/01/2023',
    classe: 'Ação Trabalhista',
    assunto: 'Rescisão Contratual',
    foro: 'TRT 2ª Região',
    movimentacao: 'Sentença proferida em 10/05/2023',
  },
  {
    id: 12,
    numero: '2023.00',
    cliente: 'Maria Oliveira',
    advogado: 'Dra. Paula',
    status: 'Finalizado',
    inicio: '21/01/2023',
    classe: 'Ação Trabalhista',
    assunto: 'Rescisão Contratual',
    foro: 'TRT 2ª Região',
    movimentacao: 'Sentença proferida em 10/05/2023',
  }
];

export default function VisualizarProcessos() {
  const [processos, setProcessos] = useState(processosFake);
  const [busca, setBusca] = useState('');
  const [modalConfirma, setModalConfirma] = useState(false);
  const [processoSelecionado, setProcessoSelecionado] = useState(null);
  const [expandido, setExpandido] = useState(null); // novo estado

  const abrirExclusao = (processo) => {
    setProcessoSelecionado(processo);
    setModalConfirma(true);
  };

  const excluirProcesso = () => {
    setProcessos(processos.filter(p => p.id !== processoSelecionado.id));
    setModalConfirma(false);
  };

  const processosFiltrados = processos.filter(p =>
    p.numero.includes(busca) || p.cliente.toLowerCase().includes(busca.toLowerCase())
  );

  const toggleExpandido = (id) => {
    setExpandido(expandido === id ? null : id);
  };

    useEffect(() => {
    api.get('localhost:8080/')
      .then(response => setProcessos(response.data))
      .catch(error => {
        console.error('Erro ao buscar processos:', error);
        setProcessos([]);
      });
  }, []);


  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0">
        <MenuLateralAdvogado />
      </div>

      <div className="flex-1 p-6 sm:p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <BarraTitulo>
            Visualizar Processos
          </BarraTitulo>
        </div>

        <div className="mb-6 max-w-xl">
          <Input
            nome="Buscar por número do processo"
            type="text"
            valor={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white rounded shadow-md">
            <tbody>
              {processosFiltrados.map((p) => (
                <React.Fragment key={p.id}>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpandido(p.id)}
                  >
                    <td className="px-4 py-2 font-semibold mb-4" style={{ paddingBottom: '1rem' }} colSpan={10}>
                      Processo nº {p.numero}
                      <span className="float-right text-gray-400">
                        {expandido === p.id ? '▲' : '▼'}
                      </span>
                    </td>
                  </tr>
                  {expandido === p.id && (
                    <tr className="bg-gray-50 mb-4">
                      <td colSpan={10} className="px-4 py-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          <div><b>Cliente:</b> {p.cliente}</div>
                          <div><b>Advogado:</b> {p.advogado}</div>
                          <div><b>Classe:</b> {p.classe}</div>
                          <div><b>Assunto:</b> {p.assunto}</div>
                          <div><b>Foro:</b> {p.foro}</div>
                          <div><b>Movimentação:</b> {p.movimentacao}</div>
                          <div><b>Status:</b> {p.status}</div>
                          <div><b>Início:</b> {p.inicio}</div>
                        </div>
                        <div className="flex justify-end">
                          <Botao onClick={() => alert(`Visualizar processo ${p.numero}`)}>
                            Visualizar Processo
                          </Botao>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {processosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-500">
                    Nenhum processo encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {modalConfirma && (
          <ModalConfirmacao
            titulo="Excluir Processo"
            mensagem={`Deseja excluir o processo nº ${processoSelecionado?.numero}?`}
            onConfirmar={excluirProcesso}
            onCancelar={() => setModalConfirma(false)}
          />
        )}
      </div>
    </div>
  );
}
