import React, { useEffect, useState } from 'react';
import CarroselAdvogados from '../components/SiteInstitucional/CarroselAdvogados.jsx';
import PlayerVideo from '../components/SiteInstitucional/PlayerVideo.jsx';
import MidiaSocial from '../components/SiteInstitucional/MidiaSocial.jsx';
import CatalogoVideos from '../components/SiteInstitucional/CatalogoVideos.jsx';
import logo from '../assets/images/SiteInstitucional/leaologo.png';
import estatuaJustica from '../assets/images/SiteInstitucional/EstatuaJustica.png';
import { useNavigate } from 'react-router-dom';

function SiteInstitucional() {
  const [selectedEspecialidade, setSelectedEspecialidade] = useState({});
  const navigate = useNavigate();

  const especialidades = [
    { id: 1, name: "Direito Civil", icon: "./Scales.svg", text: "Nossa equipe assessora clientes em uma ampla gama de questões no Direito Civil, incluindo contratos e litígios. Trabalhamos de maneira próxima aos clientes para compreender suas necessidades específicas e oferecer soluções jurídicas que protejam seus interesses, sempre com uma abordagem estratégica e assertiva.", link: "" },
    { id: 2, name: "Direito do Trabalho", icon: "./Briefcase.svg", text: "Prestamos orientação a empregadores e empregados sobre direitos e deveres trabalhistas, com atenção às particularidades de cada caso. Atuamos em rescisões contratuais, assédio, jornada de trabalho e demais questões do ambiente laboral, oferecendo suporte técnico e personalizado.", link: "" },
    { id: 3, name: "Direito da Familia", icon: "./FullFamily.svg", text: "Com sensibilidade e precisão, nossa equipe acompanha processos relacionados a divórcios, guarda de filhos, pensão alimentícia, além de questões de planejamento sucessório e inventário. Entendemos a importância de um atendimento cuidadoso em momentos delicados, sempre buscando a melhor solução para nossos clientes.", link: "" },
    { id: 4, name: "Direito do Consumidor", icon: "./ShoppingBag.svg", text: "Auxiliamos tanto consumidores quanto empresas em questões que envolvem relações de consumo, como cobranças indevidas, práticas abusivas e litígios. Nossa equipe adota uma abordagem detalhada e técnica para assegurar que os direitos dos nossos clientes sejam respeitados e defendidos.", link: "" },
    { id: 5, name: "Direito Imobiliario", icon: "./LawCourt.svg", text: "Com vasta experiência no setor imobiliário, atuamos em contratos de compra e venda, locações, regularização de imóveis, usucapião, entre outros. Nossa equipe compreende as particularidades do mercado e busca sempre soluções rápidas e eficientes para nossos clientes, com uma atuação estratégica e assertiva.", link: "" },
    { id: 6, name: "Marcas e patentes", icon: "./Quail.svg", text: "A proteção da propriedade intelectual é fundamental, e nosso escritório oferece um suporte completo para o registro, monitoramento e defesa de marcas e patentes. Acompanhamos cada etapa do processo, garantindo que os direitos de nossos clientes sobre suas criações e inovações estejam sempre resguardados.", link: "" },
    { id: 7, name: "Consultoria Juridica", icon: "./Consultation.svg", text: "Consultoria Juridica", icon: "./Consultation.svg", text: "Nossa consultoria é voltada para pessoas físicas e jurídicas que buscam orientação sobre riscos e melhores práticas jurídicas. Nos empenhamos em entender o contexto e os objetivos de nossos clientes, oferecendo soluções personalizadas que atendam suas necessidades e promovam segurança jurídica em suas operações.", link: "" },
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
    <>
      <div
        className="relative w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(7, 17, 43, 0.85), rgba(7, 17, 43, 0.85)), url(${estatuaJustica})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <header className="bg-transparent py-4 px-[5%] w-full">
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

        <section
          className="relative w-full min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden"
        >
          <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-dourado text-4xl md:text-5xl font-extrabold text-center mb-4 max-w-5xl mx-auto break-words">Compromisso com a excelência e soluções personalizadas em advocacia</h1>
            
            <p className="text-white text-center text-lg md:text-xl max-w-3xl leading-relaxed mb-6">
              Oferecemos soluções judiciais personalizadas, focados na defesa dos interesses e direitos de nossos clientes. Atuamos em diversas áreas do mundo jurídico com expertise, para garantir um atendimento de excelência e confiança
            </p>
            <button className="border-2 border-dourado text-dourado px-6 py-3 rounded-lg text-lg font-medium hover:bg-dourado hover:text-azulEscuroForte transition-all" onClick={saibaMais}>
              Saiba Mais
            </button>
          </div>
        </section>
        
        <div
          className="absolute left-0 bottom-0 w-full h-32 pointer-events-none z-30"
          style={{
            background: 'linear-gradient(to bottom, rgba(7,17,43,0) 0%, #070d2b 100%)'
          }}
        />
      </div>

      
      <div className="w-full flex flex-col items-center  bg-azulEscuroForte scroll-smooth overflow-x-hidden"
      
      >
        <section
          id="sobre"
          className="flex flex-col lg:flex-row justify-between items-stretch mt-8 p-8 w-[100%] rounded-lg gap-8"
          style={{
            background: 'linear-gradient(to top, #181e36 10%, rgba(7,17,43,0) 100%)'
          }}
        >
          <div className="flex flex-col flex-1 max-w-[48%] bg-transparent p-6 rounded-lg h-[43rem]">
            <h2 className="text-dourado text-3xl font-bold text-center mb-6">Sobre nós</h2>
            <div className="flex-1 overflow-y-auto pr-2">
              <p className="text-white text-justify text-base mb-4">
                A Lauriano & Leão Sociedade de Advogados é um escritório comprometido em oferecer serviços jurídicos de excelência, com foco em Direito Civil, Direito de Família e áreas correlatas. Atuamos de forma estratégica e personalizada, sempre buscando soluções eficazes que atendam às necessidades e interesses de nossos clientes.
              </p>
              <p className="text-white text-justify text-base mb-4">
                Nossa equipe é especializada em uma ampla gama de questões, incluindo contratos, litígios, ações de divórcio, união estável, reconhecimento de paternidade, guarda e visitas. Trabalhamos com responsabilidade e proximidade, oferecendo um atendimento que preza pela ética, transparência e resultados sólidos.
              </p>
              <p className="text-white text-justify text-base mb-4">
                Os sócios, Raíssa Leão Marqueze e Felipe Lauriano Rocha Marqueze, possuem sólida formação acadêmica e vasta experiência profissional. Ambos também são hosts do Lauriano & Leão Cast, um podcast que aborda temas contemporâneos do universo jurídico, promovendo discussões relevantes e enriquecedoras para advogados e profissionais da área.
              </p>
              <p className="text-white text-justify text-base mb-4">
                Além do atendimento jurídico, o escritório busca constantemente inovar em suas práticas e serviços, mantendo-se atualizado com as tendências do mercado e oferecendo soluções modernas que acompanham as transformações sociais e jurídicas.
              </p>
            </div>
          </div>

          <div className="flex flex-col flex-1 max-w-[48%] bg-transparent p-6 rounded-lg h-[43rem]">
            <h2 className="text-dourado text-3xl font-bold text-center mb-10">Especialidades</h2>
            <div className="flex flex-row justify-evenly items-start gap-10 h-full">
              <ul className="flex flex-col gap-4 w-[15rem]">
                {especialidades.map((especialidade) => (
                  <li key={especialidade.id}>
                    <button
                      onClick={() => seletorEspecialidade(especialidade)}
                      className={`rounded-lg w-full h-12 text-base font-medium transition
                        ${selectedEspecialidade.id === especialidade.id
                          ? 'bg-dourado text-white'
                          : 'bg-white text-black hover:bg-dourado hover:text-white border border-dourado'
                        }`}
                    >
                      {especialidade.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-center text-center flex-1 max-w-[28rem] min-w-[18rem]">
                <img
                  src={selectedEspecialidade.icon}
                  alt="icone de especialidade"
                  className="w-16 h-16 mb-6"
                />
                <div className="text-white mb-4 h-[15rem] w-full max-w-[28rem] overflow-y-auto break-words flex items-center justify-center">
                  <p className="text-base">{selectedEspecialidade.text}</p>
                </div>
                <button
                  className="border border-dourado text-dourado bg-transparent rounded-md px-4 py-2 w-[10rem] text-base font-bold transition hover:bg-dourado hover:text-azulEscuroForte mt-12"
                  onClick={saibaMais}
                >
                  Saiba Mais
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-screen min-h-[90vh] flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(to bottom, #181e36 20%, rgba(7,17,43,0) 100%)'
          }}
        >
          <h2 className="text-center text-3xl font-bold text-dourado mb-8" >Nossos Advogados</h2>
          <CarroselAdvogados />
        </section>

        <section id="podcast" className=" flex flex-col items-center justify-center p-5 rounded-md"
          style={{
            background: 'linear-gradient(to top, #181e36 10%, rgba(7,17,43,0) 100%)'
          }}
        >
          <h2 className="text-3xl font-bold text-dourado mb-4 text-center">Lauriano & Leão Cast</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full">
            <div className="w-full md:w-3/3"><PlayerVideo /></div>
            <div className="w-full md:w-1/3"><MidiaSocial /></div>
            <div className="w-full md:w-2/3"><CatalogoVideos /></div>
          </div>
        </section>

        <section id="contatos" className="bg-azulEscuroFraco w-[100%] flex flex-col items-center justify-center p-5 rounded-md"
        style={{
          background: 'linear-gradient(to bottom, #181e36 20%, rgba(7,17,43,0) 100%)'
        }}
        >
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
    </>
  );
}

export default SiteInstitucional;
