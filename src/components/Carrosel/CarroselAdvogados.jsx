function CarroselAdvogados() {
    const advogados = [
        { id: 1, name: "Advogado 1", image: "../src/assets/Advogado1.png", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nesciunt sapiente voluptate officia dolorem esse tempore corporis, aut vel architecto iste deleniti voluptatibus labore quo ut maiores repudiandae amet rem." },
        { id: 2, name: "Advogado 2", image: "../src/assets/Advogado2.png", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima molestias architecto ut recusandae fugiat ex aperiam quod ad qui modi, delectus laudantium ipsam? Vitae perferendis quod ab nihil facilis officiis?" },
        { id: 3, name: "Advogado 1", image: "../src/assets/Advogado1.png", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nesciunt sapiente voluptate officia dolorem esse tempore corporis, aut vel architecto iste deleniti voluptatibus labore quo ut maiores repudiandae amet rem." },
        { id: 4, name: "Advogado 2", image: "../src/assets/Advogado2.png", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima molestias architecto ut recusandae fugiat ex aperiam quod ad qui modi, delectus laudantium ipsam? Vitae perferendis quod ab nihil facilis officiis?" },
        { id: 5, name: "Advogado 1", image: "../src/assets/Advogado1.png", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nesciunt sapiente voluptate officia dolorem esse tempore corporis, aut vel architecto iste deleniti voluptatibus labore quo ut maiores repudiandae amet rem." },
        { id: 6, name: "Advogado 2", image: "../src/assets/Advogado2.png", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima molestias architecto ut recusandae fugiat ex aperiam quod ad qui modi, delectus laudantium ipsam? Vitae perferendis quod ab nihil facilis officiis?" },
    ];

  return (
    <div className='carousel'>
                {
                    advogados.map((advogado) => (
                        <div key={advogado.id}>
                            <img src={advogado.image} alt="" />
                            <p className='textos-containers'>{advogado.text}</p>
                        </div>

                    ))
                }
    </div>
  );
}

export default CarroselAdvogados;