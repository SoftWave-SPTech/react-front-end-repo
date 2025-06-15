import { useState } from 'react';
import ClienteFisicoForm from './ClienteFisicoForm';
import ClienteJuridicoForm from './ClienteJuridicoForm';

export default function FormCliente() 
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

      {tipo === 'fisica' ? <ClienteFisicoForm /> : <ClienteJuridicoForm />}
      
    </div>
  );
}
