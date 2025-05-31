import React, { useEffect, useState } from 'react';
import CarroselAdvogados from '../components/SiteInstitucional/CarroselAdvogados.jsx';
import PlayerVideo from '../components/SiteInstitucional/PlayerVideo.jsx';
import MidiaSocial from '../components/SiteInstitucional/MidiaSocial.jsx';
import CatalogoVideos from '../components/SiteInstitucional/CatalogoVideos.jsx';
import logo from '../assets/images/SiteInstitucional/leaologo.png';
import { useNavigate } from 'react-router-dom';

function SiteInstitucional() {
  const [selectedEspecialidade, setSelectedEspecialidade] = useState({});
  const navigate = useNavigate();

  const especialidades = [
    { id: 1, name: "Direito Civil", icon: "./Scales.svg", text: "Nossa equipe assessora clientes em uma ampla gama de questões no Direito Civil...", link: "" },
    { id: 2, name: "Direito do Trabalho", icon: "./Briefcase.svg", text: "Avaliamos e orientamos nossos clientes sobre direitos e obrigações trabalhistas...", link: "" },
    { id: 3, name: "Direito da Familia", icon: "./FullFamily.svg", text: "Com sensibilidade e precisão, nossa equipe acompanha processos relacionados a divórcios...", link: "" },
    { id: 4, name: "Direito do Consumidor", icon: "./ShoppingBag.svg", text: "Auxiliamos tanto consumidores quanto empresas em questões que envolvem relações de consumo...", link: "" },
    { id: 5, name: "Direito Imobiliario", icon: "./LawCourt.svg", text: "Com vasta experiência no setor imobiliário, atuamos em contratos de compra e venda...", link: "" },
    { id: 6, name: "Marcas e patentes", icon: "./Quail.svg", text: "A proteção da propriedade intelectual é fundamental, e nosso escritório oferece um suporte completo...", link: "" },
    { id: 7, name: "Consultoria Juridica", icon: "./Consultation.svg", text: "Nossa consultoria é voltada para pessoas físicas e jurídicas que buscam orientação...", link: "" },
  ];

  useEffect(() => {
    setSelectedEspecialidade(especialidades[0]);
  }, []);

  const seletorEspecialidade = (especialidade) => {
    setSelectedEspecialidade(especialidade);
  };

  const saibaMais = () => {
    window.location.href = "https://api.whatsapp.com/send?phone=5511989833914&text=Ol%C3%A1%20Dr.%20Felipe,%20como%20vai?%20Pode%20me%20ajudar";
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 bg-azulEscuroForte scroll-smooth overflow-x-hidden">
      <header className="bg-azulEscuroForte py-4 px-[5%] w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-[8rem] h-[8.5rem] object-contain" />
            <div className="text-white leading-tight">
              <p className="text-3xl font-bold">LAURIANO & LEÃO SOCIEDADE</p>
              <p className="text-3xl font-bold">DE ADVOGADOS</p>
            </div>
          </div>

          <nav className="flex gap-4">
            <a href="#sobre" className="text-dourado border-[2px] border-dourado px-5 py-2.5 text-xl font-semibold rounded-lg hover:bg-dourado hover:text-azulEscuroForte transition">Sobre nós</a>
            <a href="#contatos" className="text-dourado border-[2px] border-dourado px-5 py-2.5 text-xl font-semibold rounded-lg hover:bg-dourado hover:text-azulEscuroForte transition">Contato</a>
            <a href="#podcast" className="text-dourado border-[2px] border-dourado px-5 py-2.5 text-xl font-semibold rounded-lg hover:bg-dourado hover:text-azulEscuroForte transition">Podcast</a>
            <button onClick={() => navigate('/login')} className="text-dourado border-[2px] border-dourado px-5 py-2.5 text-xl font-semibold rounded-lg hover:bg-dourado hover:text-azulEscuroForte transition">Login</button>
          </nav>
        </div>
      </header>

      <section className="bg-azulEscuroFraco w-[90%] flex flex-col items-center justify-center p-10 rounded-lg gap-6">
        <h2 className="text-dourado text-center text-3xl md:text-4xl font-semibold leading-snug">
          Compromisso com a excelência e <br /> soluções personalizadas em advocacia
        </h2>
        <p className="text-white text-center text-lg md:text-xl max-w-3xl leading-relaxed">
          Oferecemos soluções judiciais personalizadas, focados na defesa dos interesses e direitos de nossos clientes...
        </p>
        <button className="border-2 border-dourado text-dourado px-6 py-3 rounded-lg text-lg font-medium hover:bg-dourado hover:text-azulEscuroForte transition-all">
          Saiba Mais
        </button>
      </section>

      <section id="sobre" className="flex flex-col lg:flex-row justify-between m-8 p-8 w-[90%] rounded-lg gap-8">
        <div className="flex flex-col w-full lg:max-w-[48%] bg-azulEscuroFraco p-6 rounded-lg h-[40rem]">
          <h2 className="text-dourado text-3xl font-bold text-center mb-6">Sobre nós</h2>
          <p className="text-white text-justify text-lg mb-4">A Lauriano & Leão Sociedade de Advogados é um escritório comprometido...</p>
          <p className="text-white text-justify text-lg mb-4">Nossa equipe é especializada em uma ampla gama de questões...</p>
          <p className="text-white text-justify text-lg mb-4">Os sócios, Raíssa Leão Marqueze e Felipe Lauriano Rocha Marqueze...</p>
          <p className="text-white text-justify text-lg mb-4">Além do atendimento jurídico, o escritório busca constantemente inovar...</p>
        </div>

        <div className="flex flex-col w-full lg:max-w-[48%] bg-azulEscuroFraco p-6 rounded-lg h-[40rem]">
          <h2 className="text-dourado text-3xl font-bold text-center mb-6">Especialidades</h2>
          <div className="flex flex-col md:flex-row justify-evenly mt-6 gap-4">
            <ul className="list-none p-0 m-0">
              {especialidades.map((especialidade) => (
                <li key={especialidade.id} className="mb-4">
                  <button
                    onClick={() => seletorEspecialidade(especialidade)}
                    className={`rounded-md p-6 w-full h-16 text-center text-xl transition duration-300 ${selectedEspecialidade.id === especialidade.id ? 'bg-dourado text-white' : 'bg-white text-black'} hover:bg-dourado hover:text-white`}
                  >
                    {especialidade.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center text-center max-w-[50%]">
              <img src={selectedEspecialidade.icon} alt="icone de especialidade" className="w-20 h-20" />
              <p className="text-white mt-4 mb-4">{selectedEspecialidade.text}</p>
              <button className="border border-dourado text-dourado bg-transparent rounded-md p-4 w-full text-xl transition duration-300 font-bold hover:bg-dourado hover:text-azulEscuroForte">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-screen bg-azulEscuroForte min-h-[90vh] flex flex-col items-center justify-center">
        <h2 className="text-center text-3xl font-bold text-dourado mb-8">Nossos Advogados</h2>
        <CarroselAdvogados />
      </section>

      <section id="podcast" className="bg-azulEscuroFraco w-[90%] flex flex-col items-center justify-center p-5 rounded-md">
        <h2 className="text-3xl font-bold text-dourado mb-4 text-center">Lauriano & Leão Cast</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full">
          <div className="w-full md:w-3/3"><PlayerVideo /></div>
          <div className="w-full md:w-1/3"><MidiaSocial /></div>
          <div className="w-full md:w-2/3"><CatalogoVideos /></div>
        </div>
      </section>

      <section id="contatos" className="bg-azulEscuroFraco w-[90%] flex flex-col items-center justify-center p-5 rounded-md">
        <hr className="border-t border-white w-full mb-5" />
        <h2 className="text-3xl font-bold text-dourado mb-6">Nossos Contatos</h2>

        <div className="flex flex-row items-center gap-2.5 mb-2.5">
          <img src="/instagram.svg" alt="Instagram" className="w-7 h-7" />
          <p className="underline cursor-pointer text-white" onClick={() => window.location.href = "https://www.instagram.com/laurianoleaoadv/"}>@laurianoleaoadv</p>
        </div>

        <div className="flex flex-row items-center gap-2.5 mb-2.5">
          <img src="/whatsapp.svg" alt="WhatsApp" className="w-7 h-7" />
          <p className="underline cursor-pointer text-white" onClick={saibaMais}>+55 11 98983-3914</p>
        </div>

        <div className="flex flex-row items-center gap-2.5 mb-2.5">
          <img src="/whatsapp.svg" alt="WhatsApp" className="w-7 h-7" />
          <p className="underline text-white">+55 11 93207-4268</p>
        </div>

        <div className="flex flex-row items-center gap-2.5 mb-2.5">
          <img src="/email.svg" alt="Email" className="w-7 h-7" />
          <p className="underline text-white">raissaleao@laurianoleaoadvogados.com.br</p>
        </div>

        <div className="flex flex-row items-center gap-2.5 mb-2.5">
          <img src="/email.svg" alt="Email" className="w-7 h-7" />
          <p className="underline text-white">felipelauriano@laurianoleaoadvogados.com.br</p>
        </div>
        <hr className="border-t border-white w-full mt-5" />
      </section>

      <footer className="w-full flex flex-col md:flex-row justify-between items-center px-36 py-2.5 bg-dourado text-center gap-2">
        <p className="text-lg">Política de Privacidade</p>
        <p className="text-lg">© Lauriano & Leão Sociedade de Advogados | Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default SiteInstitucional;
