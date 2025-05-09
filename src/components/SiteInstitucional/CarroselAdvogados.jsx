import { useRef, useState } from 'react';
import '../../estilos/CarroselAdvogados.css';
import Carousel from 'react-bootstrap/Carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation , Pagination} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function CarroselAdvogados() {
    const advogados = [
        {
            id: 1,
            name: "Felipe Lauriano Rocha Marqueze",
            cargo: "CEO e Advogado de Direito Imobiliário",
            image: "../src/assets/images/SiteInstitucional/felipeAdvogado.png",
            text1: "Felipe Lauriano Rocha Marqueze é graduado em Direito pela FMU e pós-graduando em Direito do Trabalho e Processo do Trabalho.",
            text2: "Com experiência no mercado imobiliário, Felipe atua como palestrante e integra a Comissão de Direito Processual Civil da OAB Tatuapé.",
            text3: "É coautor do livro Direitos Humanos, Ética e Democracia na Sociedade da Informação, abordando temas contemporâneos.",
            text4: "Também é host do Lauriano & Leão Cast, podcast sobre temas jurídicos e discussões relevantes para advogados."
        },
        {
            id: 2,
            name: "Raissa Leão Marqueze",
            cargo: "CEO e Advogada de Direito Civil",
            image: "../src/assets/images/SiteInstitucional/raissaAdvogada.png",
            text1: "Raíssa Leão Marqueze é formada em Direito pela Universidade Cruzeiro do Sul e está se especializando em Direito Civil e Processo Civil.",
            text2: "Atua na Comissão de Direito Processual Civil da OAB Tatuapé, contribuindo para o aprimoramento da área.",
            text3: "É uma das vozes do Lauriano & Leão Cast, podcast jurídico com discussões sobre temas contemporâneos.",
            text4: "Destaca-se pelo atendimento personalizado, focado nas necessidades e no profissionalismo com seus clientes."
        },
        {
            id: 3,
            name: "João Pedro Nogueira",
            cargo: "Consultor Jurídico",
            image: "../src/assets/images/SiteInstitucional/advogado1.png",
            text1: "João Pedro Nogueira tem ampla experiência em consultoria jurídica para empresas, ajudando a mitigar riscos legais.",
            text2: "Ele é formado pela Mackenzie e possui MBA em Gestão Empresarial pela FGV.",
            text3: "João também é mentor de jovens advogados e participa de iniciativas de educação jurídica.",
            text4: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
        },
        {
            id: 4,
            name: "Ana Mendes Nogueira",
            cargo: "Advogada Ambiental",
            image: "../src/assets/images/SiteInstitucional/advogada1.png",
            text1: "Ana Mendes é formada pela UFRJ e atua na área de Direito Ambiental, auxiliando empresas a se adequarem às legislações ambientais.",
            text2: "Ela é uma defensora ativa da sustentabilidade e participa de projetos de preservação ambiental.",
            text3: "Ana também escreve regularmente sobre temas ambientais em blogs e revistas especializadas.",
            text4: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
        },
        {
            id: 5,
            name: "Ricardo Oliveira Santos",
            cargo: "Advogado em foco Criminalista",
            image: "../src/assets/images/SiteInstitucional/advogado1.png",
            text1: "Ricardo Oliveira Santos é formado pela UNESP e possui vasta experiência em casos criminais de alta complexidade.",
            text2: "Ele é conhecido por sua ética e dedicação em garantir um julgamento justo para seus clientes.",
            text3: "Ricardo também ministra cursos sobre Direito Penal em instituições renomadas.",
            text4: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
        },
        {
            id: 6,
            name: "Fernanda Rocha Lima",
            cargo: "Advogada Tributária",
            image: "../src/assets/images/SiteInstitucional/advogada1.png",
            text1: "Fernanda Rocha Lima é especialista em Direito Tributário e ajuda empresas a otimizarem sua carga tributária de forma legal.",
            text2: "Ela é formada pela UFMG e possui pós-graduação em Direito Tributário pela FGV.",
            text3: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
            text4: "Fernanda também é consultora em planejamento tributário e palestrante em eventos corporativos.",
        },
    ];

    // const [startIndex, setStartIndex] = useState(0); // Índice inicial dos advogados exibidos

    // const handleNext = () => {
    //     // Avança para os próximos dois advogados
    //     console.log("StartIndex antes de voltar:")
    //     console.log(startIndex);
    //     console.log("Advogados.length:")
    //     console.log(advogados.length);
    //     if (startIndex + 2 < advogados.length) {
    //         setStartIndex(startIndex + 2);
    //     }
    //     console.log("StartIndex depois de voltar:")
    //     console.log(startIndex);
    // };

    // const handlePrev = () => {
    //     // Volta para os dois advogados anteriores
    //     console.log("StartIndex antes de voltar:")
    //     console.log(startIndex);
    //     console.log("Advogados.length:")
    //     console.log(advogados.length);
    //     if (startIndex - 2 >= 0) {
    //         setStartIndex(startIndex - 2);
    //     }
    //     console.log("StartIndex depois de voltar:")
    //     console.log(startIndex);
    // };


    const swiperRef = useRef(null);

    return (
        <div className="w-screen h-full bg-gray flex items-center">
            <button className="w-60 ml-8 text-[65px]" onClick={() => swiperRef.current?.slidePrev()}>
            〈
            </button>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                loop={true}
                slidesPerView={2}
                direction="horizontal"
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                {advogados.map((advogado) => (
                    <SwiperSlide key={advogado.id} className='bg-yellow-200 flex justify-center items-center flex-row h-[500px]'>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <img src={advogado.image} alt="" />
                                <div className='text-center gap-5'>
                                    <h3 className=''>{advogado.name}</h3>
                                    <h4>{advogado.cargo}</h4>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center w-[32vw] h-[50vh] m-10 gap-5'>
                                <p>{advogado.text1}</p>
                                <p>{advogado.text2}</p>
                                <p>{advogado.text3}</p>
                                <p>{advogado.text4}</p>
                            </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="w-60 mr-8 text-[65px]" onClick={() => swiperRef.current?.slideNext()}>
                〉
            </button>
        </div>
    );
}

export default CarroselAdvogados;