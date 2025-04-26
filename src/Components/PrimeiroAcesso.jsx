import React, { useState } from 'react';
import '../styles/PrimeiroAcesso.css';

export default function PrimeiroAcesso() {
    const [email, setEmail] = useState("");
    const [chave, setChave] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("E-mail:", email);
        console.log("Chave de Acesso:", chave);
    };

    return (
        <div className="container">
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
