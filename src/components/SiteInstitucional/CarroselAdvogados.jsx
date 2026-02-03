import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import felipeAdvogado from '../../assets/images/SiteInstitucional/felipeAdvogado.png';
import raissaAdvogada from '../../assets/images/SiteInstitucional/raissaAdvogada.png';
import advogado1 from '../../assets/images/SiteInstitucional/Advogado1.png';
import advogada1 from '../../assets/images/SiteInstitucional/advogada1.png';

function CarroselAdvogados() {
    const advogados = [
        {
            id: 1,
            name: "Felipe Lauriano Rocha Marqueze",
            cargo: "CEO e Advogado de Direito Imobiliário",
            image: felipeAdvogado,
            text1: "Felipe Lauriano Rocha Marqueze é formado em Direito pela FMU e pós-graduando em Direito e Processo do Trabalho.",
            text2: "Com experiência no setor imobiliário, atua como palestrante e integra a Comissão da OAB Tatuapé.",
            text4: "Host do podcast Lauriano & Leão Cast, com debates jurídicos relevantes."
        },
        {
            id: 2,
            name: "Raissa Leão Marqueze",
            cargo: "CEO e Advogada de Direito Civil",
            image: raissaAdvogada,
            text1: "Raíssa Leão Marqueze é formada em Direito pela Universidade Cruzeiro do Sul e se especializa em Direito Civil e Processo Civil.",
            text2: "Integra a Comissão de Direito Processual Civil da OAB Tatuapé, contribuindo para o aprimoramento da área.",
            text3: "É uma das vozes do podcast jurídico Lauriano & Leão Cast.",
        }
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
