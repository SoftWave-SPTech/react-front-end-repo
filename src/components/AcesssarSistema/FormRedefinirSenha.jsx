import React, { useState } from 'react';
import Botao from '../Ui/Botao';
import { Input } from '../Ui/Input';
import { api } from '../../service/api';
import { useNavigate } from 'react-router-dom';

const FormRedefinirSenha = () => {
  
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validarFormulario = () => {
        const novosErros = {};
        
        if (!email) {
            novosErros.email = "Email é obrigatório";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            novosErros.email = "Email inválido";
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
            const response = await api.post(`/auth/solicitar-reset-senha?email=${email}`);
            alert("E-mail com Token enviado com sucesso!");
            navigate("/esqueci-senha");
        } catch (error) {
            console.error("Erro ao solicitar redefinição de senha:", error);
            
            if (error.response?.status === 404) {
                alert("Email não encontrado. Verifique se o email está correto.");
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
                alert("Ocorreu um erro ao tentar enviar o email. Por favor, tente novamente mais tarde.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                className="bg-white p-8 rounded-lg shadow-lg w-96 md:w-1/4"
                onSubmit={handleSubmit}
            >
                <div className="text-center mb-4">
                    <img
                        src="src/assets/images/boneco.png"
                        alt=""
                        className="w-32 h-32 mx-auto mb-2"
                    />
                    <h2 className="text-2xl">REDEFINIR SENHA</h2>
                    <p className="text-base text-center mt-1"> Informe seu email para receber o token de troca de senha em seu email.</p>
                </div>
                <Input
                    type="text"
                    label="E-MAIL"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="leonardo@email.com"
                    largura="cheia"
                    errorMessage={errors.email}
                />
                <Botao largura="cheia" cor="padrao" type="submit" className="mt-7">
                    ENVIAR TOKEN
                </Botao>

                <Botao
                    tamanho="pequeno"
                    cor="contornoAzul"
                    type="button"
                    className="block mx-auto mt-6"
                    onClick={() => window.history.back()}
                >
                    VOLTAR
                </Botao>
            </form>
        </div>
    );
};

export default FormRedefinirSenha;