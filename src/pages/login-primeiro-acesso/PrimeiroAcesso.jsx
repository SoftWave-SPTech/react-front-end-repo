import React, { useState } from 'react';
import './PrimeiroAcesso.css';
import axios from 'axios';

export default function PrimeiroAcesso() {
    const [email, setEmail] = useState("");
    const [chave, setChave] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://sua-api.com/primeiro-acesso', {
                email: email,
                chave: chave,
            });

            console.log("Resposta da API:", response.data);
            alert("Acesso realizado com sucesso!");
        } catch (error) {
            console.error("Erro ao realizar o acesso:", error);
            alert("Erro ao realizar o acesso. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div className="container-primeiro-acesso">
            <form className="form" onSubmit={handleSubmit}>
                <div className="icon">
                    <img src="src/images/boneco.png" alt="" className="img" />
                </div>      
                <h2 className="title">Primeiro Acesso</h2>

                <label className="label">E-MAIL</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="seuemail@exemplo.com"
                    required
                />

                <label className="label">CHAVE DE ACESSO</label>
                <input
                    type="text"
                    value={chave}
                    onChange={(e) => setChave(e.target.value)}
                    className="input"
                    placeholder="NICN439NWE9F"
                    required
                />

                <button type="submit" className="button">
                    ENTRAR
                </button>
                <p className="footerText">
                    JÁ ACESSOU O SITE ANTES?{" "}
                    <a href="#" className="link">
                        ENTRE AQUI.
                    </a>
                </p>
            </form>
        </div>
    );
}
