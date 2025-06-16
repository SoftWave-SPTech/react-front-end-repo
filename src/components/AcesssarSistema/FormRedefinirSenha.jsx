import React, { useState } from 'react';
import Botao from '../Ui/Botao';
import { Input } from '../Ui/Input';
import { api } from '../../service/api';
import { useNavigate } from 'react-router-dom';

const FormRedefinirSenha = () => {
    
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/auth/solicitar-reset-senha?email=${email}`);
            console.log("Resposta da API:", response.data);
            alert("E-mail com Token Enviado com sucesso!");
            navigate("/esqueci-senha");
        } catch (error) {
            console.error("Erro ao cadastrar senha:", error);
            alert("Ocorreu um erro ao enviar o e-mail. Verifique se o email está correto ou Tente novamente mais tarde.");
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
                    <p className='text-2xl'> Informe seu email para receber o token de troca de senha em seu email.</p>
                </div>
                <Input
                    type="email"
                    label="E-MAIL"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuEmail@SeuDominio.com"
                    largura="cheia"
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