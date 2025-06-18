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
  Full: `
    text-1xl sm:text-2xl md:text-3xl
    font-bold
    px-8 py-6
  `
};

const larguras = 
{
  grande: 'w-full',
  medio: 'w-[85%]',
  medio2:'w-[78%]',
  pequeno: 'w-[60%]',
  auto: 'w-auto',
};

const cores = 
{
  escuro: 'bg-azulEscuroForte text-branco',
  claro: 'bg-[#0A307E] text-branco',
};

/**
 * Componente BarraTitulo
 *
 * Faixa estilizada para exibir títulos ou seções destacadas no layout.
 * Permite configurar largura, cor e tamanho de forma flexível.
 *
 * Props disponíveis:
 * - `children`: Conteúdo a ser exibido dentro da barra (normalmente um título ou ícone).
 * - `largura`: Define a largura do componente. Opções:
 *   - "grande" (100%)
 *   - "medio" (85%)
 *   - "pequeno" (60%)
 *   - "auto" (largura automática)
 * - `cor`: Estilo da barra. Opções:
 *   - "escuro" (azul escuro padrão)
 *   - "claro" (tom de azul claro)
 * - `tamanho`: Define o tamanho do texto e o espaçamento. Opções:
 *   - "pequeno", "medio", "grande", "responsivo" (padrão)
 * - `className`: Permite adicionar classes Tailwind extras para customização.
 *
 * Exemplo de uso:
 *
 * <BarraTitulo>Cadastro de Usuários</BarraTitulo>
 *
 * <BarraTitulo cor="claro" tamanho="medio" largura="pequeno">
 *   <span className="font-bold">Dashboard</span>
 * </BarraTitulo>
 */


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
