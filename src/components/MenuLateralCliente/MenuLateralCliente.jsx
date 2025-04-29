import React, { useState } from 'react';
import './MenuLateralCliente.css';
import { FiMenu, FiLogOut, FiLayers, FiFileText, FiCalendar, FiMic, FiUser } from 'react-icons/fi';
import clientePerfilImg from '../../assets/images/clientePerfilImg.jpg';

const MenuLateralCliente = () => 
{
  const [fechado, setFechado] = useState(false);

  const alternarMenu = () => 
  {
    setFechado(!fechado);
  };

  const itensMenu = 
  [
    { rotulo: 'Perfil', 
      icone: <FiUser />, 
      rota: '/perfil-cliente'
    },
    { 
      rotulo: 'Processos', 
      icone: <FiLayers />,
      rota: '/processo'
    },
    { 
      rotulo: 'Documentos', 
      icone: <FiFileText />,
      rota: '/Documentos'
    },
    { 
      rotulo: 'Calendário', 
      icone: <FiCalendar />,
      rota: '/calendario' 
    },
    { 
      rotulo: 'Podcast', 
      icone: <FiMic />,
      rota: '/podcast' 
    }
  ];

  return (
    <div className={`menu-lateral ${fechado ? 'fechado' : ''}`}>
      <div>
        <div className="barra-superior" onClick={alternarMenu}>
          <FiMenu className="icone-menu"/>
        </div>

        <ul className="lista-menu">
          {itensMenu.map((item) => (
            <li key={item.rotulo} className="item-menu">
              {item.icone}
              {!fechado && (
                <span>{item.rotulo}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="sair"
      onClick={() => {
        sessionStorage.clear();
        window.location.href = "/";
        }}
      >
        <FiLogOut />
        {!fechado && (
          <span>Sair</span>
        )}
      </div>
    </div>
  );
};

export default MenuLateralCliente;
