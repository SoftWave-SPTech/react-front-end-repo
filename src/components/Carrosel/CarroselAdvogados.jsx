import { useState } from 'react';
import './CarroselAdvogados.css';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function CarroselAdvogados() {
    const advogados = [
        {
            id: 1,
            name: "Felipe Lauriano Rocha Marqueze",
            cargo: "CEO e Advogado de Direito Imobiliário",
            image: "../src/assets/felipeAdvogado.png",
            text1: "Felipe Lauriano Rocha Marqueze é graduado em Direito pela FMU (Faculdades Metropolitanas Unidas) e pós-graduando em Direito do Trabalho e Processo do Trabalho.",
            text2: "Com ampla experiência no mercado imobiliário, também se destaca como palestrante, participante ativo da Comissão de Direito Processual Civil da OAB Tatuapé e formador de opinião em eventos jurídicos e imobiliários.",
            text3: "Além de sua atuação profissional, Felipe é coautor do livro Direitos Humanos, Ética e Democracia na Sociedade da Informação, no qual contribui com reflexões sobre temas contemporâneos de grande relevância.",
            text4: "Ele também é um dos hosts do Lauriano & Leão Cast, um podcast que explora uma ampla gama de temas jurídicos, oferecendo insights e discussões para advogados e profissionais interessados no universo do direito."
        },
        {
            id: 2,
            name: "Raissa Leão Marqueze",
            cargo: "CEO e Advogada de Direito Civil",
            image: "../src/assets/raissaAdvogada.png",
            text1: "Formada em Direito pela Universidade Cruzeiro do Sul e com especialização em andamento em Direito Civil e Processo Civil, Raíssa Leão Marqueze atua com uma abordagem sólida e atualizada na prática jurídica. ",
            text2: "É membra ativa da Comissão de Direito Processual Civil da OAB Tatuapé, onde se dedica ao aprimoramento de seus conhecimentos e contribui para o desenvolvimento da área.",
            text3: "Além da advocacia, Raíssa é uma das vozes do Lauriano & Leão Cast, podcast jurídico que traz discussões e insights sobre temas contemporâneos do universo jurídico.",
            text4: "Com experiência na área, destaca-se pelo compromisso em oferecer um atendimento personalizado e de qualidade, sempre focada em atender às necessidades de seus clientes com dedicação e profissionalismo.",
        },
        {
            id: 3,
            name: "João Pedro Nogueira",
            cargo: "Consultor Jurídico",
            image: "../src/assets/advogado1.png",
            text1: "João Pedro Nogueira tem ampla experiência em consultoria jurídica para empresas, ajudando a mitigar riscos legais.",
            text2: "Ele é formado pela Mackenzie e possui MBA em Gestão Empresarial pela FGV.",
            text3: "João também é mentor de jovens advogados e participa de iniciativas de educação jurídica.",
            text4: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
        },
        {
            id: 4,
            name: "Ana Beatriz Mendes",
            cargo: "Especialista em Direito Ambiental",
            image: "../src/assets/advogada1.png",
            text1: "Ana Beatriz Mendes é formada pela UFRJ e atua na área de Direito Ambiental, auxiliando empresas a se adequarem às legislações ambientais.",
            text2: "Ela é uma defensora ativa da sustentabilidade e participa de projetos de preservação ambiental.",
            text3: "Ana também escreve regularmente sobre temas ambientais em blogs e revistas especializadas.",
            text4: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
        },
        {
            id: 5,
            name: "Ricardo Oliveira Santos",
            cargo: "Advogado Criminalista",
            image: "../src/assets/advogado1.png",
            text1: "Ricardo Oliveira Santos é formado pela UNESP e possui vasta experiência em casos criminais de alta complexidade.",
            text2: "Ele é conhecido por sua ética e dedicação em garantir um julgamento justo para seus clientes.",
            text3: "Ricardo também ministra cursos sobre Direito Penal em instituições renomadas.",
            text4: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
        },
        {
            id: 6,
            name: "Fernanda Rocha Lima",
            cargo: "Advogada de Direito Tributário",
            image: "../src/assets/advogada1.png",
            text1: "Fernanda Rocha Lima é especialista em Direito Tributário e ajuda empresas a otimizarem sua carga tributária de forma legal.",
            text2: "Ela é formada pela UFMG e possui pós-graduação em Direito Tributário pela FGV.",
            text3: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
            text4: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
        },
    ];

    const [startIndex, setStartIndex] = useState(0); // Índice inicial dos advogados exibidos

    const handleNext = () => {
        // Avança para os próximos dois advogados
        console.log("StartIndex antes de voltar:")
        console.log(startIndex);
        console.log("Advogados.length:")
        console.log(advogados.length);
        if (startIndex + 2 < advogados.length) {
            setStartIndex(startIndex + 2);
        }
        console.log("StartIndex depois de voltar:")
        console.log(startIndex);
    };

    const handlePrev = () => {
        // Volta para os dois advogados anteriores
        console.log("StartIndex antes de voltar:")
        console.log(startIndex);
        console.log("Advogados.length:")
        console.log(advogados.length);
        if (startIndex - 2 >= 0) {
            setStartIndex(startIndex - 2);
        }
        console.log("StartIndex depois de voltar:")
        console.log(startIndex);
    };

    return (
        <div className='carrosel'>
            <button className={`button-left ${startIndex === 0 ? "non-view" : ""}`} onClick={handlePrev} disabled={startIndex === 0}>{"〈"}</button>
            {
                advogados.slice(startIndex, startIndex + 2).map((advogado) => (
                    <div key={advogado.id} className='advogado-card'>
                        <div className='advogado-info'>
                            <img src={advogado.image} alt="" />
                            <div className='advogado-details'>
                                <h3 className='titulos-containers'>{advogado.name}</h3>
                                <h4>{advogado.cargo}</h4>
                            </div>
                        </div>
                        <div className='advogado-texto'>
                            <p>{advogado.text1}</p>
                            <p>{advogado.text2}</p>
                            <p>{advogado.text3}</p>
                            <p>{advogado.text4}</p>
                        </div>
                    </div>
                ))
            }
            <button className={`button-right ${startIndex + 2 >= advogados.length ? "non-view" : ""}`} onClick={handleNext} disabled={startIndex + 2 >= advogados.length}>{"〉"}</button>
        </div>
    );
}

export default CarroselAdvogados;