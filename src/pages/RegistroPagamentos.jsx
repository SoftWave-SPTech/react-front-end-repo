import React, { useMemo, useState } from 'react';
import LayoutBase from '../layouts/LayoutBase';
import SelectFiltro from '../components/Ui/SelectFiltro';
import TabelaPagamentos from '../components/Ui/TabelaPagamentos';
import ResumoValores from '../components/Ui/ResumoValores';
import ModalNovoPagamento from '../components/Ui/ModalNovoPagamento';

export default function RegistroPagamentos() {
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

  const [pagamentos, setPagamentos] = useState([
    {
      codigo: 'PG1',
      cliente: 'Cristhian Lauriano',
      processo: '0823478-15.2023.8.26.0100',
      metodo: 'Cartão de Crédito',
      tipo: 'Parcelado',
      parcelas: '2/10',
      valorParcela: 1000,
      valorPago: 1000,
      valorPagar: 9000,
      valorCaso: 4000,
      honorarioSucumbencia: 4000,
      valorProcesso: 4000,
      resultado: null,
      mes: 'Maio',
      ano: '2025',
    },
    {
      codigo: 'PG2',
      cliente: 'Felipe Lauriano',
      processo: '0823478-15.2023.8.26.2105',
      metodo: 'PIX',
      tipo: 'Parcelado',
      parcelas: '2/10',
      valorParcela: 1000,
      valorPago: 1000,
      valorPagar: 9000,
      valorCaso: 4000,
      honorarioSucumbencia: 4000,
      valorProcesso: 4000,
      resultado: null,
      mes: 'Maio',
      ano: '2025',
    },
  ]);

  // modal (criar/editar)
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [modalInitialData, setModalInitialData] = useState(null);

  // mobile: exibir/ocultar filtros
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const mkOptions = (arr) =>
    Array.from(new Set(arr)).filter(Boolean).map((v) => ({ label: v, value: v }));

  const optionsClientes  = useMemo(() => mkOptions(pagamentos.map((p) => p.cliente)),  [pagamentos]);
  const optionsProcessos = useMemo(() => mkOptions(pagamentos.map((p) => p.processo)), [pagamentos]);
  const optionsMetodos   = useMemo(() => mkOptions(pagamentos.map((p) => p.metodo)),   [pagamentos]);
  const optionsTipos     = useMemo(() => mkOptions(pagamentos.map((p) => p.tipo)),     [pagamentos]);
  const optionsMeses     = useMemo(() => mkOptions(pagamentos.map((p) => p.mes)),      [pagamentos]);
  const optionsAnos      = useMemo(() => mkOptions(pagamentos.map((p) => p.ano)),      [pagamentos]);

  const optionsResultado = [
    { label: 'Deferido',   value: 'vitoria' },
    { label: 'Indeferido', value: 'derrota' },
  ];

  // lista filtrada (cliente/processo: contém; demais: igualdade)
  const listaFiltrada = useMemo(() => {
    const strIn = (a = '', b = '') =>
      String(a).toLowerCase().includes(String(b).toLowerCase());

    return pagamentos.filter((p) => {
      if (filtros.cliente && !strIn(p.cliente, filtros.cliente)) return false;   // contém
      if (filtros.processo && !strIn(p.processo, filtros.processo)) return false; // contém
      if (filtros.metodo && p.metodo !== filtros.metodo) return false;
      if (filtros.tipo && p.tipo !== filtros.tipo) return false;
      if (filtros.mes && p.mes !== filtros.mes) return false;
      if (filtros.ano && p.ano !== filtros.ano) return false;
      if (filtros.resultado && p.resultado !== filtros.resultado) return false;
      return true;
    });
  }, [pagamentos, filtros]);

  const totalPago = useMemo(
    () => listaFiltrada.reduce((acc, p) => acc + (p.valorPago || 0), 0),
    [listaFiltrada]
  );
  const totalPagar = useMemo(
    () => listaFiltrada.reduce((acc, p) => acc + (p.valorPagar || 0), 0),
    [listaFiltrada]
  );

  // item selecionado, respeitando a lista filtrada
  const selectedItemCodigo = useMemo(
    () => (selectedIndex != null ? listaFiltrada[selectedIndex]?.codigo : null),
    [selectedIndex, listaFiltrada]
  );
  const selectedItem = useMemo(
    () => pagamentos.find((p) => p.codigo === selectedItemCodigo) || null,
    [pagamentos, selectedItemCodigo]
  );

  // cards do topo (baseados no selecionado)
  const resumoSelecionado = useMemo(() => {
    if (!selectedItem) {
      return { valorCaso: 0, honorarioSucumbencia: 0, valorProcesso: 0, totalReceber: 0 };
    }
    const valorCaso = selectedItem.valorCaso ?? (selectedItem.valorPago || 0) + (selectedItem.valorPagar || 0);
    const honorario = selectedItem.honorarioSucumbencia ?? 0;
    const valorProcesso = selectedItem.valorProcesso ?? valorCaso;
    // "Deferido" == vitoria conta sucumbência
    const totalReceber = (selectedItem.valorPagar || 0) + (selectedItem.resultado === 'vitoria' ? honorario : 0);
    return { valorCaso, honorarioSucumbencia: honorario, valorProcesso, totalReceber };
  }, [selectedItem]);

  // filtros
  const handleFiltroChange = (field) => (e) => {
    setFiltros((prev) => ({ ...prev, [field]: e.target.value }));
    setSelectedIndex(null);
  };

  // abrir criar/editar via botão do cabeçalho da tabela
  const openCreate = () => {
    setModalMode('create');
    setModalInitialData(null);
    setModalAberto(true);
  };
  const openEdit = () => {
    if (!selectedItem) return;
    setModalMode('edit');
    setModalInitialData(selectedItem);
    setModalAberto(true);
  };
  const onPrimaryAction = () => {
    if (selectedItem) openEdit();
    else openCreate();
  };

  // salvar (adicionar ou editar)
  const adicionarOuEditarPagamento = (novoOuEditado) => {
    setPagamentos((prev) => {
      const idx = prev.findIndex((p) => p.codigo === novoOuEditado.codigo);
      if (idx >= 0) {
        const clone = [...prev];
        clone[idx] = { ...clone[idx], ...novoOuEditado };
        return clone;
      }
      return [...prev, novoOuEditado];
    });
  };

  // definir resultado para TODO o mesmo processo
  const setResultadoSelecionado = (resultado) => {
    if (!selectedItem) return;
    const processoAlvo = selectedItem.processo;
    setPagamentos((prev) =>
      prev.map((p) => (p.processo === processoAlvo ? { ...p, resultado } : p))
    );
  };

  return (
    <LayoutBase tipoMenu="cliente">
      <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 w-full text-center">
          REGISTROS DE PAGAMENTOS
        </h1>

        {/* Resumo + Deferido/Indeferido (D/I) */}
        <div className="flex flex-col md:flex-row items-center rounded-lg p-4 sm:p-6 gap-6 md:gap-8 w-full max-w-[1200px] mb-6 bg-[#1B3B8B]">
          <div className="flex gap-3 sm:gap-4">
            {/* D = Deferido => vitoria */}
            <button
              onClick={() => setResultadoSelecionado('vitoria')}
              disabled={!selectedItem}
              className={`w-10 h-10 rounded-full font-bold text-white flex items-center justify-center transition
                ${selectedItem?.resultado === 'vitoria' ? 'bg-green-600 ring-2 ring-white' : 'bg-green-500 opacity-90'}
                ${!selectedItem ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Marcar como deferido"
              title="Marcar como deferido"
            >
              D
            </button>

            {/* I = Indeferido => derrota */}
            <button
              onClick={() => setResultadoSelecionado('derrota')}
              disabled={!selectedItem}
              className={`w-10 h-10 rounded-full font-bold text-white flex items-center justify-center transition
                ${selectedItem?.resultado === 'derrota' ? 'bg-red-600 ring-2 ring-white' : 'bg-red-500 opacity-90'}
                ${!selectedItem ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Marcar como indeferido"
              title="Marcar como indeferido"
            >
              I
            </button>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center">
            <ResumoValores titulo="Valor total do Caso"      valor={resumoSelecionado.valorCaso} />
            <ResumoValores titulo="Honorário de sucumbência" valor={resumoSelecionado.honorarioSucumbencia} />
            <ResumoValores titulo="Valor total do Processo"  valor={resumoSelecionado.valorProcesso} />
            <ResumoValores titulo="Valor Total a Receber"    valor={resumoSelecionado.totalReceber} />
          </div>
        </div>

        {/* Filtros (Cliente/Processo como combobox pesquisável) */}
        <div className="rounded-lg p-4 w-full max-w-[1200px] mb-6 bg-[#1B3B8B]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-white font-bold text-lg">Filtro</span>
            <button
              className="md:hidden text-white/90 text-sm underline"
              onClick={() => setMostrarFiltros((v) => !v)}
            >
              {mostrarFiltros ? 'Ocultar filtros' : 'Mostrar filtros'}
            </button>
          </div>

          <div className={`${mostrarFiltros ? 'grid' : 'hidden'} md:grid mt-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3`}>
            {/* combobox pesquisável */}
            <SelectFiltro
              mode="combobox"
              label="Cliente"
              options={optionsClientes}
              value={filtros.cliente}
              onChange={handleFiltroChange('cliente')}
              placeholder="Digite ou selecione"
            />
            <SelectFiltro
              mode="combobox"
              label="Processo"
              options={optionsProcessos}
              value={filtros.processo}
              onChange={handleFiltroChange('processo')}
              placeholder="Digite ou selecione"
            />

            {/* selects normais */}
            <SelectFiltro label="Método"    options={optionsMetodos}   value={filtros.metodo}    onChange={handleFiltroChange('metodo')}    placeholder="Todos os métodos" />
            <SelectFiltro label="Tipo"      options={optionsTipos}     value={filtros.tipo}      onChange={handleFiltroChange('tipo')}      placeholder="Todos os tipos" />
            <SelectFiltro label="Mês"       options={optionsMeses}     value={filtros.mes}       onChange={handleFiltroChange('mes')}       placeholder="Todos os meses" />
            <SelectFiltro label="Ano"       options={optionsAnos}      value={filtros.ano}       onChange={handleFiltroChange('ano')}       placeholder="Todos os anos" />
            <SelectFiltro label="Resultado" options={optionsResultado} value={filtros.resultado} onChange={handleFiltroChange('resultado')} placeholder="Todos" />
          </div>
        </div>

        {/* Tabela/Lista responsiva com botão (+/lápis) no cabeçalho */}
        <TabelaPagamentos
          pagamentos={listaFiltrada}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          totalPago={totalPago}
          totalPagar={totalPagar}
          hasSelection={selectedIndex != null && listaFiltrada[selectedIndex]}
          onPrimaryAction={() => {
            if (selectedIndex != null && listaFiltrada[selectedIndex]) openEdit();
            else openCreate();
          }}
        />
      </div>

      {/* Modal criar/editar */}
      <ModalNovoPagamento
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onSave={adicionarOuEditarPagamento}
        initialData={modalInitialData}
        mode={modalMode}
      />
    </LayoutBase>
  );
}
