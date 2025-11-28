import React, { useEffect, useState, useMemo } from 'react';
import LayoutBase from '../layouts/LayoutBase';
import SelectFiltro from '../components/Ui/SelectFiltro';
import TabelaPagamentos from '../components/Ui/TabelaPagamentos';
import ResumoValores from '../components/Ui/ResumoValores';
import ModalNovoPagamento from '../components/Ui/ModalNovoPagamento';
import BarraTitulo from '../components/Ui/BarraTitulo';
import { api } from '../service/api';

export default function RegistroPagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [processos, setProcessos] = useState([]);
  const [filtros, setFiltros] = useState({
    cliente: '',
    processo: '',
    metodo: '',
    tipo: '',
    mes: '',
    ano: '',
    resultado: '',
  });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [modalInitialData, setModalInitialData] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const fetchPagamentos = async () => {
    try {
      const res = await api.get('/registros-financeiros', {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });

      const dadosFormatados = res.data.map((item) => ({
        id: item.id,
        codigo: item.id,
        cliente: item.clienteNome,
        processo: item.processoNumero,
        metodo: item.metodoPagamento,
        tipo: item.tipoPagamento,
        parcelas: item.totalParcelas,
        valorParcela: item.valorParcela,
        valorPago: item.valorPago,
        valorPagar: item.valorPagar,
        mes: item.mes,
        ano: item.ano,
        resultado:
          item.statusFinanceiro?.toUpperCase() === 'DEFERIDO'
            ? 'vitoria'
            : item.statusFinanceiro?.toUpperCase() === 'INDEFERIDO'
              ? 'derrota'
              : item.statusFinanceiro,
        status: item.statusFinanceiro,
        honorarioSucumbencia: item.honorarioSucumbencia,
      }));

      setPagamentos(dadosFormatados);
    } catch (err) {
      console.error('Erro ao buscar registros financeiros:', err);
    }
  };

  useEffect(() => { fetchPagamentos(); }, []);

  useEffect(() => {
    const fetchClientesComProcessos = async () => {
      try {
        const res = await api.get('/clientes/com-processos', {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });

        const clientesData = Array.isArray(res.data) ? res.data : res.data.content || [];
        setClientes(clientesData);

        const processosExtraidos = clientesData.flatMap((c) => c.processos || []);
        const processosUnicos = Array.from(new Map(processosExtraidos.map((p) => [p.id, p])).values());
        setProcessos(processosUnicos);
      } catch (err) {
        console.error('Erro ao buscar clientes com processos:', err);
      }
    };

    fetchClientesComProcessos();
  }, []);

  const mkOptions = (arr, labelKey = 'label', valueKey = 'value') =>
    Array.from(new Set(arr))
      .filter(Boolean)
      .map((v) =>
        typeof v === 'string' ? { label: v, value: v } : { label: v[labelKey], value: v[valueKey] }
      );

  const optionsClientes = useMemo(() => mkOptions(clientes, 'nome', 'id'), [clientes]);
  const optionsProcessos = useMemo(() => mkOptions(processos, 'numero', 'id'), [processos]);
  const optionsMetodos = useMemo(() => mkOptions(pagamentos.map((p) => p.metodo)), [pagamentos]);
  const optionsTipos = useMemo(() => mkOptions(pagamentos.map((p) => p.tipo)), [pagamentos]);
  const optionsMeses = useMemo(() => mkOptions(pagamentos.map((p) => p.mes)), [pagamentos]);
  const optionsAnos = useMemo(() => mkOptions(pagamentos.map((p) => p.ano)), [pagamentos]);
  const optionsResultado = [{ label: 'Deferido', value: 'vitoria' }, { label: 'Indeferido', value: 'derrota' }];

  const listaFiltrada = useMemo(() => {
    const strIn = (a = '', b = '') => String(a).toLowerCase().includes(String(b).toLowerCase());
    return pagamentos.filter((p) => {
      if (filtros.cliente && !strIn(p.cliente, filtros.cliente)) return false;
      if (filtros.processo && !strIn(p.processo, filtros.processo)) return false;
      if (filtros.metodo && p.metodo !== filtros.metodo) return false;
      if (filtros.tipo && p.tipo !== filtros.tipo) return false;
      if (filtros.mes && p.mes !== filtros.mes) return false;
      if (filtros.ano && p.ano !== filtros.ano) return false;
      if (filtros.resultado && p.resultado !== filtros.resultado) return false;
      return true;
    });
  }, [pagamentos, filtros]);

  const totalPago = useMemo(() => listaFiltrada.reduce((acc, p) => acc + (p.valorPago || 0), 0), [listaFiltrada]);
  const totalPagar = useMemo(() => listaFiltrada.reduce((acc, p) => acc + (p.valorPagar || 0), 0), [listaFiltrada]);
  const selectedItemCodigo = useMemo(() => (selectedIndex != null ? listaFiltrada[selectedIndex]?.codigo : null), [selectedIndex, listaFiltrada]);
  const selectedItem = useMemo(() => pagamentos.find((p) => p.codigo === selectedItemCodigo) || null, [pagamentos, selectedItemCodigo]);

  const resumoSelecionado = useMemo(() => {
    if (!selectedItem) return { valorCaso: 0, honorarioSucumbencia: 0, valorProcesso: 0, totalReceber: 0 };
    const valorCaso = (selectedItem.valorPago || 0) + (selectedItem.valorPagar || 0);
    const honorarioPercent = selectedItem.honorarioSucumbencia ?? 0;
    const honorario = valorCaso * honorarioPercent;
    const valorProcesso = valorCaso;
    const totalReceber = (selectedItem.valorPagar || 0) + (selectedItem.resultado === 'vitoria' ? honorario : 0);
    return { valorCaso, honorarioSucumbencia: honorario, valorProcesso, totalReceber };
  }, [selectedItem]);

  const handleFiltroChange = (field) => (e) => { setFiltros((prev) => ({ ...prev, [field]: e.target.value })); setSelectedIndex(null); };

  const openCreate = () => { setModalMode('create'); setModalInitialData(null); setModalAberto(true); };
  const openEdit = () => {
    if (!selectedItem) return;
    const initialData = {
      ...selectedItem,
      clienteId: clientes.find((c) => c.nome === selectedItem.cliente)?.id || null,
      processoId: processos.find((p) => p.numero === selectedItem.processo)?.id || null,
    };
    setModalMode('edit'); setModalInitialData(initialData); setModalAberto(true);
  };

  // 🔴 FORÇANDO RELOAD TOTAL
  const handleSave = async (dados) => {
    try {
      if (modalMode === 'create') {
        await api.post('/registros-financeiros', dados, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
      } else if (modalMode === 'edit') {
        await api.put(`/registros-financeiros/${dados.id}`, dados, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
      }
      // 🔴 FECHAR MODAL E RELOAD TOTAL
      setModalAberto(false);
      window.location.reload(); // força recarregar a tela inteira
    } catch (err) { console.error('Erro ao salvar pagamento:', err); }
  };

  const setResultadoSelecionado = (resultado) => {
    if (!selectedItem) return;
    const registroAlvo = selectedItem.id;
    setPagamentos((prev) => prev.map((p) => (p.id === registroAlvo ? { ...p, resultado } : p)));
    api.put('/registros-financeiros/status', null, {
      params: { id: registroAlvo, status: resultado === 'vitoria' ? 'DEFERIDO' : 'INDEFERIDO' },
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    }).catch((err) => console.error('Erro ao atualizar status financeiro:', err));
  };

  const clearSelection = () => { setSelectedIndex(null); setModalMode('create'); setModalInitialData(null); };

  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <div className="w-full min-h-screen px-[5%] flex flex-col items-center justify-start">
        <BarraTitulo className="mb-6 text-lg sm:text-xl md:text-2xl">Registros de Pagamentos</BarraTitulo>

        {/* Resumo + Deferido/Indeferido */}
        <div className="flex flex-col md:flex-row items-center rounded-lg p-6 gap-6 md:gap-8 w-full max-w-[75rem] mb-6 bg-AzulEscuro">
          <div className="flex gap-4">
            <button onClick={() => setResultadoSelecionado('vitoria')} disabled={!selectedItem} className={`w-10 h-10 rounded-full font-bold text-white flex items-center justify-center transition ${selectedItem?.resultado === 'vitoria' ? 'bg-green-600 ring-2 ring-white' : 'bg-green-500 opacity-90'} ${!selectedItem ? 'opacity-50 cursor-not-allowed' : ''}`}>D</button>
            <button onClick={() => setResultadoSelecionado('derrota')} disabled={!selectedItem} className={`w-10 h-10 rounded-full font-bold text-white flex items-center justify-center transition ${selectedItem?.resultado === 'derrota' ? 'bg-red-600 ring-2 ring-white' : 'bg-red-500 opacity-90'} ${!selectedItem ? 'opacity-50 cursor-not-allowed' : ''}`}>I</button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            <ResumoValores titulo="Valor total do Caso" valor={resumoSelecionado.valorCaso} />
            <ResumoValores titulo="Honorário de sucumbência" valor={resumoSelecionado.honorarioSucumbencia} />
            <ResumoValores titulo="Valor total do Processo" valor={resumoSelecionado.valorProcesso} />
            <ResumoValores titulo="Valor Total a Receber" valor={resumoSelecionado.totalReceber} />
          </div>
        </div>

        {/* Filtros */}
        <div className="rounded-lg p-6 w-full max-w-[75rem] mb-6 bg-AzulEscuro">
          <div className="flex items-center justify-between gap-4">
            <span className="text-white font-bold text-lg">Filtro</span>
            <button className="md:hidden text-white/90 text-sm underline" onClick={() => setMostrarFiltros((v) => !v)}>
              {mostrarFiltros ? 'Ocultar filtros' : 'Mostrar filtros'}
            </button>
          </div>

          <div className={`${mostrarFiltros ? 'grid' : 'hidden'} md:grid mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
            <SelectFiltro mode="combobox" label="Cliente" options={optionsClientes} value={filtros.cliente} onChange={handleFiltroChange('cliente')} placeholder="Digite ou selecione" />
            <SelectFiltro mode="combobox" label="Processo" options={optionsProcessos} value={filtros.processo} onChange={handleFiltroChange('processo')} placeholder="Digite ou selecione" />
            <SelectFiltro label="Método" options={optionsMetodos} value={filtros.metodo} onChange={handleFiltroChange('metodo')} placeholder="Todos os métodos" />
            <SelectFiltro label="Tipo" options={optionsTipos} value={filtros.tipo} onChange={handleFiltroChange('tipo')} placeholder="Todos os tipos" />
            <SelectFiltro label="Mês" options={optionsMeses} value={filtros.mes} onChange={handleFiltroChange('mes')} placeholder="Todos os meses" />
            <SelectFiltro label="Ano" options={optionsAnos} value={filtros.ano} onChange={handleFiltroChange('ano')} placeholder="Todos os anos" />
            <SelectFiltro label="Resultado" options={optionsResultado} value={filtros.resultado} onChange={handleFiltroChange('resultado')} placeholder="Todos" />
          </div>
        </div>

        <div className="w-full max-w-[75rem] mb-6 flex justify-start">
          <button onClick={openCreate} className="bg-AzulEscuro text-white px-4 py-2 rounded hover:bg-azulClaro hover:text-dourado">Novo Pagamento</button>
        </div>

        <div className="w-full max-w-[75rem] mb-2">
          <TabelaPagamentos pagamentos={listaFiltrada} selectedIndex={selectedIndex} onSelect={setSelectedIndex} totalPago={totalPago} totalPagar={totalPagar} hasSelection={selectedIndex != null && listaFiltrada[selectedIndex]} onPrimaryAction={openEdit} />
        </div>
      </div>

      <ModalNovoPagamento open={modalAberto} onClose={() => setModalAberto(false)} onSave={handleSave} initialData={modalInitialData} mode={modalMode} clientes={optionsClientes} processos={optionsProcessos} />
    </LayoutBase>
  );
}
