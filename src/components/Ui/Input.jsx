import { FiAlertCircle } from "react-icons/fi";
import Alert from "./AlertStyle";

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  errorMessage,
  mask,
  width = "w-full",
  name,
  disabled = false,
}) => {
  const handleChange = (e) => {
    if (disabled) return;
    const val = mask ? mask(e.target.value) : e.target.value;
    onChange({
      target: {
        name,
        value: val,
      },
    });
  };

  return (
    <div className={`flex flex-col gap-2 ${width}`}>
      {label && (
        <label
          className={`text-sm md:text-base font-medium ${
            disabled ? "text-gray-500" : "text-gray-700"
          }`}
        >
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
          disabled={disabled}
          className={`
            w-full 
            px-2 py-1.5
            text-xs md:text-sm lg:text-base 
            placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base
            border 
            rounded-md 
            outline-none 
            transition-all 
            duration-200
            ${
              errorMessage
                ? "border-red-500 focus:ring-red-500"
                : disabled
                ? "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-dourado"
            }
          `}
        />

        {errorMessage && (
          <FiAlertCircle
            className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
            size={22}
          />
        )}
      </div>

      {errorMessage && <Alert type="error" message={errorMessage} />}
    </div>
  );
};
