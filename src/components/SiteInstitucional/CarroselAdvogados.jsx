import { useState } from 'react';
import '../../estilos/CarroselAdvogados.css';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function CarroselAdvogados() {
    const advogados = [
        {
            id: 1,
            name: "Felipe Lauriano Rocha Marqueze",
            cargo: "CEO e Advogado de Direito Imobiliário",
            image: "../../assets/images/SiteInstitucional/felipeAdvogado.png",
            text1: "Felipe Lauriano Rocha Marqueze é graduado em Direito pela FMU e pós-graduando em Direito do Trabalho e Processo do Trabalho.",
            text2: "Com experiência no mercado imobiliário, Felipe atua como palestrante e integra a Comissão de Direito Processual Civil da OAB Tatuapé.",
            text3: "É coautor do livro Direitos Humanos, Ética e Democracia na Sociedade da Informação, abordando temas contemporâneos.",
            text4: "Também é host do Lauriano & Leão Cast, podcast sobre temas jurídicos e discussões relevantes para advogados."
        },
        {
            id: 2,
            name: "Raissa Leão Marqueze",
            cargo: "CEO e Advogada de Direito Civil",
            image: "../../assets/images/SiteInstitucional/raissaAdvogada.png",
            text1: "Raíssa Leão Marqueze é formada em Direito pela Universidade Cruzeiro do Sul e está se especializando em Direito Civil e Processo Civil.",
            text2: "Atua na Comissão de Direito Processual Civil da OAB Tatuapé, contribuindo para o aprimoramento da área.",
            text3: "É uma das vozes do Lauriano & Leão Cast, podcast jurídico com discussões sobre temas contemporâneos.",
            text4: "Destaca-se pelo atendimento personalizado, focado nas necessidades e no profissionalismo com seus clientes."
        },
        {
            id: 3,
            name: "João Pedro Nogueira",
            cargo: "Consultor Jurídico",
            image: "../src/assets/SiteInstitucional/advogado1.png",
            text1: "João Pedro Nogueira tem ampla experiência em consultoria jurídica para empresas, ajudando a mitigar riscos legais.",
            text2: "Ele é formado pela Mackenzie e possui MBA em Gestão Empresarial pela FGV.",
            text3: "João também é mentor de jovens advogados e participa de iniciativas de educação jurídica.",
            text4: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
        },
        {
            id: 4,
            name: "Ana Mendes Nogueira",
            cargo: "Advogada Ambiental",
            image: "../src/assets/advogada1.png",
            text1: "Ana Mendes é formada pela UFRJ e atua na área de Direito Ambiental, auxiliando empresas a se adequarem às legislações ambientais.",
            text2: "Ela é uma defensora ativa da sustentabilidade e participa de projetos de preservação ambiental.",
            text3: "Ana também escreve regularmente sobre temas ambientais em blogs e revistas especializadas.",
            text4: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
        },
        {
            id: 5,
            name: "Ricardo Oliveira Santos",
            cargo: "Advogado em foco Criminalista",
            image: "../src/assets/advogado1.png",
            text1: "Ricardo Oliveira Santos é formado pela UNESP e possui vasta experiência em casos criminais de alta complexidade.",
            text2: "Ele é conhecido por sua ética e dedicação em garantir um julgamento justo para seus clientes.",
            text3: "Ricardo também ministra cursos sobre Direito Penal em instituições renomadas.",
            text4: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
        },
        {
            id: 6,
            name: "Fernanda Rocha Lima",
            cargo: "Advogada Tributária",
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