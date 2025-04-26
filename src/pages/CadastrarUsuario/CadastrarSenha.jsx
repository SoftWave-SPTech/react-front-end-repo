import React, { useState } from 'react';
import './CadastrarSenha.css';

export default function CadastrarSenha() {
    const [senha, setsenha] = useState("");
    const [confirmarSenha, setconfirmarSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/cadastrar-senha', {
                senha: senha,
                confirmarSenha: confirmarSenha,
            });

            console.log("Resposta da API:", response.data);
            alert("Senha cadastrada com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar senha:", error);
            alert("Ocorreu um erro ao cadastrar a senha. Tente novamente.");
        }
    };
    return (
        <div className="container-cadastrarsenha">
            <form className="form" onSubmit={handleSubmit}>
                <div className="icon">
                    <img src="src/images/boneco.png" alt="" className="img" />
                </div>      
                <h2 className="title">Cadastrar Senha</h2>

                <label className="label">SENHA</label>
                <input
                    type="senha"
                    value={senha}
                    onChange={(e) => setsenha(e.target.value)}
                    className="input"
                    placeholder="*********"
                    required
                />

                <label className="label">CONFIRMAR SENHA</label>
                <input
                    type="text"
                    value={confirmarSenha}
                    onChange={(e) => setconfirmarSenha(e.target.value)}
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
