import React, { useState } from 'react';
import './Acessos.css';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setsenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email: email,
                senha: senha,
            });

            console.log("Resposta da API:", response.data);
            console.log(response);

            // Exemplo: redirecionar ou exibir mensagem de sucesso
            if (response.status == 200) {
                alert("Login realizado com sucesso!");
                // Redirecionar para outra página, se necessário
                sessionStorage.setItem("id" , response.data.id);
                    sessionStorage.setItem("email", response.data.email);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("tipoUsuario", response.data.tipoUsuario);
                sessionStorage.setItem("role", response.data.role);
                //Logica para redirecionar para o perfil do cliente ou advogado
                if (response.data.tipoUsuario == 'UsuarioFisico' || response.data.tipoUsuario == 'UsuarioJuridico') {
                    window.location.href = "/perfil-cliente";
                } else {
                    window.location.href = "/perfil-advogado";
                }
            } else {
                alert("Erro no login: " + response.data.message);
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Ocorreu um erro ao tentar fazer login. Tente novamente.");
        }
    };

    return (
        <div className="container-acessos">
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
                    value={senha}
                    onChange={(e) => setsenha(e.target.value)}
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
                    <a href="/primeiro-acesso" className="link">
                        CLIQUE AQUI.
                    </a>
                </p>
                <button
                    type="button"
                    className="button voltar"
                    onClick={() => window.history.back()}
                >
                VOLTAR
                </button>
            </form>
        </div>
    );
}
