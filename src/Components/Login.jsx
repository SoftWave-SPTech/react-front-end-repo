import React, { useState } from 'react';
import '../styles/Login.css';

export default function Login() {
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
                <h2 className="title">Login</h2>

                <label className="label">E-MAIL</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="seuemail@exemplo.com"
                    required
                />

                <label className="label">SENHA</label>
                <input
                    type="text"
                    value={chave}
                    onChange={(e) => setChave(e.target.value)}
                    className="input"
                    placeholder="*********"
                    required
                />
                <a href="#" className="linkSenha">
                    ESQUECI MINHA SENHA
                </a>

                <button type="submit" className="button">
                    ENTRAR
                </button>
                <p className="footerText">
                    É SEU PRIMEIRO ACESSO?{" "}
                    <a href="#" className="link">
                        CLIQUE AQUI.
                    </a>
                </p>
            </form>
        </div>
    );
}
