import React from "react";
import 'tailwindcss/tailwind.css';

const tamanhos = 
{
    pequeno: "text-sm px-2 py-1",
    medio: "text-base px-40 py-4",
    grande: "text-lg px-6 py-3",
    pequeno: "text-[0.875rem] py-[0.625rem] px-[1.25rem]",
    responsivo: `
    text-xs px-2 py-1
    sm:text-sm sm:px-3 sm:py-2a
    md:text-base md:px-4 md:py-2
    lg:text-lg lg:px-6 lg:py-3
    xl:text-xl xl:px-8 xl:py-4
  `
};

const larguras = 
{
    cheia: "w-full",
    grande: "w-[65%]",
    normal: "w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]",
    medio: "w-[30%]",
    pequeno: "w-[20%] sm:w-[18%] md:w-[16%]",
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
 *     - "responsivo" (ajusta automaticamente conforme o tamanho da tela)
 *
 * - `largura`: Define a largura do botão. Opções:
 *     - "cheia" (100%)
 *     - "grande" (~65%)
 *     - "normal" (~80% em mobile até ~40% em telas grandes)
 *     - "medio" (50%)
 *     - "auto" (ajusta ao conteúdo)
 *
 * - `cor`: Define o estilo do botão. Opções:
 *     - "padrao": Fundo azul escuro com texto branco
 *     - "contornoAzul": Fundo transparente com contorno azul escuro
 *
 * - `className`: (opcional) permite adicionar classes extras se necessário.
 * - `children`: Conteúdo do botão (texto ou elementos React)
 * - ...props: Qualquer outra prop válida de <button> (ex: onClick, type, etc.)
 *
 * Exemplos de uso:
 *
 * <Botao>Salvar</Botao>
 * <Botao tamanho="pequeno" largura="auto">Editar</Botao>
 * <Botao cor="contornoAzul" largura="cheia">Cancelar</Botao>
 * <Botao tamanho="grande" cor="padrao" onClick={handleSubmit}>Cadastrar</Botao>
 * <Botao tamanho="responsivo" largura="normal" className="mt-4">Enviar</Botao>
 */


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
