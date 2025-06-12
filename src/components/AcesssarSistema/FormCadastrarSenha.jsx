import React, { useState } from 'react';
import { api } from '../../service/api';
import Botao from "../Ui/Botao";
import { Input } from "../Ui/Input";

export default function FormCadastrarSenha() 
{
    const [senha, setsenha] = useState("");
    const [confirmarSenha, setconfirmarSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.patch('/auth/cadastrar-senha', {
                email: sessionStorage.getItem("email"),
                senha: senha,
                confirmaSenha: confirmarSenha,
            });
            console.log("Resposta da API:", response.data);
            alert("Senha cadastrada com sucesso!");

            try {
                const response = await api.post('/auth/login', {
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
                console.error("Erro ao fazer login:", error, error.response?.data?.message);
                alert(error.response?.data?.message);
            }            


        } catch (error) {
            console.error("Erro ao cadastrar senha:", error, error.response?.data?.message);
            alert(error.response?.data?.message);
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
          <h2 className="text-2xl">CADASTRAR SENHA</h2>
        </div>
        <Input
          type="password"
          label="SENHA"
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
        <Botao largura="cheia" cor="padrao" type="submit" className="mt-7">
          CADASTRAR
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
}
