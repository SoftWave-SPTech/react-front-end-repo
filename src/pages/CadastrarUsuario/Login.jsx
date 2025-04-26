import React, { useState } from 'react';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setsenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://sua-api.com/login', {
                email: email,
                senha: senha,
            });

            console.log("Resposta da API:", response.data);

            // Exemplo: redirecionar ou exibir mensagem de sucesso
            if (response.data.success) {
                alert("Login realizado com sucesso!");
                // Redirecionar para outra página, se necessário
                // window.location.href = "/dashboard";
            } else {
                alert("Erro no login: " + response.data.message);
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Ocorreu um erro ao tentar fazer login. Tente novamente.");
        }
    };

    return (
        <div className="container-login">
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
                    <a href="#" className="link">
                        CLIQUE AQUI.
                    </a>
                </p>
            </form>
        </div>
    );
}
