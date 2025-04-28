import React, { useState } from 'react';
import './CadastrarSenha.css';
import axios from 'axios';

export default function CadastrarSenha() {
    const [senha, setsenha] = useState("");
    const [confirmarSenha, setconfirmarSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch('http://localhost:8080/auth/cadastrar-senha', {
                email: sessionStorage.getItem("email"),
                senha: senha,
                confirmaSenha: confirmarSenha,
            });
            console.log("Resposta da API:", response.data);
            alert("Senha cadastrada com sucesso!");

            try {
                const response = await axios.post('http://localhost:8080/auth/login', {
                    email: sessionStorage.getItem("email"),
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
