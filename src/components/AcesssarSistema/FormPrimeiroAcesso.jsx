import React, { useState } from 'react';
import { api } from '../../service/api';
import Botao from "../Ui/Botao";
import { Input } from "../Ui/Input";

export default function FormPrimeiroAcesso() {
    const [email, setEmail] = useState("");
    const [chave, setChave] = useState("");
    const [errors, setErrors] = useState({});

    const validarFormulario = () => {
        const novosErros = {};
        
        if (!email) {
            novosErros.email = "Email é obrigatório";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            novosErros.email = "Email inválido";
        }
        
        if (!chave) {
            novosErros.chave = "Chave de acesso é obrigatória";
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
            const response = await api.post('/auth/primeiro-acesso', {
                email: email,
                senha: chave,
            });

            sessionStorage.setItem("email", response.data.email);
            alert("Acesso realizado com sucesso!");
            window.location.href = "/cadastrar-senha";
        } catch (error) {
            console.error("Erro ao realizar o acesso:", error);
            
          //   if (error.response?.status === 401) {
          //     alert("Chave de acesso inválida. Por favor, verifique a chave fornecida.");
          // } else 
          // TODO descomentar quando o token estiver funcionando no seu campo correto
            if (error.response?.status === 404) {
                alert("Email ou chave de acesso inválidos. Por favor, verifique se o email e a chave estão corretos.");
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
                alert("Ocorreu um erro ao tentar realizar o acesso. Por favor, tente novamente mais tarde.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-sm"
                onSubmit={handleSubmit}
            >
                <div className="text-center mb-4">
                    <img
                        src="src/assets/images/boneco.png"
                        alt=""
                        className="w-32 h-32 mx-auto mb-2"
                    />
                    <h2 className="text-2xl">PRIMEIRO ACESSO</h2>
                </div>
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
                    label="CHAVE DE ACESSO"
                    name="chave"
                    value={chave}
                    onChange={(e) => setChave(e.target.value)}
                    placeholder="NICN4L85"
                    largura="cheia"
                    errorMessage={errors.chave}
                />
                <Botao largura="cheia" cor="padrao" type="submit" className="mt-7">
                    ENTRAR
                </Botao>
                <p className="mt-4 text-center mb-4 text-black">
                    JÁ ACESSOU O SITE ANTES?{" "}
                    <a href="/login" className="font-bold text-azulEscuroForte hover:underline hover:text-dourado">
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