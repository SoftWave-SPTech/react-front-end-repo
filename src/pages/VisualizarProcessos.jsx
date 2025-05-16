import React, { useState } from 'react';
import MenuLateralAdvogado from '../components/Menu/MenuLateralAdvogado';
import BarraTitulo from '../components/Ui/BarraTitulo';
import Input from '../components/Ui/Input';
import Botao from '../components/Ui/Botao';
import ModalConfirmacao from '../components/Ui/ModalConfirmacao';

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
];

export default function VisualizarProcessos() {
  const [processos, setProcessos] = useState(processosFake);
  const [busca, setBusca] = useState('');
  const [modalConfirma, setModalConfirma] = useState(false);
  const [processoSelecionado, setProcessoSelecionado] = useState(null);

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* menu com largura fixa */}
      <div className="w-64 flex-shrink-0">
        <MenuLateralAdvogado />
      </div>

      <div className="flex-1 p-6 sm:p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <BarraTitulo>
            <span className="font-semibold">Olá cliente</span> - Visualizar Processos
          </BarraTitulo>
        </div>

        <div className="mb-6 max-w-xl">
          <Input
            nome="Buscar por número ou cliente"
            type="text"
            valor={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white rounded shadow-md">
            <thead className="bg-azulEscuroForte text-white">
              <tr>
                <th className="px-4 py-2">Nº Processo</th>
                <th className="px-4 py-2">Cliente</th>
                <th className="px-4 py-2">Advogado</th>
                <th className="px-4 py-2">Classe</th>
                <th className="px-4 py-2">Assunto</th>
                <th className="px-4 py-2">Foro</th>
                <th className="px-4 py-2">Movimentação</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Início</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {processosFiltrados.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{p.numero}</td>
                  <td className="px-4 py-2">{p.cliente}</td>
                  <td className="px-4 py-2">{p.advogado}</td>
                  <td className="px-4 py-2">{p.classe}</td>
                  <td className="px-4 py-2">{p.assunto}</td>
                  <td className="px-4 py-2">{p.foro}</td>
                  <td className="px-4 py-2">{p.movimentacao}</td>
                  <td className="px-4 py-2">{p.status}</td>
                  <td className="px-4 py-2">{p.inicio}</td>
                  <td className="px-4 py-2 flex flex-col gap-1 sm:flex-row">
                    <Botao
                      tamanho="pequeno"
                      cor="padrao"
                      onClick={() => alert(`Visualizar ${p.numero}`)}
                    >
                      Ver
                    </Botao>
                    <Botao
                      tamanho="pequeno"
                      cor="contornoAzul"
                      onClick={() => abrirExclusao(p)}
                    >
                      Excluir
                    </Botao>
                  </td>
                </tr>
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
