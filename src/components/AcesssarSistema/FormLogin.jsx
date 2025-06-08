import React, { useState } from 'react';
import { api } from '../../service/api';
import Botao from '../Ui/Botao';
import { Input } from '../Ui/Input';

export default function FormLogin() 
{
    const [email, setEmail] = useState("");
    const [senha, setsenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', {
                email: email,
                senha: senha,
            });

            console.log("Resposta da API:", response.data);
            console.log(response);

            // Exemplo: redirecionar ou exibir mensagem de sucesso
            if (response.status == 200) {
                alert("Login realizado com sucesso!");
                // Redirecionar para outra página, se necessário
                sessionStorage.setItem("id", response.data.id);
                sessionStorage.setItem("email", response.data.email);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("tipoUsuario", response.data.tipoUsuario);
                sessionStorage.setItem("role", response.data.role);
                if (response.data.role == '"ROLE_USUARIO"') 
                {
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
                />

                <Input
                    type="password"
                    label="SENHA"
                    name="senha"
                    value={senha}
                    onChange={(e) => setsenha(e.target.value)}
                    placeholder="*********"
                    largura="cheia"
                />

                <a href="#" className="text-azulEscuroForte mb-6 block text-left">
                    ESQUECI MINHA SENHA
                </a>

                <Botao largura="cheia" cor="padrao" type="submit">
                    ENTRAR
                </Botao>

                <p className="mt-4 text-center mb-4 text-black">
                    É SEU PRIMEIRO ACESSO?{" "}
                    <a href="/primeiro-acesso" className="text-azulEscuroForte">
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
