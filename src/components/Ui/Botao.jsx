import React from "react";
import 'tailwindcss/tailwind.css';

const tamanhos = {
    pequeno: "text-xs px-2 py-1", 
    medio: "text-sm px-3 py-2",   
    grande: "text-base px-4 py-2",
    extraPequeno: "text-base px-4 py-4",
    responsivo: `
        text-xs px-2 py-1
        sm:text-sm sm:px-3 sm:py-2
        md:text-base md:px-4 md:py-2
        lg:text-lg lg:px-6 lg:py-3
        xl:text-xl xl:px-8 xl:py-4
    `
};

const larguras = {
    cheia: "w-full",
    grande: "w-[65%]",
    normal: "w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]",
    medio: "w-[30%]",
    pequeno: "w-[20%] sm:w-[18%] md:w-[16%]",
    extraPequeno: "w-[40%] h-[40%]",
    auto: "w-auto"
};

const cores = {
    padrao: `
        bg-azulEscuroForte text-white
        hover:bg-[#1b2a4e] hover:text-dourado
    `,
    contornoAzul: `
        border border-azulEscuroForte text-azulEscuroForte
        hover:bg-azulEscuroForte hover:text-white
    `
};

/**
 * Componente Botao
 *
 * Um botão reutilizável com suporte a variações de tamanho, largura e cor.
 *
 * Props disponíveis:
 * - `tamanho`: Define o tamanho do botão. Opções:
 *     - "pequeno"
 *     - "medio"
 *     - "grande"
 *     - "extraPequeno" (nova opção)
 *     - "responsivo" (ajusta automaticamente conforme o tamanho da tela)
 *
 * - `largura`: Define a largura do botão. Opções:
 *     - "cheia" (100%)
 *     - "grande" (~65%)
 *     - "normal" (~80% em mobile até ~40% em telas grandes)
 *     - "medio" (50%)
 *     - "pequeno" (20%)
 *     - "extraPequeno" (15%) (nova opção)
 *     - "auto" (ajusta ao conteúdo)
 *
 * - `cor`: Define o estilo do botão. Opções:
 *     - "padrao": Fundo azul escuro com texto branco
 *     - "contornoAzul": Fundo transparente com contorno azul escuro
 *
 * - `className`: (opcional) permite adicionar classes extras se necessário.
 * - `children`: Conteúdo do botão (texto ou elementos React)
 * - ...props: Qualquer outra prop válida de <button> (ex: onClick, type, etc.)
 */

export default function Botao({
    children,
    tamanho = "responsivo",
    largura = "normal",
    cor = "padrao",
    className = "",
    ...props
}) {
    return (
        <button
            className={`
                ${tamanhos[tamanho]}
                ${larguras[largura]}
                ${cores[cor]}
                font-medium rounded-lg
                transition-colors duration-300
                whitespace-nowrap
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}
