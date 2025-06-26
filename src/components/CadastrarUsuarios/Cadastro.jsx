import { useState } from 'react';
import '../../estilos/Cadastro.css';
import AdvogadoFisicoForm from './AdvogadoFisicoForm';
import AdvogadoJuridicoForm from './AdvogadoJuridicoForm';
import ClienteFisicoForm from './ClienteFisicoForm';
import ClienteJuridicoForm from './ClienteJuridicoForm';


export default function Cadastro() 
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

    <div className='cadastrar'>
      <div className="cadastro-container">
        <div className="abas-principais">
          <button
            onClick={() => setAba('cliente')}
            className={`px-5 py-3 rounded-md text-sm font-semibold transition ${
              aba === 'cliente'
                ? 'bg-white text-AzulPodcast'
                : 'bg-AzulPodcast text-white'
            }`}
          >
            Cliente
          </button>

          <button
            onClick={() => setAba('advogado')}
            className={`px-5 py-3 rounded-md text-sm font-semibold transition ${
              aba === 'advogado'
                ? 'bg-white text-AzulPodcast'
                : 'bg-AzulPodcast text-white'
            }`}
          >
            Advogado
          </button>
        </div>

        <div className="flex gap-2 mt-0">
          <button
            onClick={() => setTipo('fisica')}
            className={`flex-1 py-4 rounded-t-lg text-xl font-bold transition ${
              tipo === 'fisica'
                ? 'bg-white text-AzulPodcast'
                : 'bg-AzulPodcast text-white'
            }`}
          >
            Pessoa Física
          </button>
          <button
            onClick={() => setTipo('juridica')}
            className={`flex-1 py-4 rounded-t-lg text-xl font-bold transition ${
              tipo === 'juridica'
                ? 'bg-white text-AzulPodcast'
                : 'bg-AzulPodcast text-white'
            }`}
          >
            Pessoa Jurídica
          </button>
        </div>

          {renderFormulario()}
        </div>
      </div>
    </div> 
  );
}
