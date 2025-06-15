import React from 'react';
import 'tailwindcss/tailwind.css';

const tamanhos = 
{
  pequeno: "text-base px-4 py-2",
  medio: "text-lg px-5 py-3",
  grande: "text-xl px-6 py-4",
  responsivo: `
    text-sm px-3 py-2
    sm:text-base sm:px-4 sm:py-2
    md:text-lg md:px-5 md:py-3
    lg:text-xl lg:px-6 lg:py-4
    xl:text-2xl xl:px-8 xl:py-5
  `,
};

const larguras = 
{
  grande: 'w-full',
  medio: 'w-[85%]',
  pequeno: 'w-[60%]',
  auto: 'w-auto',
};

const cores = 
{
  escuro: 'bg-azulEscuroForte text-branco',
  claro: 'bg-[#0A307E] text-branco',
};

export default function BarraTitulo(
{
  children,
  largura = 'grande',
  cor = 'escuro',
  tamanho = 'responsivo',
  className = '',
}) 
{
  return (
    <div
      className=
      {`
        ${larguras[largura]}
        ${cores[cor]}
        ${tamanhos[tamanho]}
        font-quicksand
        rounded-md shadow-md
        flex items-center
        ${className}
      `}
    >
      {children}
    </div>
  );
}
