import { useState } from 'react';
import './Cadastro.css';
import AdvogadoFisicoForm from '../AdvogadoFisicoForm';
import AdvogadoJuridicoForm from '../AdvogadoJuridicoForm';
import ClienteFisicoForm from '../ClienteFisicoForm';
import ClienteJuridicoForm from '../ClienteJuridicoForm';

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

    <div className='container'>
      <div className="cadastro-container">
        <div className="abas-principais">
          <button
            onClick={() => setAba('cliente')}
            className={`aba ${aba === 'cliente' ? 'ativa' : ''}`}
          >
            Cliente
          </button>

          <button
            onClick={() => setAba('advogado')}
            className={`aba ${aba === 'advogado' ? 'ativa' : ''}`}
          >
            Advogado
          </button>
        </div>

        <div className="form-box">
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

          {renderFormulario()}
        </div>
      </div>
    </div> 
  );
}
