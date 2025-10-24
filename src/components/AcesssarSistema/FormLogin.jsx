import React, { useState } from 'react';
import { api } from '../../service/api';
import Botao from '../Ui/Botao';
import { Input } from '../Ui/Input';
import { Link } from 'react-router-dom';
import AlertStyle from '../Ui/AlertStyle';

export default function FormLogin() {
    const [email, setEmail] = useState("");
    const [senha, setsenha] = useState("");
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

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

            console.log("Resposta da API:", response.data);

            if (response.status === 200) {
                setAlert({ show: true, message: "Login realizado com sucesso!", type: "success" });
                sessionStorage.setItem("id", response.data.id);
                sessionStorage.setItem("email", response.data.email);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("tipoUsuario", response.data.tipoUsuario);
                sessionStorage.setItem("role", response.data.role);
                sessionStorage.setItem("nome", response.data.nome);

                // Salva a foto diretamente (já vem como URL pré-assinada do S3 ou null)
                if (response.data.foto) {
                    sessionStorage.setItem("fotoPerfil", response.data.foto);
                } else {
                    sessionStorage.removeItem("fotoPerfil");
                }

                setTimeout(() => {
                    if (response.data.role === "ROLE_USUARIO") {
                        window.location.href = "/perfil-cliente";
                    } else if(response.data.role === "ROLE_ADMIN") {
                        window.location.href = "/dashboard";
                    } else {
                        window.location.href = "/perfil-advogado";
                    }
                }, 1200); 
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);

            if (error.response?.status === 401) {   
                setAlert({ show: true, message: "Email ou senha incorretos. Por favor, verifique suas credenciais.", type: "error" });
            } else if (error.response?.status === 400) {
                const mensagensErro = error.response.data.message;
                if (typeof mensagensErro === 'object') {
                    const primeiraMensagem = Object.values(mensagensErro)[0];
                    setAlert({ show: true, message: primeiraMensagem, type: "error" });
                } else {
                    setAlert({ show: true, message: mensagensErro || "Dados inválidos. Por favor, verifique as informações.", type: "error" });
                }
            } else if (error.response?.status >= 500) {
                setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" });
            } else {
                setAlert({ show: true, message: error.response?.data?.message || "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.", type: "error" });
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-azulEscuroForte px-4">
            <form
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
                onSubmit={handleSubmit}
            >
                <div className="text-center">
                    <img src="src/assets/images/boneco.png" alt="" className="w-32 h-32 mx-auto mb-2" />
                    <h2 className="text-2xl">LOGIN</h2>
                </div>

                {alert.show && (
                    <AlertStyle
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert({ ...alert, show: false })}
                        className="mb-4"
                    />
                )}

                <Input
                    label="E-MAIL"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="leonardo@email.com"
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
                    <a href="/primeiro-acesso" className="font-bold text-azulEscuroForte hover:underline hover:text-dourado">
                        ENTRE AQUI.
                    </a>
                </p>

                <Botao
                    tamanho="pequeno"
                    cor="contornoAzul"
                    type="button"
                    className="block mx-auto"
                    onClick={() => window.history.back()}
                >
                    VOLTAR
                </Botao>
            </form>
        </div>
    );
}
