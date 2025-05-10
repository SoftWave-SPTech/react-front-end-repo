import { useState } from 'react';
import AdvogadoFisicoForm from './AdvogadoFisicoForm';
import AdvogadoJuridicoForm from './AdvogadoJuridicoForm';
import ClienteFisicoForm from './ClienteFisicoForm';
import ClienteJuridicoForm from './ClienteJuridicoForm';

export default function FormularioAbas() 
{
  const [aba, setAba] = useState('advogado');
  const [tipo, setTipo] = useState('fisica');

  const renderFormulario = () => 
  {
    if (aba === 'advogado') 
    {
      return tipo === 'fisica' ? <AdvogadoFisicoForm /> : <AdvogadoJuridicoForm />;
    } 
    else 
    {
      return tipo === 'fisica' ? <ClienteFisicoForm /> : <ClienteJuridicoForm />;
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full sm:w-[95%] md:w-[85%] lg:w-[75%] xl:w-[65%] 2xl:w-[60%] mx-auto flex flex-col gap-0">
        <div className="flex justify-end space-x-2 mt-0 mb-8">
          <button
            onClick={() => setAba('cliente')}
            className={`px-5 py-3 rounded-md text-base font-semibold transition ${
              aba === 'cliente'
                ? 'bg-cinzaAzulado text-AzulEscuro shadow-md'
                : 'bg-AzulEscuro text-white'
            }`}
          >
            Cliente
          </button>
          <button
            onClick={() => setAba('advogado')}
            className={`px-5 py-3 rounded-md text-base font-semibold transition ${
              aba === 'advogado'
                ? 'bg-cinzaAzulado text-AzulEscuro shadow-md'
                : 'bg-AzulEscuro text-white'
            }`}
          >
            Advogado
          </button>
        </div>

        <div className="flex gap-2 mt-0">
          <button
            onClick={() => setTipo('fisica')}
            className={`flex-1 py-4 rounded-t-lg text-2xl font-bold transition ${
              tipo === 'fisica'
                ? 'bg-cinzaAzulado text-AzulEscuro shadow-md'
                : 'bg-AzulEscuro text-white'
            }`}
          >
            Pessoa Física
          </button>
          <button
            onClick={() => setTipo('juridica')}
            className={`flex-1 py-4 rounded-t-lg text-2xl font-bold transition ${
              tipo === 'juridica'
                ? 'bg-cinzaAzulado text-AzulEscuro shadow-md'
                : 'bg-[#0C1833] text-white'
            }`}
          >
            Pessoa Jurídica
          </button>
        </div>

        <div className="bg-cinzaAzulado p-6 rounded-b-lg shadow-lg mt-0">
          {renderFormulario()}
        </div>
      </div>
    </div>
  );
}
