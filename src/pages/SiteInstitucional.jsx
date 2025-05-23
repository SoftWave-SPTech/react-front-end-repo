import React, { useEffect, useState } from 'react';
import '../estilos/SiteInstitucional.css';
import CarroselAdvogados from '../components/SiteInstitucional/CarroselAdvogados.jsx';
import PlayerVideo from '../components/SiteInstitucional/playerVideo.jsx';
import MidiaSocial from '../components/SiteInstitucional/midiaSocial.jsx';
import CatalogoVideos from '../components/SiteInstitucional/catalogoVideos.jsx';
import { Navigate } from 'react-router-dom';

function SiteInstitucional() {
    const [selectedEspecialidade, setSelectedEspecialidade] = useState({});

    const especialidades = [
        { id: 1, name: "Direito Civil", icon: "./Scales.svg", text: "Nossa equipe assessora clientes em uma ampla gama de questões no Direito Civil, incluindo contratos e litígios. Trabalhamos de maneira próxima aos clientes para compreender suas necessidades específicas e oferecer soluções jurídicas que protejam seus interesses, sempre com uma abordagem estratégica e assertiva.", link: "" },
        { id: 2, name: "Direito do Trabalho", icon: "./Briefcase.svg", text: "Avaliamos e orientamos nossos clientes sobre direitos e obrigações trabalhistas, sejam eles empregadores ou empregados. Com foco nas peculiaridades de cada caso, nossa atuação inclui rescisões contratuais, assédio, questões de jornada de trabalho e outros temas relacionados ao ambiente laboral, oferecendo um suporte técnico e atento às nuances das relações de trabalho", link: "" },
        { id: 3, name: "Direito da Familia", icon: "./FullFamily.svg", text: "Com sensibilidade e precisão, nossa equipe acompanha processos relacionados a divórcios, guarda de filhos, pensão alimentícia, além de questões de planejamento sucessório e inventário. Entendemos a importância de um atendimento cuidadoso em momentos delicados, sempre buscando a melhor solução para nossos clientes.", link: "" },
        { id: 4, name: "Direito do Consumidor", icon: "./ShoppingBag.svg", text: "Auxiliamos tanto consumidores quanto empresas em questões que envolvem relações de consumo, como cobranças indevidas, práticas abusivas e litígios. Nossa equipe adota uma abordagem detalhada e técnica para assegurar que os direitos dos nossos clientes sejam respeitados e defendidos.", link: "" },
        { id: 5, name: "Direito Imobiliario", icon: "./LawCourt.svg", text: "Com vasta experiência no setor imobiliário, atuamos em contratos de compra e venda, locações, regularização de imóveis, usucapião, entre outros. Nossa equipe compreende as particularidades do mercado e busca sempre soluções rápidas e eficientes para nossos clientes, com uma atuação estratégica e assertiva.", link: "" },
        { id: 6, name: "Marcas e patentes", icon: "./Quail.svg", text: "A proteção da propriedade intelectual é fundamental, e nosso escritório oferece um suporte completo para o registro, monitoramento e defesa de marcas e patentes. Acompanhamos cada etapa do processo, garantindo que os direitos de nossos clientes sobre suas criações e inovações estejam sempre resguardados.", link: "" },
        { id: 7, name: "Consultoria Juridica", icon: "./Consultation.svg", text: "Nossa consultoria é voltada para pessoas físicas e jurídicas que buscam orientação sobre riscos e melhores práticas jurídicas. Nos empenhamos em entender o contexto e os objetivos de nossos clientes, oferecendo soluções personalizadas que atendam suas necessidades e promovam segurança jurídica em suas operações.", link: "" },
    ]

    useEffect(() => {
        const defaultEspecialidade = especialidades[0];
        setSelectedEspecialidade(defaultEspecialidade);
    }, []);



    const seletorEspecialidade = (especialidade) => {
        setSelectedEspecialidade(especialidade);
    }

    const saibaMais = () => {
        window.location.href = 
    "https://api.whatsapp.com/send?phone=5511989833914&text=Ol%C3%A1%20Dr.%20Felipe,%20como%20vai?%20Pode%20me%20ajudar"};

    return (
        <div className="site-institucional">
            <header className='header-container'>
                <img src="../src/assets/leaoLogo.png" alt="" />
                <div className='header-title'>
                    <h1>LAURIANO & LEAO SOCIEDADE</h1>
                    <h1>DE ADVOGADOS</h1>
                </div>
                <div alt="div para o menu" className='header-menu'>
                    <ul className='header-list'>
                        <li><button className='button-gold-style' onClick={() => document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' })}>Sobre Nós</button></li>
                        <li><button className='button-gold-style' onClick={() => document.getElementById('contatos').scrollIntoView({ behavior: 'smooth' })}>Contato</button></li>
                        <li><button className='button-gold-style' onClick={() => document.getElementById('podcast').scrollIntoView({ behavior: 'smooth' })}>PodCast</button></li>
                        <li><button className='button-gold-style' onClick={() => window.location.href = "/login"}>login</button></li>
                    </ul>
                </div>
            </header>
            <section alt="banner introdutorio" className='container-site banner-intro'>
                <h2 className='titulos-containers'>Compromisso com a excelência e <br /> soluções personalizadas em advocacia</h2>
                <p className='textos-containers'>Oferecemos soluções judiciais personalizadas, focados na defesa dos interesses e direitos de nossos clientes. Atuamos em diversas áreas do mundo jurídico com expertise, para garantir um atendimento de excelência e confiança</p>
                <button className='button-gold-style' onClick={saibaMais}>Saiba Mais</button>
            </section>
            <section id='sobre' alt="banner duplo" className='container-site banner-duplo'>
                <div className='sobre-nos'>
                    <h2 className='titulos-containers'>Sobre nós</h2>
                    <p>
                        A Lauriano & Leão Sociedade de Advogados é um escritório comprometido em oferecer serviços jurídicos de excelência, com foco em Direito Civil, Direito de Família e áreas correlatas. Atuamos de forma estratégica e personalizada, sempre buscando soluções eficazes que atendam às necessidades e interesses de nossos clientes.
                    </p>
                    <p>
                        Nossa equipe é especializada em uma ampla gama de questões, incluindo contratos, litígios, ações de divórcio, união estável, reconhecimento de paternidade, guarda e visitas. Trabalhamos com responsabilidade e proximidade, oferecendo um atendimento que preza pela ética, transparência e resultados sólidos.
                    </p>
                    <p>
                        Os sócios, Raíssa Leão Marqueze e Felipe Lauriano Rocha Marqueze, possuem sólida formação acadêmica e vasta experiência profissional. Ambos também são hosts do Lauriano & Leão Cast, um podcast que aborda temas contemporâneos do universo jurídico, promovendo discussões relevantes e enriquecedoras para advogados e profissionais da área.
                    </p>
                    <p>
                        Além do atendimento jurídico, o escritório busca constantemente inovar em suas práticas e serviços, mantendo-se atualizado com as tendências do mercado e oferecendo soluções modernas que acompanham as transformações sociais e jurídicas
                    </p>
                </div>
                <div className='especialidades'>
                    <h2 className='titulos-containers'>Especialidades</h2>
                    <div className='especialidades-container'>
                        <div alt="botoes esquerda ">
                            <ul>
                                {especialidades.map((especialidade) => (
                                    <li key={especialidade.id}>
                                        <button
                                            onClick={() => seletorEspecialidade(especialidade)}
                                            disabled={selectedEspecialidade.id === especialidade.id}
                                            className={`button-selector ${selectedEspecialidade.id === especialidade.id ? 'selecionado' : ''}`}
                                        >
                                            {especialidade.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div alt="texto direita" className='especialidade-texto'>
                            <img src={selectedEspecialidade.icon} alt="icone de cada especialidade" className='icon-especialidades' />
                            <p className='textos-containers'>{selectedEspecialidade.text}</p>
                            <button className='button-gold-style' onClick={saibaMais}>Saiba Mais</button>
                        </div>
                    </div>
                </div>
            </section>

            <section alt="banner advogados" className='container-site'>
                <h2 className='titulos-containers'>Nossos Advogados</h2>
                <CarroselAdvogados />
            </section>

            <section id='podcast' alt="banner podcast" className='container-site'>
                <h2 className='titulos-containers'>Lauriano & Leão Cast</h2>
                {/* Todo, player video, dois icones de spotify e yotube com links para o podcast, e catalogo de videos */}
                <div className='banner-podcast'>
                    <div className='podcast-container'>
                        <PlayerVideo />
                    </div>
                    <div className='podcast-icon'>
                        <MidiaSocial />
                    </div>
                    <div className='podcast-catalog'>
                        <CatalogoVideos />
                    </div>
                </div>
            </section>
            <section id='contatos' alt="banner contato" className='container-site banner-contatos'>
                <hr className='hr-style'/>
                <h2 className='titulos-containers'>Nossos Contatos</h2>
                <div className='contato-container'>
                    <img src="/instagram.svg" alt="icone instagram" className="icon-site-maior" />
                    <p className='sublinhado' onClick={() => window.location.href = "https://www.instagram.com/laurianoleaoadv/"}>@laurianoleaoadv</p>
                </div>
                <div className='contato-container'>
                    <img src="/whatsapp.svg" alt="icone whatsapp" className="icon-site" />
                    <p className='sublinhado' onClick={saibaMais}>+55 11 98983-3914</p>
                </div>
                <div className='contato-container'>
                    <img src="/whatsapp.svg" alt="icone whatsapp" className="icon-site" />
                    <p className='sublinhado'>+55 11 93207-4268</p>
                </div>
                <div className='contato-container'>
                    <img src="/email.svg" alt="Icone Email" className="icon-site" />
                    <p className='sublinhado'>raissaleao@laurianoleaoadvogados.com.br</p>
                </div>
                <div className='contato-container'>
                    <img src="/email.svg" alt="Icone Email" className="icon-site" />
                    <p className='sublinhado'>felipelauriano@laurianoleaoadvogados.comm.br</p>
                </div>
                <hr className='hr-style'/>
            </section>

            <footer alt="rodape" className='footer-container'>
                <p>Política de Privacidade</p>
                <p>© Lauriano & Leão Sociedade de Advogados | Todos os direitos reservados.</p>
            </footer>
        </div>
    )
};

export default SiteInstitucional;