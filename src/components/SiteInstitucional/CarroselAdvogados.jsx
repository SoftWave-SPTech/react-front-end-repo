import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function CarroselAdvogados() {
    const advogados = [
        {
            id: 1,
            name: "Felipe Lauriano Rocha Marqueze",
            cargo: "CEO e Advogado de Direito Imobiliário",
            image: "../src/assets/images/SiteInstitucional/felipeAdvogado.png",
            text1: "Felipe Lauriano Rocha Marqueze é formado em Direito pela FMU e pós-graduando em Direito e Processo do Trabalho.",
            text2: "Com experiência no setor imobiliário, atua como palestrante e integra a Comissão da OAB Tatuapé.",
            text4: "Host do podcast Lauriano & Leão Cast, com debates jurídicos relevantes."
        },
        {
            id: 2,
            name: "Raissa Leão Marqueze",
            cargo: "CEO e Advogada de Direito Civil",
            image: "../src/assets/images/SiteInstitucional/raissaAdvogada.png",
            text1: "Raíssa Leão Marqueze é formada em Direito pela Universidade Cruzeiro do Sul e se especializa em Direito Civil e Processo Civil.",
            text2: "Integra a Comissão de Direito Processual Civil da OAB Tatuapé, contribuindo para o aprimoramento da área.",
            text3: "É uma das vozes do podcast jurídico Lauriano & Leão Cast.",
        },
        {
            id: 3,
            name: "João Pedro Nogueira",
            cargo: "Consultor Jurídico",
            image: "../src/assets/images/SiteInstitucional/advogado1.png",
            text1: "João Pedro Nogueira tem ampla experiência em consultoria jurídica para empresas, ajudando a mitigar riscos legais.",
            text2: "Ele é formado pela Mackenzie e possui MBA em Gestão Empresarial pela FGV.",
            text3: "João também é mentor de jovens advogados e participa de iniciativas de educação jurídica.",
        },
        {
            id: 6,
            name: "Fernanda Rocha Lima",
            cargo: "Advogada Tributária",
            image: "../src/assets/images/SiteInstitucional/advogada1.png",
            text1: "Fernanda Rocha Lima é especialista em Direito Tributário e apoia empresas na redução legal de tributos.",
            text2: "Formada pela UFMG, tem pós-graduação em Direito Tributário pela FGV.",
            text4: "É reconhecida por oferecer soluções estratégicas e seguras na área tributária.",
        },
    ];

    const swiperRef = useRef(null);

    return (
        <div className="text-white w-screen h-full bg-gray flex items-center">
            <button className="w-60 ml-8 text-[65px]" onClick={() => swiperRef.current?.slidePrev()}>
                〈
            </button>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                loop={true}
                direction="horizontal"
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1305: { slidesPerView: 2 },
                }}
            >
                {advogados.map((advogado) => (
                    <SwiperSlide
                        key={advogado.id}
                        className="bg-azulEscuroFraco text-white flex justify-center items-center flex-row h-[500px] px-12 py-8 gap-8 rounded-xl"
                    >
                        <div className='flex flex-col justify-center items-center gap-4 px-4'>
                            <img src={advogado.image} alt="" className="max-w-[200px] rounded-md" />
                            <div className='text-center'>
                                <h3 className='text-xl font-semibold text-dourado'>{advogado.name}</h3>
                                <h4 className='text-md'>{advogado.cargo}</h4>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center w-[50vw] h-[50vh] gap-4 px-1 hidden sm:flex'>
                            <p>{advogado.text1}</p>
                            <p>{advogado.text2}</p>
                            <p>{advogado.text3}</p>
                            <p>{advogado.text4}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="text-white w-60 mr-8 text-[65px]" onClick={() => swiperRef.current?.slideNext()}>
                〉
            </button>
        </div>
    );
}

export default CarroselAdvogados;
