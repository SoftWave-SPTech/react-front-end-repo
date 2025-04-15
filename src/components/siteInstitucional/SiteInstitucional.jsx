import React, { useEffect, useState } from 'react';
import './siteInstitucional.css';

function SiteInstitucional() {
    const [selectedEspecialidade, setSelectedEspecialidade] = useState({});

    useEffect(() => {
        const defaultEspecialidade = especialidades[0];
        setSelectedEspecialidade(defaultEspecialidade);
    }, []);

    const especialidades = [
        { id: 1, name: "Direito Civil", icon: "../src/assets/leaoLogo.png", text: "Lorem1 ipsum dolor sit amet consectetur adipisicing elit. Magni, eum! Nam velit qui, impedit tempore fugit vitae iste nobis itaque quis molestiae error adipisci accusamus aspernatur expedita. Placeat, nemo blanditiis!", link: "" },
        { id: 2, name: "Direito do Trabalho", icon: "../src/assets/leaoLogo.png", text: "Lorem2 ipsum dolor sit amet consectetur adipisicing elit. Magni, eum! Nam velit qui, impedit tempore fugit vitae iste nobis itaque quis molestiae error adipisci accusamus aspernatur expedita. Placeat, nemo blanditiis!", link: "" },
        { id: 3, name: "Direito da Familia", icon: "../src/assets/leaoLogo.png", text: "Lorem3 ipsum dolor sit amet consectetur adipisicing elit. Magni, eum! Nam velit qui, impedit tempore fugit vitae iste nobis itaque quis molestiae error adipisci accusamus aspernatur expedita. Placeat, nemo blanditiis!", link: "" },
        { id: 4, name: "Direito do Consumidor", icon: "../src/assets/leaoLogo.png", text: "Lorem4 ipsum dolor sit amet consectetur adipisicing elit. Magni, eum! Nam velit qui, impedit tempore fugit vitae iste nobis itaque quis molestiae error adipisci accusamus aspernatur expedita. Placeat, nemo blanditiis!", link: "" },
        { id: 5, name: "Direito Imobiliario", icon: "../src/assets/leaoLogo.png", text: "Lorem5 ipsum dolor sit amet consectetur adipisicing elit. Magni, eum! Nam velit qui, impedit tempore fugit vitae iste nobis itaque quis molestiae error adipisci accusamus aspernatur expedita. Placeat, nemo blanditiis!", link: "" },
        { id: 6, name: "Marcas e patentes", icon: "../src/assets/leaoLogo.png", text: "Lorem6 ipsum dolor sit amet consectetur adipisicing elit. Magni, eum! Nam velit qui, impedit tempore fugit vitae iste nobis itaque quis molestiae error adipisci accusamus aspernatur expedita. Placeat, nemo blanditiis!", link: "" },
        { id: 7, name: "Consultoria Juridica", icon: "../src/assets/leaoLogo.png", text: "Lorem7 ipsum dolor sit amet consectetur adipisicing elit. Magni, eum! Nam velit qui, impedit tempore fugit vitae iste nobis itaque quis molestiae error adipisci accusamus aspernatur expedita. Placeat, nemo blanditiis!", link: "" },
    ];

    const advogados = [
        {id: 1, name: "Advogado 1", image: "../src/assets/Advogado1.png", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nesciunt sapiente voluptate officia dolorem esse tempore corporis, aut vel architecto iste deleniti voluptatibus labore quo ut maiores repudiandae amet rem."},
        {id: 2, name: "Advogado 2", image: "../src/assets/Advogado2.png", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima molestias architecto ut recusandae fugiat ex aperiam quod ad qui modi, delectus laudantium ipsam? Vitae perferendis quod ab nihil facilis officiis?"},
        {id: 3, name: "Advogado 3", image: "../src/assets/leaoLogo.png", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima molestias architecto ut recusandae fugiat ex aperiam quod ad qui modi, delectus laudantium ipsam? Vitae perferendis quod ab nihil facilis officiis?"},
        {id: 4, name: "Advogado 3", image: "../src/assets/Advogado1.png", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima molestias architecto ut recusandae fugiat ex aperiam quod ad qui modi, delectus laudantium ipsam? Vitae perferendis quod ab nihil facilis officiis?"}
    ];

    const seletorEspecialidade = (especialidade) => {
        setSelectedEspecialidade(especialidade);

    }


    return (
        <div>
            <header>
                <img src="../src/assets/leaoLogo.png" alt="" />
                <h1>LAURIANO & LEAO SOCIEDADE DE ADVOGADOS</h1>
                <ul>
                    <li><button>Sobre nós</button> </li>
                    <li><button>Contato</button> </li>
                    <li><button>Podcast</button></li>
                    <li><button>login</button></li>
                </ul>
            </header>
            <section alt="banner introdutorio">
                <h2>Quem somos</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut suscipit molestias similique distinctio, vitae sequi laudantium architecto, sapiente repellat magni deleniti pariatur mollitia voluptate optio vel! Provident inventore illum numquam?</p>
                <button>Saiba mais</button>
            </section>
            <section alt="banner sobre nos">
                <h2>Sobre nós</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit facilis dignissimos quae natus eaque, a similique tempore maiores necessitatibus vel minus velit numquam vero sed totam eum possimus illum aliquid? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem officiis, culpa consectetur eos hic vitae dicta sed, expedita corrupti animi, ad non vel suscipit doloribus exercitationem error cum quam corporis?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat nemo accusantium dicta impedit culpa in excepturi. Quidem ut obcaecati debitis dignissimos rerum assumenda, dolore nulla, magni voluptatum blanditiis cumque quod?</p>
            </section>
            <section alt="banner especialidades">
                <h2>especialidades</h2>
                <div alt="botoes esquerda ">
                    <ul>
                        {especialidades.map((especialidade) => (
                            <li key={especialidade.id}>
                                <button
                                    onClick={() => seletorEspecialidade(especialidade)}
                                    disabled={selectedEspecialidade.id === especialidade.id}
                                    className={selectedEspecialidade.id === especialidade.id ? 'selecionado' : ''}
                                >
                                    {especialidade.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div alt="texto direita">
                    <img src={selectedEspecialidade.icon} alt="icone de cada especialidade" />
                    <p>{selectedEspecialidade.text}</p>
                    <button>saiba mais</button>
                </div>
            </section>

            <section alt="banner advogados">
                <h2>Nosso Advogados</h2>

                {
                    advogados.map((advogado) => (
                        <div key={advogado.id}>
                            <img src={advogado.image} alt="" />
                            <p>{advogado.text}</p>
                        </div>

                    ))
                }

                {/* <div>
                    <img src="../src/assets/Advogado1.png" alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nesciunt sapiente voluptate officia dolorem esse tempore corporis, aut vel architecto iste deleniti voluptatibus labore quo ut maiores repudiandae amet rem.</p>
                </div>

                <div>
                    <img src="../src/assets/Advogado2.png" alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima molestias architecto ut recusandae fugiat ex aperiam quod ad qui modi, delectus laudantium ipsam? Vitae perferendis quod ab nihil facilis officiis?</p>
                </div> */}
            </section>

            <section alt="banner podcast">

            </section>

            <section alt="banner contato" >
            <img src="../public/instagram.svg" alt="icone instagram" className="icon"/>
            <p>@laurianoleaoadv</p>

            <img src="../public/whatsapp.svg" alt="icone whatsapp" className="icon"/>
            <p>+55 11 98983-3914</p>

            <img src="../public/whatsapp.svg" alt="icone whatsapp" className="icon"/>
            <p>+55 11 93207-4268</p>

            <img src="../public/email.svg" alt="Icone Email" className="icon"/>
            <p>raissaleao@laurianoleaoadvogados.com.br</p>

            <img src="../public/email.svg" alt="Icone Email" className="icon"/>
            <p>felipelauriano@laurianoleaoadvogados.comm.br</p>
            </section>

            <footer alt="rodape">

            </footer>
        </div>
    )
};

export default SiteInstitucional;