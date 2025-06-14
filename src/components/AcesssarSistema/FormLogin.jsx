import React, { useState } from 'react';
import { api } from '../../service/api';
import Botao from '../Ui/Botao';
import { Input } from '../Ui/Input';
import { Link } from 'react-router-dom';

export default function FormLogin() 
{
    const [email, setEmail] = useState("");
    const [senha, setsenha] = useState("");
    const [errors, setErrors] = useState({});

    const validarFormulario = () => {
        const novosErros = {};
        
        if (!email) {
            novosErros.email = "Email é obrigatório";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            novosErros.email = "Email inválido";
        }
        
        if (!senha) {
            novosErros.senha = "Senha é obrigatória";
        } else if (senha.length < 8) {
            novosErros.senha = "A senha deve ter pelo menos 8 caracteres";
        }

        setErrors(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        try {
            const response = await api.post('/auth/login', {
                email: email,
                senha: senha,
            });

            if (response.status === 200) {
                sessionStorage.setItem("id", response.data.id);
                sessionStorage.setItem("email", response.data.email);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("tipoUsuario", response.data.tipoUsuario);
                sessionStorage.setItem("role", response.data.role);
                sessionStorage.setItem("nome", response.data.nome);
                sessionStorage.setItem("fotoPerfil", "http://localhost:8080/" + response.data.foto);
                
                if (response.data.role === '"ROLE_USUARIO"') {
                    window.location.href = "/perfil-cliente";
                } else {
                    window.location.href = "/perfil-advogado";
                }
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            
            if (error.response?.status === 401) {
                console.log(error.response.data);
                alert("Email ou senha incorretos. Por favor, verifique suas credenciais.");
            } else if (error.response?.status === 400) {
                const mensagensErro = error.response.data;
                if (typeof mensagensErro === 'object') {
                    Object.values(mensagensErro).forEach(mensagem => {
                        alert(mensagem);
                    });
                } else {
                    alert(mensagensErro || "Dados inválidos. Por favor, verifique as informações.");
                }
            } else {
                alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="bg-white p-8 rounded-lg shadow-lg w-96 md:w-1/4" onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                    <img src="src/assets/images/boneco.png" alt="" className="w-32 h-32 mx-auto mb-2" />
                    <h2 className="text-2xl">LOGIN</h2>
                </div>

                <Input
                    label="E-MAIL"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    largura="cheia"
                    errorMessage={errors.email}
                />

                <Input
                    type="password"
                    label="SENHA"
                    name="senha"
                    value={senha}
                    onChange={(e) => setsenha(e.target.value)}
                    placeholder="*********"
                    largura="cheia"
                    errorMessage={errors.senha}
                />

                <p className="mb-6 block text-left">
                    <Link to="/redefinir-senha" className="text-azulEscuroForte hover:underline hover:text-dourado">
                        ESQUECI MINHA SENHA
                    </Link>
                </p>

                <Botao largura="cheia" cor="padrao" type="submit">
                    ENTRAR
                </Botao>

                <p className="mt-4 text-center mb-4 text-black">
                    É SEU PRIMEIRO ACESSO?{" "}
                    <a href="/primeiro-acesso" className="text-azulEscuroForte hover:underline hover:text-dourado">
                        ENTRE AQUI.
                    </a>
                </p>

                <Botao tamanho='pequeno' cor="contornoAzul" type="button" className="block mx-auto" onClick={() => window.history.back()}>
                    VOLTAR
                </Botao>
            </form>
        </div>
    );
}
