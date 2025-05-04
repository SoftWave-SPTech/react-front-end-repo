import { useState } from 'react';
import AdvogadoFisicoForm from './AdvogadoFisicoForm';
import AdvogadoJuridicoForm from './AdvogadoJuridicoForm';

export default function FormAdvogado() 
{
  const [tipo, setTipo] = useState('fisica');

  return (
    <div>
      <div className="abas-internas">

        <button
          onClick={() => setTipo('fisica')}
          className={`aba-interna ${tipo === 'fisica' ? 'ativa-interna' : ''}`}
        >

          Pessoa Física
        </button>

        <button
          onClick={() => setTipo('juridica')}
          className={`aba-interna ${tipo === 'juridica' ? 'ativa-interna' : ''}`}
        >
          Pessoa Jurídica
        </button>

      </div>

      {tipo === 'fisica' ? <AdvogadoFisicoForm /> : <AdvogadoJuridicoForm />}
      
    </div>
  );
}
