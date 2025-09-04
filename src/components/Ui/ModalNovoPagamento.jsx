import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';

const METODOS = ['Cartão de Crédito', 'Boleto', 'Pix', 'Transferência', 'Dinheiro'];
const TIPOS   = ['À vista', 'Parcelado'];
const MESES   = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const RANGE   = (a,b)=>Array.from({length:(b-a+1)}, (_,i)=>a+i);
const currentYear = new Date().getFullYear();
const ANOS = RANGE(currentYear - 5, currentYear + 5);

export default function ModalNovoPagamento({ open, onClose, onSave, initialData = null, mode = 'create' }) {
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
    ano: String(currentYear),
  });
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (!open) return;
    if (initialData) {
      const [atual, total] = (initialData.parcelas || '1/1').split('/').map(n => parseInt(n,10) || 1);
      setForm({
        cliente: initialData.cliente || '',
        processo: initialData.processo || '',
        metodo: initialData.metodo || '',
        tipo: initialData.tipo || '',
        parcelaAtual: atual,
        parcelaTotal: total,
        valorParcela: String(initialData.valorParcela ?? ''),
        valorPago: String(initialData.valorPago ?? ''),
        valorPagar: String(initialData.valorPagar ?? ''),
        mes: initialData.mes || '',
        ano: String(initialData.ano || currentYear),
      });
      setErros({});
    } else {
      setForm({
        cliente: '', processo: '', metodo: '', tipo: '',
        parcelaAtual: 1, parcelaTotal: 1,
        valorParcela: '', valorPago: '', valorPagar: '',
        mes: '', ano: String(currentYear),
      });
      setErros({});
    }
  }, [open, initialData]);

  // quando o tipo muda, ajustar campos dependentes
  useEffect(() => {
    if (form.tipo === 'À vista') {
      setForm(prev => ({
        ...prev,
        parcelaAtual: 1,
        parcelaTotal: 1,
        valorParcela: '',
      }));
    }
  }, [form.tipo]);

  if (!open) return null;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const handleCurrencyChange = (field) => (values) => {
    const { value } = values; // valor numérico sem formatação
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validar = () => {
    const e = {};
    if (!form.cliente) e.cliente = 'Informe o cliente';
    if (!form.processo) e.processo = 'Informe o processo';
    if (!form.metodo) e.metodo = 'Informe o método';
    if (!form.tipo) e.tipo = 'Informe o tipo';
    if (!form.mes) e.mes = 'Informe o mês';
    if (!form.ano) e.ano = 'Informe o ano';
    if (form.tipo === 'Parcelado' && !form.valorParcela) e.valorParcela = 'Informe o valor da parcela';
    if (!form.valorPago) e.valorPago = 'Informe o valor pago';
    if (!form.valorPagar) e.valorPagar = 'Informe o valor a pagar';
    if (form.tipo === 'Parcelado' && Number(form.parcelaAtual) > Number(form.parcelaTotal)) {
      e.parcelaAtual = 'Parcela atual não pode exceder o total';
    }
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const payload = {
      cliente: form.cliente,
      processo: form.processo,
      metodo: form.metodo,
      tipo: form.tipo,
      parcelas: form.tipo === 'Parcelado'
        ? `${form.parcelaAtual}/${form.parcelaTotal}`
        : '1/1',
      valorParcela: form.tipo === 'Parcelado' ? Number(form.valorParcela) : 0,
      valorPago: Number(form.valorPago),
      valorPagar: Number(form.valorPagar),
      mes: form.mes,
      ano: form.ano,
    };

    if (mode === 'edit' && initialData) {
      onSave({ ...initialData, ...payload });
    } else {
      onSave({
        ...payload,
        codigo: `PG${Math.floor(Math.random() * 10000)}`,
        resultado: null,
        valorCaso: (Number(form.valorPago) + Number(form.valorPagar)) || 0,
        honorarioSucumbencia: 0,
        valorProcesso: (Number(form.valorPago) + Number(form.valorPagar)) || 0,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg sm:text-xl font-bold mb-4">{mode === 'edit' ? 'Editar Pagamento' : 'Novo Pagamento'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cliente */}
          <div>
            <label className="block text-sm font-medium">Cliente</label>
            <input type="text" value={form.cliente} onChange={handleChange('cliente')} className="border rounded w-full px-3 py-2" />
            {erros.cliente && <p className="text-red-500 text-xs">{erros.cliente}</p>}
          </div>

          {/* Processo */}
          <div>
            <label className="block text-sm font-medium">Processo</label>
            <input type="text" value={form.processo} onChange={handleChange('processo')} className="border rounded w-full px-3 py-2" />
            {erros.processo && <p className="text-red-500 text-xs">{erros.processo}</p>}
          </div>

          {/* Método (select) */}
          <div>
            <label className="block text-sm font-medium">Método</label>
            <select value={form.metodo} onChange={handleChange('metodo')} className="border rounded w-full px-3 py-2">
              <option value="">Selecione...</option>
              {METODOS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {erros.metodo && <p className="text-red-500 text-xs">{erros.metodo}</p>}
          </div>

          {/* Tipo (select) */}
          <div>
            <label className="block text-sm font-medium">Tipo</label>
            <select value={form.tipo} onChange={handleChange('tipo')} className="border rounded w-full px-3 py-2">
              <option value="">Selecione...</option>
              {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {erros.tipo && <p className="text-red-500 text-xs">{erros.tipo}</p>}
          </div>

          {/* Parcelas (só quando parcelado) */}
          {form.tipo === 'Parcelado' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Parcela atual</label>
                <select value={form.parcelaAtual} onChange={handleChange('parcelaAtual')} className="border rounded w-full px-3 py-2">
                  {RANGE(1, 60).map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                {erros.parcelaAtual && <p className="text-red-500 text-xs">{erros.parcelaAtual}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Total de parcelas</label>
                <select value={form.parcelaTotal} onChange={handleChange('parcelaTotal')} className="border rounded w-full px-3 py-2">
                  {RANGE(1, 60).map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Valores monetários */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {form.tipo === 'Parcelado' && (
              <div>
                <label className="block text-sm font-medium">Valor da Parcela</label>
                <NumericFormat
                  value={form.valorParcela}
                  onValueChange={handleCurrencyChange('valorParcela')}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  allowNegative={false}
                  className="border rounded w-full px-3 py-2"
                />
                {erros.valorParcela && <p className="text-red-500 text-xs">{erros.valorParcela}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium">Valor Pago</label>
              <NumericFormat
                value={form.valorPago}
                onValueChange={handleCurrencyChange('valorPago')}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                allowNegative={false}
                className="border rounded w-full px-3 py-2"
              />
              {erros.valorPago && <p className="text-red-500 text-xs">{erros.valorPago}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Valor a Pagar</label>
              <NumericFormat
                value={form.valorPagar}
                onValueChange={handleCurrencyChange('valorPagar')}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                allowNegative={false}
                className="border rounded w-full px-3 py-2"
              />
              {erros.valorPagar && <p className="text-red-500 text-xs">{erros.valorPagar}</p>}
            </div>
          </div>

          {/* Mês e Ano */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Mês</label>
              <select value={form.mes} onChange={handleChange('mes')} className="border rounded w-full px-3 py-2">
                <option value="">Selecione...</option>
                {MESES.map(m => <option key={m} value={m}>{m}</option>)}
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
