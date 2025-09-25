import { FiAlertCircle } from "react-icons/fi";
import AlertStyle from "./AlertStyle";

export const Input = (
{
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  errorMessage,
  mask,
  width = "w-full",
  name,
}) => {
  const handleChange = (e) => {
    const val = mask ? mask(e.target.value) : e.target.value;
    onChange({
      target: {
        name,
        value: val,
      },
    });
  };
  
  /**
 * Componente Input
 *
 * Campo de entrada reutilizável com suporte a labels, validação, máscara e estilos personalizados.
 *
 * Props disponíveis:
 * - `type`: Tipo do input (ex: "text", "email", "number", "password", etc). Padrão: "text".
 * - `value`: Valor atual do input (controlado externamente).
 * - `onChange`: Função chamada ao alterar o valor. A função recebe um objeto no formato `{ target: { name, value } }`.
 * - `placeholder`: Texto exibido quando o campo está vazio.
 * - `label`: Texto exibido acima do input como rótulo.
 * - `errorMessage`: Mensagem de erro a ser exibida abaixo do campo. Se fornecida, o campo recebe borda vermelha e ícone de alerta.
 * - `mask`: Função opcional para aplicar máscara ao valor digitado (ex: CPF, telefone, CNPJ).
 * - `width`: Classe de largura do container (ex: "w-full", "w-1/2", etc). Padrão: "w-full".
 * - `name`: Nome do campo (usado para identificação no formulário).
 *
 * Exemplo de uso:
 *
 * <Input
 *   label="Nome:"
 *   name="nome"
 *   value={formData.nome}
 *   onChange={handleChange}
 *   placeholder="Digite seu nome"
 * />
 *
 * <Input
 *   label="CNPJ:"
 *   name="cnpj"
 *   value={formData.cnpj}
 *   onChange={handleChange}
 *   mask={mascaraCNPJ}
 *   placeholder="00.000.000/0000-00"
 *   errorMessage={errors.cnpj}
 * />
 */

  return (
    <div className={`flex flex-col gap-2 ${width}`}>
      {label && (
        <label className="text-sm md:text-base font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            w-full 
            px-2 py-1.5
            text-xs md:text-sm lg:text-base 
            placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base
            border 
            rounded-md 
            bg-white 
            outline-none 
            transition-all 
            duration-200
            ${errorMessage
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-dourado"}
          `}
        />
        {errorMessage && (
          <FiAlertCircle
            className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
            size={22}
          />
        )}
      </div>

      {errorMessage && (
        <Alert
          type="error"
          message={errorMessage}
        />
      )}
    </div>
  );
};