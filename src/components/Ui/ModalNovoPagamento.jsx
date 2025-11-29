import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { api } from '../../service/api';

// ===== Map enums do back para labels =====
const METODOS = [
  { id: 'PIX', label: 'Pix' },
  { id: 'CARTAO_CREDITO', label: 'Cartão de Crédito' },
  { id: 'CARTAO_DEBITO', label: 'Cartão de Débito' },
];

const TIPOS = [
  { id: 'A_VISTA', label: 'À vista' },
  { id: 'PARCELADO', label: 'Parcelado' },
];

const MESES = [
  { id: 'JANEIRO', label: 'Janeiro' },
  { id: 'FEVEREIRO', label: 'Fevereiro' },
  { id: 'MARCO', label: 'Março' },
  { id: 'ABRIL', label: 'Abril' },
  { id: 'MAIO', label: 'Maio' },
  { id: 'JUNHO', label: 'Junho' },
  { id: 'JULHO', label: 'Julho' },
  { id: 'AGOSTO', label: 'Agosto' },
  { id: 'SETEMBRO', label: 'Setembro' },
  { id: 'OUTUBRO', label: 'Outubro' },
  { id: 'NOVEMBRO', label: 'Novembro' },
  { id: 'DEZEMBRO', label: 'Dezembro' },
];

const RANGE = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const currentYear = new Date().getFullYear();
const ANOS = RANGE(currentYear - 5, currentYear + 5);

export default function ModalNovoPagamento({ open, onClose, initialData = null, mode = 'create' }) {
  const [clientes, setClientes] = useState([]);
  const [processos, setProcessos] = useState([]);
  const [form, setForm] = useState({
    cliente: '',
    processo: '',
    metodo: '',
    tipo: '',
    parcelaAtual: 1,
    parcelaTotal: 1,
    valorParcela: '',
    valorPago: '',
    valorPagar: '',
    mes: '',
    ano: currentYear,
    honorarioSucumbencia: 0,
  });
  const [erros, setErros] = useState({});

  // ===== Buscar clientes =====
  useEffect(() => {
    if (!open) return;

    api.get('/usuarios/listar-clientes', {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    })
      .then(res => setClientes(Array.isArray(res.data) ? res.data : res.data.content || []))
      .catch(err => console.error('Erro ao buscar clientes:', err));
  }, [open]);

  // ===== Preencher formulário ao abrir modal =====
  useEffect(() => {
    if (!open) return;

    if (initialData && mode === 'edit') {
      // Busca processos do cliente antes de setar o form
      const fetchProcessos = async () => {
        try {
          const res = await api.get(`/processos/usuario-id/${initialData.clienteId}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
          });
          const processosCliente = res.data || [];
          setProcessos(processosCliente);

          setForm({
            cliente: initialData.clienteId || '',
            processo: initialData.processoId || (processosCliente[0]?.id || ''),
            metodo: initialData.metodo || '',
            tipo: initialData.tipo || '',
            parcelaAtual: initialData.parcelaAtual || 1,
            parcelaTotal: initialData.parcelas || 1,
            valorParcela: initialData.valorParcela ?? '',
            valorPago: initialData.valorPago ?? '',
            valorPagar: initialData.valorPagar ?? '',
            mes: initialData.mes || '',
            ano: initialData.ano || currentYear,
            honorarioSucumbencia: initialData.honorarioSucumbencia || 0,
          });
          setErros({});
        } catch (err) {
          console.error('Erro ao buscar processos do cliente:', err);
        }
      };

      fetchProcessos();
    } else {
      // Modo create ou sem initialData
      setForm({
        cliente: '',
        processo: '',
        metodo: '',
        tipo: '',
        parcelaAtual: 1,
        parcelaTotal: 1,
        valorParcela: '',
        valorPago: '',
        valorPagar: '',
        mes: '',
        ano: currentYear,
        honorarioSucumbencia: 0,
      });
      setProcessos([]);
      setErros({});
    }
  }, [open, initialData, mode]);

  // ===== Buscar processos quando cliente mudar (modo create ou troca de cliente) =====
  useEffect(() => {
    if (!form.cliente) {
      setProcessos([]);
      setForm(prev => ({ ...prev, processo: '' }));
      return;
    }

    // Não sobrescrever processo se estiver no modo edit e initialData já foi carregada
    if (mode === 'edit' && initialData && form.cliente === initialData.clienteId) return;

    api.get(`/processos/usuario-id/${form.cliente}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    })
      .then(res => setProcessos(res.data || []))
      .catch(err => {
        console.error('Erro ao buscar processos:', err);
        setProcessos([]);
      });
  }, [form.cliente, mode, initialData]);

  // ===== Reset parcelas se tipo mudar para À vista =====
  useEffect(() => {
    if (form.tipo === 'A_VISTA') {
      setForm(prev => ({ ...prev, parcelaAtual: 1, parcelaTotal: 1, valorParcela: '' }));
    }
  }, [form.tipo]);

  const handleChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  const handleCurrencyChange = (field) => ({ value }) => setForm(prev => ({ ...prev, [field]: value }));

  const validar = () => {
    const e = {};
    if (!form.cliente) e.cliente = 'Informe o cliente';
    if (!form.processo) e.processo = 'Informe o processo';
    if (!form.metodo) e.metodo = 'Informe o método';
    if (!form.tipo) e.tipo = 'Informe o tipo';
    if (!form.mes) e.mes = 'Informe o mês';
    if (!form.ano) e.ano = 'Informe o ano';
    if (form.tipo === 'PARCELADO' && !form.valorParcela) e.valorParcela = 'Informe o valor da parcela';
    if (!form.valorPago) e.valorPago = 'Informe o valor pago';
    if (!form.valorPagar) e.valorPagar = 'Informe o valor a pagar';
    if (form.tipo === 'PARCELADO' && Number(form.parcelaAtual) > Number(form.parcelaTotal)) {
      e.parcelaAtual = 'Parcela atual não pode exceder o total';
    }
    setErros(e);
    return Object.keys(e).length === 0;
  };

  // ===== Submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    const payload = {
      cliente: Number(form.cliente),
      processo: Number(form.processo),
      metodoPagamento: form.metodo,
      tipoPagamento: form.tipo,
      parcelaAtual: Number(form.parcelaAtual),
      totalParcelas: Number(form.parcelaTotal),
      valorParcela: Number(form.valorParcela || 0),
      valorPago: Number(form.valorPago || 0),
      valorPagar: Number(form.valorPagar || 0),
      mes: form.mes,
      ano: Number(form.ano),
      honorarioSucumbencia: Number(form.honorarioSucumbencia || 0),
    };

    try {
      if (mode === 'edit' && initialData?.id) {
        await api.put(`/registros-financeiros/${initialData.id}`, payload, {
          params: { cliente: payload.cliente, processo: payload.processo },
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
      } else {
        await api.post('/registros-financeiros', payload, {
          params: { cliente: payload.cliente, processo: payload.processo },
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
      }

      // ✅ Força recarregar toda a página
      window.location.reload();
    } catch (err) {
      console.error('Erro ao salvar registro financeiro:', err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg sm:text-xl font-bold mb-4">
          {mode === 'edit' ? 'Editar Pagamento' : 'Novo Pagamento'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cliente */}
          <div>
            <label className="block text-sm font-medium">Cliente</label>
            <select value={form.cliente} onChange={handleChange('cliente')} className="border rounded w-full px-3 py-2">
              <option value="">Selecione...</option>
              {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
            {erros.cliente && <p className="text-red-500 text-xs">{erros.cliente}</p>}
          </div>

          {/* Processo */}
          <div>
            <label className="block text-sm font-medium">Processo</label>
            <select value={form.processo} onChange={handleChange('processo')} className="border rounded w-full px-3 py-2" disabled={!form.cliente}>
              <option value="">Selecione...</option>
              {processos.map(p => <option key={p.id} value={p.id}>{p.numeroProcesso}</option>)}
            </select>
            {erros.processo && <p className="text-red-500 text-xs">{erros.processo}</p>}
          </div>

          {/* Método */}
          <div>
            <label className="block text-sm font-medium">Método</label>
            <select value={form.metodo} onChange={handleChange('metodo')} className="border rounded w-full px-3 py-2">
              <option value="">Selecione...</option>
              {METODOS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
            {erros.metodo && <p className="text-red-500 text-xs">{erros.metodo}</p>}
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium">Tipo</label>
            <select value={form.tipo} onChange={handleChange('tipo')} className="border rounded w-full px-3 py-2">
              <option value="">Selecione...</option>
              {TIPOS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
            {erros.tipo && <p className="text-red-500 text-xs">{erros.tipo}</p>}
          </div>

          {/* Parcelas */}
          {form.tipo === 'PARCELADO' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Parcela Atual</label>
                <select value={form.parcelaAtual} onChange={handleChange('parcelaAtual')} className="border rounded w-full px-3 py-2">
                  {RANGE(1, 60).map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                {erros.parcelaAtual && <p className="text-red-500 text-xs">{erros.parcelaAtual}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Total de Parcelas</label>
                <select value={form.parcelaTotal} onChange={handleChange('parcelaTotal')} className="border rounded w-full px-3 py-2">
                  {RANGE(1, 60).map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Valores */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {form.tipo === 'PARCELADO' && (
              <div>
                <label className="block text-sm font-medium">Valor da Parcela</label>
                <NumericFormat value={form.valorParcela} onValueChange={handleCurrencyChange('valorParcela')} thousandSeparator="." decimalSeparator="," prefix="R$ " className="border rounded w-full px-3 py-2" />
                {erros.valorParcela && <p className="text-red-500 text-xs">{erros.valorParcela}</p>}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium">Valor Pago</label>
              <NumericFormat value={form.valorPago} onValueChange={handleCurrencyChange('valorPago')} thousandSeparator="." decimalSeparator="," prefix="R$ " className="border rounded w-full px-3 py-2" />
              {erros.valorPago && <p className="text-red-500 text-xs">{erros.valorPago}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Valor a Pagar</label>
              <NumericFormat value={form.valorPagar} onValueChange={handleCurrencyChange('valorPagar')} thousandSeparator="." decimalSeparator="," prefix="R$ " className="border rounded w-full px-3 py-2" />
              {erros.valorPagar && <p className="text-red-500 text-xs">{erros.valorPagar}</p>}
            </div>
          </div>

          {/* Mês e Ano */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Mês</label>
              <select value={form.mes} onChange={handleChange('mes')} className="border rounded w-full px-3 py-2">
                <option value="">Selecione...</option>
                {MESES.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
              {erros.mes && <p className="text-red-500 text-xs">{erros.mes}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Ano</label>
              <select value={form.ano} onChange={handleChange('ano')} className="border rounded w-full px-3 py-2">
                {ANOS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              {erros.ano && <p className="text-red-500 text-xs">{erros.ano}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-AzulEscuro text-AzulEscuro hover:bg-AzulClaro hover:bg-azulClaro hover:text-dourado transition-colors duration-200 ">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-AzulEscuro text-white hover:bg-azulClaro hover:text-dourado">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
