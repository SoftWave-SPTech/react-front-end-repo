import React, { useState } from 'react';
import Botao from '../Ui/Botao';
import { Input } from '../Ui/Input';
import { api } from '../../service/api';
import { useNavigate } from 'react-router-dom';

const FormRedefinirSenha = () => {

    const navigate = useNavigate();

    const [chave, setChave] = useState("");
    const [senha, setsenha] = useState("");
    const [confirmarSenha, setconfirmarSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Chave:", chave);
        console.log("Senha:", senha);
        console.log("Confirmar Senha:", confirmarSenha);

        try {
            const response = await api.post(`/auth/resetar-senha`, {
                token: chave,
                novaSenha: senha,
                novaSenhaConfirma: confirmarSenha
            }
            );
            console.log("Resposta da API:", response.data);
            alert("Senha cadastrada com sucesso!");
            navigate("/login");

        } catch (error) {
            console.error("Erro ao cadastrar senha:", error);
            alert("Ocorreu um erro ao cadastrar a senha. Tente novamente.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-azulEscuroForte px-4">
            <form
                className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm"
                onSubmit={handleSubmit}
            >
                <div className="text-center mb-2">
                    <img
                        src="src/assets/images/boneco.png"
                        alt=""
                        className="w-32 h-32 mx-auto mb-2"
                    />
                    <h2 className="text-2xl">ESQUECI A SENHA</h2>
                    <p className="text-base mt-1 mb-1">Informe o Token que recebeu e a nova senha.</p>
                </div>

                <Input
                    label="TOKEN DE SENHA"
                    name="chave"
                    value={chave}
                    onChange={(e) => setChave(e.target.value)}
                    placeholder="NICN4L85"
                    largura="cheia"
                />
                <Input
                    type="password"
                    label="NOVA SENHA"
                    name="senha"
                    value={senha}
                    onChange={(e) => setsenha(e.target.value)}
                    placeholder="*********"
                    largura="cheia"
                />
                <Input
                    type="password"
                    label="CONFIRMAR SENHA"
                    name="confirmarSenha"
                    value={confirmarSenha}
                    onChange={(e) => setconfirmarSenha(e.target.value)}
                    placeholder="*********"
                    largura="cheia"
                />

                <Botao largura="cheia" cor="padrao" type="submit" className="mt-5">
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