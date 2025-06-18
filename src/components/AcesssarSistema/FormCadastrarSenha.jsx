import React, { useState } from 'react';
import { api } from '../../service/api';
import Botao from "../Ui/Botao";
import { Input } from "../Ui/Input";

export default function FormCadastrarSenha() {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [errors, setErrors] = useState({});

  const validarFormulario = () => {
    const novosErros = {};

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
    console.log(senha, confirmarSenha);
    if (!validarFormulario()) {
      return;
    }

    try {
      const email = sessionStorage.getItem("email");
      const response = await api.patch('/auth/cadastrar-senha', {
        email: email,
        novaSenha: senha,
        novaSenhaConfirma: confirmarSenha,
      });
      console.log(response);
      alert("Senha cadastrada com sucesso!");

      try {
        const loginResponse = await api.post('/auth/login', {
          email: email,
          senha: senha,
        });

        if (loginResponse.status === 200) {
          sessionStorage.setItem("id", loginResponse.data.id);
          sessionStorage.setItem("email", loginResponse.data.email);
          sessionStorage.setItem("token", loginResponse.data.token);
          sessionStorage.setItem("tipoUsuario", loginResponse.data.tipoUsuario);
          sessionStorage.setItem("role", loginResponse.data.role);
          sessionStorage.setItem("nome", loginResponse.data.nome);
          sessionStorage.setItem("fotoPerfil", "http://localhost:8080/" + loginResponse.data.foto);

          if (loginResponse.data.tipoUsuario === 'UsuarioFisico' || loginResponse.data.tipoUsuario === 'UsuarioJuridico') {
            window.location.href = "/perfil-cliente";
          } else {
            window.location.href = "/perfil-advogado";
          }
        }
      } catch (loginError) {
        console.error("Erro ao fazer login:", loginError);
        alert("Senha cadastrada, mas houve um erro ao fazer login. Por favor, tente fazer login manualmente.");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Erro ao cadastrar senha:", error);
      if (error.response?.status === 400) {
        const mensagensErro = error.response.data;
        console.log(mensagensErro);
        if (typeof mensagensErro === 'object') {
          Object.keys(mensagensErro).forEach(mensagem => {
            console.error(mensagem);
            if (mensagem == "novaSenha"){
              console.log("Entrei aqui krai")
              setErrors({ ...errors, senha: mensagensErro.novaSenha });
            } else if (mensagem.novaSenhaConfirma) {
              setErrors({ ...errors, confirmarSenha: mensagensErro.novaSenhaConfirma });
          }
        });  
        } else {
          console.error(mensagensErro || "Dados inválidos. Por favor, verifique as informações.");
        }
      } else {
        alert("Ocorreu um erro ao tentar cadastrar a senha. Por favor, tente novamente mais tarde.");
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-sm"
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
          onChange={(e) => {
            setSenha(e.target.value);
            console.log(e.target.value);
          }}
          placeholder="*********"
          largura="cheia"
          errorMessage={errors.senha}
        />
        <Input
          type="password"
          label="CONFIRMAR SENHA"
          name="confirmarSenha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value) && console.log(confirmarSenha)}
          placeholder="*********"
          largura="cheia"
          errorMessage={errors.confirmarSenha}
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
