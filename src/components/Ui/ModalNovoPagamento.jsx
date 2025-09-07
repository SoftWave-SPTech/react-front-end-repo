import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import axios from 'axios';

const METODOS = [
  { id: 1, label: 'Cartão de Crédito' },
  { id: 2, label: 'Boleto' },
  { id: 3, label: 'Pix' },
  { id: 4, label: 'Transferência' },
  { id: 5, label: 'Dinheiro' },
];

const TIPOS = [
  { id: 1, label: 'À vista' },
  { id: 2, label: 'Parcelado' },
];

const MESES = [
  { id: 1, label: 'Janeiro' },
  { id: 2, label: 'Fevereiro' },
  { id: 3, label: 'Março' },
  { id: 4, label: 'Abril' },
  { id: 5, label: 'Maio' },
  { id: 6, label: 'Junho' },
  { id: 7, label: 'Julho' },
  { id: 8, label: 'Agosto' },
  { id: 9, label: 'Setembro' },
  { id: 10, label: 'Outubro' },
  { id: 11, label: 'Novembro' },
  { id: 12, label: 'Dezembro' },
];

const RANGE = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const currentYear = new Date().getFullYear();
const ANOS = RANGE(currentYear - 5, currentYear + 5);

export default function ModalNovoPagamento({ open, onClose, onSave, initialData = null, mode = 'create' }) {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    cliente: '',
    processo: initialData?.processoId || '',
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

  // Buscar clientes
  useEffect(() => {
    if (!open) return;

    axios.get('/clientes')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setClientes(data);
      })
      .catch(err => console.error('Erro ao buscar clientes:', err));
  }, [open]);

  // Preencher formulário ao abrir modal
  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setForm(prev => ({
        ...prev,
        cliente: initialData.clienteId || '',
        processo: initialData.processoId || '',
        metodo: METODOS.find(m => m.label.toUpperCase() === (initialData.metodo ?? '').toUpperCase())?.id || '',
        tipo: TIPOS.find(t => t.label.toUpperCase() === (initialData.tipo ?? '').toUpperCase())?.id || '',
        parcelaAtual: initialData.parcelaAtual || 1,
        parcelaTotal: initialData.parcelas || 1,
        valorParcela: initialData.valorParcela ?? '',
        valorPago: initialData.valorPago ?? '',
        valorPagar: initialData.valorPagar ?? '',
        mes: MESES.find(m => m.label.toUpperCase() === (initialData.mes ?? '').toUpperCase())?.id || '',
        ano: initialData.ano || currentYear,
        honorarioSucumbencia: initialData.honorarioSucumbencia || 0,
      }));
      setErros({});
    } else {
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
      setErros({});
    }
  }, [open, initialData]);

  // Reset parcelas se tipo mudar para À vista
  useEffect(() => {
    if (form.tipo === 1) {
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
    if (form.tipo === 2 && !form.valorParcela) e.valorParcela = 'Informe o valor da parcela';
    if (!form.valorPago) e.valorPago = 'Informe o valor pago';
    if (!form.valorPagar) e.valorPagar = 'Informe o valor a pagar';
    if (form.tipo === 2 && Number(form.parcelaAtual) > Number(form.parcelaTotal)) {
      e.parcelaAtual = 'Parcela atual não pode exceder o total';
    }
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const payload = {
      id: initialData?.id,
      cliente_id: Number(form.cliente),
      processo_id: Number(form.processo),
      metodo_pagamento: Number(form.metodo),
      tipo_pagamento: Number(form.tipo),
      parcela_atual: Number(form.parcelaAtual),
      total_parcelas: Number(form.parcelaTotal),
      valor_parcela: Number(form.valorParcela || 0),
      valor_pago: Number(form.valorPago || 0),
      valor_pagar: Number(form.valorPagar || 0),
      mes: Number(form.mes),
      ano: Number(form.ano),
      honorario_sucumbencia: Number(form.honorarioSucumbencia || 0),
      status_financeiro: initialData?.status ?? 0,
    };

    onSave(payload);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg sm:text-xl font-bold mb-4">{mode === 'edit' ? 'Editar Pagamento' : 'Novo Pagamento'}</h2>

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
            <select value={form.processo} onChange={handleChange('processo')} className="border rounded w-full px-3 py-2">
              <option value="">Selecione...</option>
              {form.processo && <option value={form.processo}>{form.processo}</option>}
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
          {form.tipo === 2 && (
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
            {form.tipo === 2 && (
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
                {ANOS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              {erros.ano && <p className="text-red-500 text-xs">{erros.ano}</p>}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {mode === 'edit' ? 'Salvar alterações' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
