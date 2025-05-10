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
  tamanho = 'medio',
  onClick = () => {},
  className = '',
}) 

/**
 * Componente BotaoAdicionar
 *
 * Botão arredondado com ícone de "+" (usado para adicionar itens).
 * Visual limpo e adaptável em três tamanhos.
 *
 * Props disponíveis:
 * - `tamanho`: Define o tamanho do botão. Pode ser:
 *   - "pequeno" (default: w-8 h-8, texto pequeno)
 *   - "medio" (w-10 h-10, texto base)
 *   - "grande" (w-12 h-12, texto maior)
 * - `onClick`: Função executada ao clicar no botão. Padrão: função vazia.
 * - `className`: Permite passar classes adicionais para estilização customizada.
 *
 * Exemplo de uso:
 *
 * <BotaoAdicionar onClick={() => console.log("Adicionado!")} />
 *
 * <BotaoAdicionar tamanho="grande" className="bg-green-600 hover:bg-green-700" />
 *
 * <BotaoAdicionar tamanho="pequeno" />
 */

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
