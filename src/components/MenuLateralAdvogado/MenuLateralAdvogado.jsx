import React, { useState } from 'react';
import './MenuLateralAdvogado.css';
import { FiMenu, FiLogOut, FiFileText, FiCalendar, FiMic, FiBarChart2, FiDollarSign,FiUserPlus } from 'react-icons/fi';
import advogadoPerfilImg from '../../assets/images/advogadoPerfilImg.png'

const MenuLateral = () => 
{
  const [fechado, setFechado] = useState(false);

  const alternarMenu = () => 
  {
    setFechado(!fechado);
  };

  const itensMenu = 
  [
    { 
      rotulo: 'Dashboard', 
      icone: <FiBarChart2 /> 
    },
    { 
      rotulo: 'Financeiro', 
      icone: <FiDollarSign /> 
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
    },
    { 
      rotulo: 'Cadastrar', 
      icone: <FiUserPlus /> 
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
            src={advogadoPerfilImg}
            alt="Foto do Usuário"
            className="avatar"
          />

          {!fechado && (
            <div className="info-perfil">
              <div className="nome-perfil">
                <p>Dr. Cristhian</p>
              </div>
              <div className="email-perfil">
                cristhianlauriano@gmail.com
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

export default MenuLateral;
