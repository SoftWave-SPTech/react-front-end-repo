import React from 'react';
import { formatCurrencyBRL } from '../../utils/format';

export default function TabelaPagamentos({
  pagamentos,
  selectedIndex,
  onSelect,
  totalPago = 0,
  totalPagar = 0,
  hasSelection = false,
  onPrimaryAction,
}) {
  return (
    <div className="w-full">
      {/* DESKTOP (md+) - tabela */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-[#E5EDFA] shadow-md rounded-lg overflow-hidden table-fixed">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-3 px-5 w-[60px]">
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-900 hover:bg-gray-100"
                  title={hasSelection ? 'Editar registro' : 'Adicionar novo pagamento'}
                  aria-label={hasSelection ? 'Editar registro' : 'Adicionar novo pagamento'}
                >
                  {hasSelection ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm2.92 2.33h-.17v-.17l9.4-9.4.34.34-9.57 9.23zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  ) : (
                    <span className="text-xl leading-none">+</span>
                  )}
                </button>
              </th>
              <th className="py-3 px-5 w-[100px] text-left">Código</th>
              <th className="py-3 px-5 w-[220px] text-left">Cliente</th>
              <th className="py-3 px-5 w-[240px] text-left">Processo</th>
              <th className="py-3 px-5 w-[170px] text-left hidden lg:table-cell">Método</th>
              <th className="py-3 px-5 w-[130px] text-left hidden lg:table-cell">Tipo</th>
              <th className="py-3 px-5 w-[110px] text-left">Parcelas</th>
              <th className="py-3 px-5 w-[160px] text-left">Valor da Parcela</th>
              <th className="py-3 px-5 w-[130px] text-left">Resultado</th>
              <th className="py-3 px-5 w-[160px] text-left">Valor Pago</th>
              <th className="py-3 px-5 w-[160px] text-left">Valor a Pagar</th>
            </tr>
          </thead>

          <tbody>
            {pagamentos.map((item, index) => {
              const bg =
                item.resultado === 'vitoria' ? 'bg-green-200' :
                item.resultado === 'derrota' ? 'bg-red-200'   : '';
              return (
                <tr key={item.codigo} className={`border-t hover:bg-gray-100 ${bg}`}>
                  <td className="py-3 px-5 w-[60px]">
                    <input
                      type="radio"
                      name="selecao-pagamento"
                      checked={selectedIndex === index}
                      onClick={() => onSelect(selectedIndex === index ? null : index)} // toggle
                      className="w-5 h-5 cursor-pointer"
                      aria-label={`Selecionar pagamento ${item.codigo}`}
                    />
                  </td>

                  <td className="py-3 px-5">{item.codigo}</td>
                  <td className="py-3 px-5">{item.cliente}</td>
                  <td className="py-3 px-5 break-words">{item.processo}</td>
                  <td className="py-3 px-5 hidden lg:table-cell">{item.metodo}</td>
                  <td className="py-3 px-5 hidden lg:table-cell">{item.tipo}</td>
                  <td className="py-3 px-5">{item.parcelas}</td>
                  <td className="py-3 px-5">{formatCurrencyBRL(item.valorParcela)}</td>
                  <td className="py-3 px-5">
                    {item.resultado ? (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${item.resultado === 'vitoria' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.resultado === 'vitoria' ? 'Deferido' : 'Indeferido'}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="py-3 px-5">{formatCurrencyBRL(item.valorPago)}</td>
                  <td className="py-3 px-5">{formatCurrencyBRL(item.valorPagar)}</td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr className="bg-blue-900 text-white font-bold">
              <td colSpan="9" className="text-right py-3 px-5">Total:</td>
              <td className="py-3 px-5">{formatCurrencyBRL(totalPago)}</td>
              <td className="py-3 px-5">{formatCurrencyBRL(totalPagar)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* MOBILE (md-) - cards */}
      <div className="md:hidden space-y-3">
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={onPrimaryAction}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-3 py-2 text-sm"
          >
            {hasSelection ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm2.92 2.33h-.17v-.17l9.4-9.4.34.34-9.57 9.23zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                Editar
              </>
            ) : (
              <>
                <span className="text-lg leading-none">+</span> Adicionar
              </>
            )}
          </button>
        </div>

        {pagamentos.map((item, index) => {
          const bg =
            item.resultado === 'vitoria' ? 'bg-green-50' :
            item.resultado === 'derrota' ? 'bg-red-50'   : 'bg-white';
          const selecionado = selectedIndex === index;

          return (
            <div
              key={item.codigo}
              className={`rounded-lg shadow border border-gray-200 p-3 ${bg}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                      {item.codigo}
                    </span>
                    {item.resultado && (
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold
                        ${item.resultado === 'vitoria' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.resultado === 'vitoria' ? 'Deferido' : 'Indeferido'}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 text-sm font-medium break-words">{item.cliente}</div>
                  <div className="text-xs text-gray-600 break-words">{item.processo}</div>

                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div><span className="text-gray-500">Método:</span> {item.metodo}</div>
                    <div><span className="text-gray-500">Tipo:</span> {item.tipo}</div>
                    <div><span className="text-gray-500">Parcelas:</span> {item.parcelas}</div>
                    <div><span className="text-gray-500">Parcela:</span> {formatCurrencyBRL(item.valorParcela)}</div>
                    <div><span className="text-gray-500">Pago:</span> {formatCurrencyBRL(item.valorPago)}</div>
                    <div><span className="text-gray-500">A pagar:</span> {formatCurrencyBRL(item.valorPagar)}</div>
                  </div>
                </div>

                <div className="pl-2">
                  <input
                    type="radio"
                    name="selecao-pagamento-mobile"
                    checked={selecionado}
                    onClick={() => onSelect(selecionado ? null : index)}
                    className="w-5 h-5 cursor-pointer"
                    aria-label={`Selecionar pagamento ${item.codigo}`}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Totais no mobile */}
        <div className="rounded-lg bg-blue-900 text-white p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">Total Pago</span>
            <span>{formatCurrencyBRL(totalPago)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span className="font-semibold">Total a Pagar</span>
            <span>{formatCurrencyBRL(totalPagar)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
