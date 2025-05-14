import React from 'react';
import { FiPlus } from 'react-icons/fi';
import 'tailwindcss/tailwind.css';

const tamanhos = 
{
  pequeno: 'w-8 h-8 text-sm',
  medio: 'w-10 h-10 text-base',
  grande: 'w-12 h-12 text-lg',
};

export default function BotaoAdicionar(
{
  tamanho = 'grande',
  onClick = () => {},
  className = '',
}) 
{
  return (
    <button
      onClick={onClick}
      className=
      {`
        ${tamanhos[tamanho]}
        bg-azulEscuroForte text-white
        rounded-full flex items-center justify-center
        shadow-md hover:opacity-90 transition
        ${className}
      `}
    >
      <FiPlus className="w-5 h-5" />
    </button>
  );
}
