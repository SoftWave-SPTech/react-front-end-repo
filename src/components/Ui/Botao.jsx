import React from "react";
import 'tailwindcss/tailwind.css';

const tamanhos = 
{
    pequeno: "text-sm px-2 py-1",
    medio: "text-base px-4 py-2",
    grande: "text-lg px-6 py-3",
    responsivo: `
    text-xs px-2 py-1
    sm:text-sm sm:px-3 sm:py-2
    md:text-base md:px-4 md:py-2
    lg:text-lg lg:px-6 lg:py-3
    xl:text-xl xl:px-8 xl:py-4
  `
};

const larguras = 
{
    grande: "w-full",
    medio: "w-[42%]",
    auto: "w-auto"
};

const cores = 
{
    padrao: `
    bg-azulEscuroForte text-white
    hover:bg-[#1b2a4e] hover:text-dourado
  `,
    contornoAzul: `
    border border-azulEscuroForte text-azulEscuroForte
    hover:bg-azulEscuroForte hover:text-white
  `
};

export default function Botao(
{
    children,
    tamanho = "responsivo",
    largura = "normal",
    cor = "padrao",
    className = "",
    ...props
}) 
{
    return (
        <button
            className=
        {`
            ${tamanhos[tamanho]}
            ${larguras[largura]}
            ${cores[cor]}
            font-medium rounded-lg
            transition-colors duration-300
            ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
}
