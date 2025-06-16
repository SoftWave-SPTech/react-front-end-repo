import React, { useState } from 'react';
import Botao from '../Ui/Botao';
import { Input } from '../Ui/Input';
import { api } from '../../service/api';
import { useNavigate } from 'react-router-dom';

const FormRedefinirSenha = () => {

    const navigate = useNavigate();
    const [chave, setChave] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [errors, setErrors] = useState({});

    const validarFormulario = () => {
        const novosErros = {};

        if (!chave) {
            novosErros.chave = "Token é obrigatório";
        }

        if (!senha) {
            novosErros.senha = "Senha é obrigatória";
        } else if (senha.length < 8) {
            novosErros.senha = "A senha deve ter pelo menos 8 caracteres";
        }

        if (!confirmarSenha) {
            novosErros.confirmarSenha = "Confirmação de senha é obrigatória";
        } else if (senha !== confirmarSenha) {
            novosErros.confirmarSenha = "As senhas não coincidem";
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
            const response = await api.post(`/auth/resetar-senha`, {
                token: chave,
                novaSenha: senha,
                novaSenhaConfirma: confirmarSenha
            });

            alert("Senha redefinida com sucesso!");
            navigate("/login");
        } catch (error) {
            console.error("Erro ao redefinir senha:", error);
            if (error.response?.status === 400) {
                const mensagensErro = error.response.data;
                if (typeof mensagensErro === 'object') {
                    Object.entries(mensagensErro).forEach(([campo, mensagem]) => {
                        setErrors(prev => ({
                            ...prev,
                            [campo]: mensagem
                        }));
                    });
                } else {
                    alert(mensagensErro || "Dados inválidos. Por favor, verifique as informações.");
                }
            } else if (error.response?.status === 401) {
                alert("Token inválido ou expirado. Por favor, solicite um novo token.");
                navigate("/redefinir-senha");
            } else {
                alert("Ocorreu um erro ao tentar redefinir a senha. Por favor, tente novamente mais tarde.");
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
                    <h2 className="text-2xl">ESQUECI A SENHA</h2>
                    <p className='text-2x1'> Informe o Token que recebeu e a nova senha.</p>
                </div>
                <Input
                    label="TOKEN DE SENHA"
                    name="chave"
                    value={chave}
                    onChange={(e) => setChave(e.target.value)}
                    placeholder="NICN4L85"
                    largura="cheia"
                    errorMessage={errors.chave}
                />
                <Input
                    type="password"
                    label="NOVA SENHA"
                    name="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="*********"
                    largura="cheia"
                    errorMessage={errors.senha}
                />
                <Input
                    type="password"
                    label="CONFIRMAR SENHA"
                    name="confirmarSenha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    placeholder="*********"
                    largura="cheia"
                    errorMessage={errors.confirmarSenha}
                />
                <Botao largura="cheia" cor="padrao" type="submit" className="mt-7">
                    REDEFINIR SENHA
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