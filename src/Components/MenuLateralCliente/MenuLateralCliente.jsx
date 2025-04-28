import React, { useState } from 'react';
import './MenuLateralCliente.css';
import { FiMenu, FiLogOut, FiLayers, FiFileText, FiCalendar, FiMic } from 'react-icons/fi';
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
    { 
      rotulo: 'Processos', 
      icone: <FiLayers /> 
    },
    { 
      rotulo: 'Documentos', 
      icone: <FiFileText /> 
    },
    { 
      rotulo: 'Calendário', 
      icone: <FiCalendar /> 
    },
    { 
      rotulo: 'Podcast', 
      icone: <FiMic /> 
    }
  ];

  return (
    <div className={`menu-lateral ${fechado ? 'fechado' : ''}`}>
      <div>
        <div className="barra-superior" onClick={alternarMenu}>
          <FiMenu className="icone-menu"/>
        </div>

        <div className="cartao-perfil">
          <img
            src={clientePerfilImg}
            alt="Foto do Usuário"
            className="avatar"
          />

          {!fechado && (
            <div className="info-perfil">
              <div className="nome-perfil">
                <p>Letícia</p>
              </div>
              <div className="email-perfil">
                leticia@exemplo.com
              </div>
            </div>
          )}
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
