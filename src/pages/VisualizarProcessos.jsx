import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuLateralAdvogado from '../components/Menu/MenuLateral';
import BarraTitulo from '../components/Ui/BarraTitulo';
import { Input } from '../components/Ui/Input';
import Botao from '../components/Ui/Botao';
import ModalConfirmacao from '../components/Ui/ModalConfirmacao';
import { api } from '../service/api';
import { FiSearch } from 'react-icons/fi';
import LayoutBase from '../layouts/LayoutBase';
import AlertStyle from '../components/Ui/AlertStyle';

export default function VisualizarProcessos() {
  const [processos, setProcessos] = useState([]);
  const [processoDaVez, setProcessoDaVez] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalConfirma, setModalConfirma] = useState(false);
  const [processoSelecionado, setProcessoSelecionado] = useState(null);
  const [expandido, setExpandido] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/processos/usuario-id/${sessionStorage.getItem('id')}`)
      .then((response) => {
        console.log('Processos recebidos:', response.data);
        setProcessos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar processos:', error.status);
        if(error.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: error.response.data.message, type: "error" })
          }
      });
  }, []);

  // const abrirExclusao = (processo) => {
  //   setProcessoSelecionado(processo);
  //   setModalConfirma(true);
  // };

  // const excluirProcesso = () => {
  //   setProcessos(processos.filter(p => p.id !== processoSelecionado.id));
  //   setModalConfirma(false);
  // };

  // const processosFiltrados = processos.filter(p =>
  //   p.numero.includes(busca) || p.cliente.toLowerCase().includes(busca.toLowerCase())
  // );

  const toggleExpandido = (id) => {
    setExpandido(expandido === id ? null : id);

    api.get(`/processos/visualizar-processo/${id}`)
      .then((response) => {
        console.log('Processos recebidos:', response.data);
        setProcessoDaVez(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar processos:', error.status);
        if(error.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: error.response.data.message, type: "error" })
          }
      });
  };

  function transferirPageProcessoCliente(){

  }

  return (
  <LayoutBase backgroundClass="bg-cinzaAzulado">
      <div className="flex-1 sm:p-8 overflow-auto">
        {/* Barra de pesquisa acima do título */}

        {alert && (
                <AlertStyle
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}


        <div className="flex justify-end mb-4">
          <div className="max-w-xl w-full sm:w-96">
            <div className="relative">
              <div className='flex items-center flex-row gap-2'>
              <Input
                nome="Buscar por número do processo"
                type="text"
                valor={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
                placeholder="Buscar por número do processo"
                />
                <div className='cursor-pointer bg-azulEscuroForte w-12 h-11 flex items-center rounded-r-md justify-center'>
                  <FiSearch className="w-7 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <BarraTitulo>
            Olá, {sessionStorage.getItem("nome")}!
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
              {processos.map((p) => (
                <React.Fragment key={p.id}>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpandido(p.id)}
                  >
                    <td className="px-4 py-2 font-semibold mb-4" style={{ paddingBottom: '1rem' }} colSpan={10}>
                      Processo nº {p.numeroProcesso}
                      <span className="float-right text-gray-400">
                        {expandido === p.id ? '▲' : '▼'}
                      </span>
                    </td>
                  </tr>
                  {expandido === p.id && (
                    <tr className="bg-gray-50 mb-4">
                      <td colSpan={10} className="px-4 py-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          {processoDaVez.advogados?.map((nome, index) => (
                            <div key={index}><b>Advogado:</b> {nome}</div>
                          ))}
                          <div><b>Área:</b> {processoDaVez.area}</div>
                          <div><b>Assunto:</b> {processoDaVez.assunto}</div>
                          <div><b>Foro:</b> {processoDaVez.foro}</div>
                          <div><b>Juiz:</b> {processoDaVez.juiz}</div>
                          <div><b>Valor Ação:</b> {processoDaVez.valorAcao}</div>
                          <div><b>Vara:</b> {processoDaVez.vara}</div>
                        </div>
                        <div className="flex justify-end">
                          <Botao tamanho='medio' largura='pequeno' onClick={() => navigate(`/area-cliente/processo/${p.id}`)}>
                            Visualizar Processo
                          </Botao>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {processos.length === 0 && (
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
  </LayoutBase>
  );
}