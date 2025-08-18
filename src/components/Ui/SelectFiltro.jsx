import React, { useId } from 'react';

/**
 * props:
 * - mode: "select" | "combobox" (default: "select")
 * - label, options [{label, value}], value, onChange, placeholder
 */
export default function SelectFiltro({
  mode = 'select',
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Selecione...',
}) {
  const generatedId = useId();
  const baseId = `filtro-${generatedId}`;
  const datalistId = `${baseId}-list`;

  return (
    <div className="flex flex-col min-w-[160px]">
      {label && (
        <label className="text-sm text-white mb-1" htmlFor={baseId}>
          {label}
        </label>
      )}

      {mode === 'combobox' ? (
        <>
          {/* input com sugestões (datalist) — permite digitar livremente */}
          <input
            id={baseId}
            list={datalistId}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            aria-label={label || placeholder}
          />
          <datalist id={datalistId}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </datalist>
        </>
      ) : (
        <select
          id={baseId}
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          aria-label={label || placeholder}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
