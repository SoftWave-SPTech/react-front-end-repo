import React, { useState, useEffect } from 'react';
import MenuLateralAdvogado from '../components/Menu/MenuLateral';
import BarraTitulo from '../components/Ui/BarraTitulo';
import { Input } from '../components/Ui/Input';
import Botao from '../components/Ui/Botao';
import ModalConfirmacao from '../components/Ui/ModalConfirmacao';
import { api } from '../service/api';

export default function VisualizarProcessos() {
  const [processos, setProcessos] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalConfirma, setModalConfirma] = useState(false);
  const [processoSelecionado, setProcessoSelecionado] = useState(null);
  const [expandido, setExpandido] = useState(null);

  useEffect(() => {
    api.get(`/processos/usuario-id${sessionStorage.getItem('id')}`)
      .then((response) => {
        console.log('Processos recebidos:', response.data);
        setProcessos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar processos:', error);
      });
  }, []);

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0">
        <MenuLateralAdvogado />
      </div>
      <div className="flex-1 p-6 sm:p-8 overflow-auto">
        {/* Barra de pesquisa acima do título */}
        <div className="flex justify-end mb-4">
          <div className="max-w-xl w-full sm:w-96">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {/* Ícone de lupa */}
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <Input
                nome="Buscar por número do processo"
                type="text"
                valor={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
                placeholder="Buscar por número do processo"
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <BarraTitulo>
            Olá, {sessionStorage.getItem('nome')}!
          </BarraTitulo>
          <div className="flex justify-center">
            <BarraTitulo tamanho="medio" largura="medio" cor="claro" className="flex justify-center">
              Visualize seus processos e o respectivo andamento.
            </BarraTitulo>
          </div>
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