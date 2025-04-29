import React, { useState } from 'react';
import './MenuLateralAdvogado.css';
import { Link } from 'react-router-dom';
import {
  FiMenu,
  FiLogOut,
  FiFileText,
  FiCalendar,
  FiMic,
  FiBarChart2,
  FiDollarSign,
  FiUserPlus,
  FiUser
} from 'react-icons/fi';
import advogadoPerfilImg from '../../assets/images/advogadoPerfilImg.png';

const MenuLateral = () => {
  const [fechado, setFechado] = useState(false);

  const alternarMenu = () => {
    setFechado(!fechado);
  };

  const itensMenu = [
    { rotulo: 'Perfil', icone: <FiUser />, rota: '/perfil-advogado'},
    { rotulo: 'Dashboard', icone: <FiBarChart2 />, rota: '/dashboard' },
    { rotulo: 'Financeiro', icone: <FiDollarSign />, rota: '/financeiro' },
    { rotulo: 'Documentos', icone: <FiFileText />, rota: '/documentos' },
    { rotulo: 'Calendário', icone: <FiCalendar />, rota: '/calendario' },
    { rotulo: 'Podcast', icone: <FiMic />, rota: '/podcast' },
    { rotulo: 'Cadastrar', icone: <FiUserPlus />, rota: '/cadastro' }
  ];

  return (
    <div className={`menu-lateral ${fechado ? 'fechado' : ''}`}>
      <div>
        <div className="barra-superior" onClick={alternarMenu}>
          <FiMenu className="icone-menu" />
        </div>

        <ul className="lista-menu">
          {itensMenu.map((item) => (
            <li key={item.rotulo} className="item-menu">
              <Link to={item.rota} className="link-menu">
                {item.icone}
                {!fechado && <span>{item.rotulo}</span>}
              </Link>
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
        {!fechado && <span>Sair</span>}
      </div>
    </div>
  );
};

export default MenuLateral;
