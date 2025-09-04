import React, { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';
import Botao from "./Botao";
import { Input } from './Input';
import { validarEmail } from "../../Utils/validacoes";

/**
 * ModalReenvioTokenPrimeiroAcesso
 *
 * Modal em escala maior para editar o e-mail e reenviar o token de primeiro acesso.
 * Segue o padrão visual dos modais do projeto (overlay, cabeçalho colorido e conteúdo responsivo).
 *
 * Props:
 * - isOpen: boolean → controla visibilidade do modal
 * - onClose: () => void → fecha o modal
 * - onReenviar: (novoEmail: string) => void → callback para acionar reenvio do token
 * - emailAtual?: string → e-mail atual exibido como referência
 * - titulo?: string → título do modal
 * - descricao?: string → texto auxiliar abaixo do título
 * - loading?: boolean → desabilita botões durante ação externa
 */
export default function ModalReenvioTokenPrimeiroAcesso({
  isOpen,
  onClose,
  onReenviar,
  emailAtual = "",
  titulo = "Reenviar token de primeiro acesso",
  descricao = "Atualize o e-mail do usuário, valide-o e reenvie o token de primeiro acesso.",
  loading = false,
}) {
  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail(emailAtual || "");
      setErroEmail("");
    }
  }, [isOpen, emailAtual]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (erroEmail) setErroEmail("");
  };

  const handleReenviar = () => {
    if (!email || !validarEmail(email)) {
      setErroEmail("Informe um e-mail válido.");
      return;
    }
    onReenviar?.(email);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FFF] text-white rounded-xl w-[92%] sm:w-[90%] md:w-[88%] lg:w-[80%] xl:w-[70%] max-w-4xl shadow-2xl overflow-hidden">
        {/* Cabeçalho */}
        <div className="bg-azulEscuroForte px-5 sm:px-6 py-4 flex items-center justify-between relative">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold w-full text-center">
            {titulo}
          </h3>
          <button
            onClick={onClose}
            className="absolute right-4 sm:right-5 top-2 sm:top-2.5 w-10 h-10 sm:w-12 sm:h-12 text-black text-3xl sm:text-4xl leading-none"
            aria-label="Fechar modal"
          >
            &times;
          </button>
        </div>

        {/* Corpo */}
        <div className="p-5 sm:p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Descrição e e-mail atual */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm md:text-base text-black">{descricao}</p>
              {emailAtual && (
                <p className="text-[11px] sm:text-xs md:text-sm text-black">
                  E-mail atual: <span className="font-semibold text-black">{emailAtual}</span>
                </p>
              )}
            </div>

            {/* Formulário */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
              <div className="md:col-span-8 text-black">
                <Input
                  type="email"
                  name="email"
                  label="Novo e-mail"
                  value={email}
                  onChange={handleChange}
                  placeholder="nome@exemplo.com"
                  errorMessage={erroEmail}
                  width="w-full"
                />
              </div>

              <div className="md:col-span-4 flex flex-col gap-2 md:gap-3">
                <div className="text-[11px] sm:text-xs md:text-sm text-black">
                  - O token será enviado para o e-mail informado acima.
                  <br />- Certifique-se de que o endereço está correto.
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
              <Botao
                onClick={onClose}
                tamanho="grande"
                largura="auto"
                cor="contornoAzul"
                disabled={loading}
              >
                Cancelar
              </Botao>
              <Botao
                onClick={handleReenviar}
                tamanho="grande"
                largura="auto"
                cor="padrao"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Reenviar token"}
              </Botao>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


