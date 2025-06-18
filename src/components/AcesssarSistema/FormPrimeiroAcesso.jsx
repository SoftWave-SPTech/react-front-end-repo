import React, { useState } from 'react';
import { api } from '../../service/api';
import Botao from "../Ui/Botao";
import { Input } from "../Ui/Input";

export default function FormPrimeiroAcesso() {
    const [email, setEmail] = useState("");
    const [chave, setChave] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

    const teste = ((response) => {
        console.log(response.data);
        sessionStorage.setItem("email", response.data.email);
    });
        try {
            const response = await api.post('/auth/primeiro-acesso', 
            {
                email: email,
                senha: chave,
            });

            teste(response);
            console.log("Resposta da API:", response.data);
            alert("Acesso realizado com sucesso!");


            window.location.href = "/cadastrar-senha";
        } catch (error) {
            console.error("Erro ao realizar o acesso:", error);
            alert("Erro ao realizar o acesso. Verifique os dados e tente novamente.");
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
        />
        <Input
          label="CHAVE DE ACESSO"
          name="chave"
          value={chave}
          onChange={(e) => setChave(e.target.value)}
          placeholder="NICN4L85"
          largura="cheia"
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
