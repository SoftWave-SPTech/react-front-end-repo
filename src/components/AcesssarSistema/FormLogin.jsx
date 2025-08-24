import React, { useState } from 'react';
import { api } from '../../service/api';
import Botao from '../Ui/Botao';
import { Input } from '../Ui/Input';
import { Link } from 'react-router-dom';

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [senha, setsenha] = useState("");
  const [errors, setErrors] = useState({});

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
    if (!validarFormulario()) return;

    try {
      const response = await api.post('/auth/login', {
        email,
        senha,
      });

      if (response.status === 200) {
        const d = response.data;
        alert("Login realizado com sucesso!");

        sessionStorage.setItem("id", d.id);
        sessionStorage.setItem("email", d.email);
        sessionStorage.setItem("token", d.token);
        sessionStorage.setItem("tipoUsuario", d.tipoUsuario);
        sessionStorage.setItem("role", d.role);
        sessionStorage.setItem("nome", d.nome);
        if (d.foto) {
          sessionStorage.setItem("fotoPerfil", "http://localhost:8080/" + d.foto);
        }

        if (d.role === "ROLE_USUARIO") {
          window.location.href = "/perfil-cliente";
        } else if (d.role === "ROLE_ADMIN") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/perfil-advogado";
        }
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Email ou senha incorretos. Por favor, verifique suas credenciais.");
      } else if (error.response?.status === 400) {
        const mensagensErro = error.response.data;
        if (typeof mensagensErro === 'object') {
          Object.values(mensagensErro).forEach(mensagem => alert(mensagem));
        } else {
          alert(mensagensErro || "Dados inválidos. Por favor, verifique as informações.");
        }
      } else {
        alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-azulEscuroForte px-4 sm:px-6 py-8">
      <form
        className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <img
            src="src/assets/images/boneco.png"
            alt="Ilustração"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-2 object-contain"
          />
          <h2 className="text-xl sm:text-2xl font-semibold">LOGIN</h2>
        </div>

        <div className="mt-4 space-y-3">
          <Input
            label="E-MAIL"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            largura="cheia"
            errorMessage={errors.email}
            autoComplete="email"
          />

          <Input
            type="password"
            label="SENHA"
            name="senha"
            value={senha}
            onChange={(e) => setsenha(e.target.value)}
            placeholder="********"
            largura="cheia"
            errorMessage={errors.senha}
            autoComplete="current-password"
          />
        </div>

        <p className="mt-3 mb-5 text-left">
          <Link to="/redefinir-senha" className="text-azulEscuroForte hover:underline hover:text-dourado text-sm">
            ESQUECI MINHA SENHA
          </Link>
        </p>

        <Botao largura="cheia" cor="padrao" type="submit">
          ENTRAR
        </Botao>

        <p className="mt-4 text-center text-black text-sm">
          É SEU PRIMEIRO ACESSO?{" "}
          <Link to="/primeiro-acesso" className="font-bold text-azulEscuroForte hover:underline hover:text-dourado">
            ENTRE AQUI.
          </Link>
        </p>

        <Botao
          tamanho="pequeno"
          cor="contornoAzul"
          type="button"
          className="block mx-auto mt-5"
          onClick={() => window.history.back()}
        >
          VOLTAR
        </Botao>
      </form>
    </div>
  );
}
