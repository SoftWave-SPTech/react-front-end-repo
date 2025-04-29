import React, { useState } from 'react';
import '../styles/CadastrarSenha.css';

export default function CadastrarSenha() {
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
                <h2 className="title">Cadastrar Senha</h2>

                <label className="label">SENHA</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="*********"
                    required
                />

                <label className="label">CONFIRMAR SENHA</label>
                <input
                    type="text"
                    value={chave}
                    onChange={(e) => setChave(e.target.value)}
                    className="input"
                    placeholder="*********"
                    required
                />

                <button type="submit" className="button">
                    CADASTRAR
                </button>
            </form>
        </div>
    );
}
