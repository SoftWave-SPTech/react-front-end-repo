import React, { useState } from "react";
import '../estilos/acessos.css'; 
import axios from 'axios';

export default function RecuperarSenha() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/', {
            email: email,
        });
    };

    return (
        <div className="container-acessos bg-cinzaAzulado min-h-screen flex items-center justify-center">
            <form
                className="form bg-branco rounded-2xl shadow-xl px-6 sm:px-12 py-10 w-full max-w-md flex flex-col items-center relative"
                onSubmit={handleSubmit}
            >
                <div className="icon mb-4 flex justify-center">
                    <img
                        src="src/assets/images/boneco.png"
                        alt=""
                        className="img w-40 h-40 rounded-full object-cover"
                    />
                </div>
                <h2 className="title text-2xl font-normal text-azulEscuroForte mb-2">Recuperação de Senha</h2>
                <p className="text-preto text-base font-normal mb-6 text-center">
                Para recuperar sua senha, preencha o e-mail abaixo e clique no botão enviar.
                </p>
                <label className="label block w-full text-azulEscuroForte text-base font-semibold mb-1 mt-2 text-left" htmlFor="email">
                    E-MAIL
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input w-full border border-preto rounded-lg py-2 px-3 text-preto text-base mb-6 focus:outline-none"
                    placeholder="seuemail@exemplo.com"
                    required
                />
                <button
                    type="submit"
                    className="button w-full bg-AzulEscuro text-branco text-lg font-semibold rounded-lg py-3 mt-2 mb-4 hover:bg-azulClaro transition-colors"
                >
                    ENVIAR
                </button>
                <p className="footerText w-full text-center text-preto text-base mt-2">
                    É SEU PRIMEIRO ACESSO?{" "}
                    <a href="/primeiro-acesso" className="text-AzulEscuro font-semibold">
                        ACESSE AQUI.
                    </a>
                </p>
                <button
                    type="button"
                    className="button voltar mt-2"
                    onClick={() => window.history.back()}
                >
                    VOLTAR
                </button>
            </form>
        </div>
    );
}

