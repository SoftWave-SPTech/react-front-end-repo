import React from 'react';
import { formatCurrencyBRL } from '../../utils/format.js';

export default function TabelaPagamentos({
  pagamentos = [],
  selectedIndex,
  onSelect = () => {},
  totalPago = 0,
  totalPagar = 0,
  hasSelection = false,
  onPrimaryAction = () => {},
}) {
  const rowHeight = 50; // altura de cada linha (px)
  const visibleRows = 5; // quantas linhas queremos ver antes do scroll
  const visible = Math.min(pagamentos.length, visibleRows);
  // +1 para header +1 para footer → garante que cabeçalho e rodapé fiquem visíveis
  const wrapperMaxHeight = (visible + 2) * rowHeight;

  return (
    // wrapper único que controla os dois eixos de rolagem
    <div style={{ maxWidth: '100%' }}>
      <div
        style={{
          maxHeight: `${wrapperMaxHeight}px`,
          overflow: 'auto', // controla horizontal e vertical
          scrollbarGutter: 'stable', // evita "jump" quando scrollbar aparece
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <table
          style={{
            width: '100%',
            tableLayout: 'fixed', // importante para consistência das colunas
            borderCollapse: 'collapse',
            boxSizing: 'border-box',
          }}
          className="min-w-full text-base"
        >
          {/* Ajuste as larguras aqui conforme preferir */}
          <colgroup>
            <col style={{ width: '48px' }} />   {/* ação / radio (w-12) */}
            <col style={{ width: '96px' }} />   {/* Código (w-24) */}
            <col style={{ width: '192px' }} />  {/* Cliente (w-48) */}
            <col style={{ width: '192px' }} />  {/* Processo (w-48) */}
            <col style={{ width: '150px' }} />  {/* Método (w-32) */}
            <col style={{ width: '130px' }} />  {/* Tipo (w-32) */}
            <col style={{ width: '96px' }} />   {/* Parcelas (w-24) */}
            <col style={{ width: '128px' }} />  {/* Valor Parc. (w-32) */}
            <col style={{ width: '128px' }} />  {/* Resultado (w-32) */}
            <col style={{ width: '128px' }} />  {/* Valor Pago (w-32) */}
            <col style={{ width: '128px' }} />  {/* A Pagar (w-32) */}
          </colgroup>

          <thead style={{ position: 'sticky', top: 0, zIndex: 30 }}>
            <tr className="bg-AzulEscuro text-white">
              <th className="py-3 px-3"> 
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-900 hover:bg-gray-100"
                  title={hasSelection ? 'Editar registro' : 'Adicionar novo pagamento'}
                >
                  {hasSelection ? '✎' : '+'}
                </button>
              </th>
              <th className="py-3 px-3">Código</th>
              <th className="py-3 px-3">Cliente</th>
              <th className="py-3 px-3">Processo</th>
              <th className="py-3 px-3 hidden lg:table-cell">Método</th>
              <th className="py-3 px-3 hidden lg:table-cell">Tipo</th>
              <th className="py-3 px-3">Parcelas</th>
              <th className="py-3 px-3">Valor Parc.</th>
              <th className="py-3 px-3">Resultado</th>
              <th className="py-3 px-3">Valor Pago</th>
              <th className="py-3 px-3">A Pagar</th>
            </tr>
          </thead>

          <tbody>
            {pagamentos.map((item, index) => {
              const bg =
                item.resultado === 'vitoria'
                  ? 'bg-green-100'
                  : item.resultado === 'derrota'
                  ? 'bg-red-100'
                  : '';
              return (
                <tr
                  key={item.codigo ?? index}
                  className={`hover:bg-gray-100 ${bg}`}
                  style={{ height: `${rowHeight}px` }}
                >
                  <td className="py-2 px-3">
                    <input
                      type="radio"
                      name="selecao-pagamento"
                      checked={selectedIndex === index}
                      onChange={() => onSelect(selectedIndex === index ? null : index)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="py-2 px-3">{item.codigo}</td>
                  <td className="py-2 px-3">{item.cliente}</td>
                  <td className="py-2 px-3">{item.processo}</td>
                  <td className="py-2 px-3 hidden lg:table-cell">{item.metodo}</td>
                  <td className="py-2 px-3 hidden lg:table-cell">{item.tipo}</td>
                  <td className="py-2 px-3">{item.parcelas}</td>
                  <td className="py-2 px-3">{formatCurrencyBRL(item.valorParcela)}</td>
                  <td className="py-2 px-3">
                    {item.resultado === 'vitoria'
                      ? 'Deferido'
                      : item.resultado === 'derrota'
                      ? 'Indeferido'
                      : '—'}
                  </td>
                  <td className="py-2 px-3">{formatCurrencyBRL(item.valorPago)}</td>
                  <td className="py-2 px-3">{formatCurrencyBRL(item.valorPagar)}</td>
                </tr>
              );
            })}
          </tbody>

          <tfoot style={{ position: 'sticky', bottom: 0, zIndex: 30 }} className="bg-AzulEscuro text-white font-bold">
            <tr>
              {/* espalha colunas e coloca os totais nas 2 últimas colunas */}
              <td colSpan={9} className="text-right py-2 px-3">
                Total:
              </td>
              <td className="py-2 px-3 text-right">{formatCurrencyBRL(totalPago)}</td>
              <td className="py-2 px-3 text-right">{formatCurrencyBRL(totalPagar)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
