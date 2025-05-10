import { useState } from 'react';
import ClienteFisicoForm from './ClienteFisicoForm';
import ClienteJuridicoForm from './ClienteJuridicoForm';

export default function FormCliente() 
{
  const [tipo, setTipo] = useState('fisica');

  return (
    <div className="w-full max-w-[1000px] px-4 py-6 mx-auto">

      <div className="flex w-full mb-4 rounded-xl overflow-hidden">
        <button
          onClick={() => setTipo('fisica')}
          className={`flex-1 py-4 text-center font-semibold text-lg transition-all ${tipo === 'fisica'
              ? 'bg-[#F4F4F4] text-[#0C1833]'
              : 'bg-[#010D26] text-white'
            } rounded-l-xl`}
        >
          Pessoa Física
        </button>

        <button
          onClick={() => setTipo('juridica')}
          className={`flex-1 py-4 text-center font-semibold text-lg transition-all ${tipo === 'juridica'
              ? 'bg-[#F4F4F4] text-[#0C1833]'
              : 'bg-[#010D26] text-white'
            } rounded-r-xl`}
        >
          Pessoa Jurídica
        </button>
      </div>

      <div className="bg-[#F4F4F4] rounded-xl shadow-md px-6 py-4">
        {tipo === 'fisica' ? <ClienteFisicoForm /> : <ClienteJuridicoForm />}
      </div>

    </div>
  );
}
