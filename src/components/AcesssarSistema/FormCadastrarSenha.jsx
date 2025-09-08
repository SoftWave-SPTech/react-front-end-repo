import React, { useState } from 'react';
import { api } from '../../service/api';
import Botao from "../Ui/Botao";
import { Input } from "../Ui/Input";
import Alert from "../Ui/AlertStyle";

export default function FormCadastrarSenha() {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

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
    if (!validarFormulario()) return;

    try {
      const email = sessionStorage.getItem("email");
      const response = await api.patch('/auth/cadastrar-senha', {
        email: email,
        senha: senha,
        confirmaSenha: confirmarSenha,
      });
      setAlert({
        type: "success",
        message: "Senha cadastrada com sucesso!"
      });
      // auto-login
      try {
        const loginResponse = await api.post('/auth/login', { email, senha });
        if (loginResponse.status === 200) {
          const d = loginResponse.data;
          sessionStorage.setItem("id", d.id);
          sessionStorage.setItem("email", d.email);
          sessionStorage.setItem("token", d.token);
          sessionStorage.setItem("tipoUsuario", d.tipoUsuario);
          sessionStorage.setItem("role", d.role);
          sessionStorage.setItem("nome", d.nome);
          if (d.foto) sessionStorage.setItem("fotoPerfil", "http://localhost:8080/" + d.foto);
          setTimeout(() => {
            if (loginResponse.data.tipoUsuario === 'UsuarioFisico' || loginResponse.data.tipoUsuario === 'UsuarioJuridico') {
              window.location.href = "/perfil-cliente";
            } else {
              window.location.href = "/perfil-advogado";
            }
          }, 1500);
        }
      } catch (loginError) {
        console.error("Erro ao fazer login:", loginError.status);
        setAlert({
          type: "warning",
          message: "Senha cadastrada, mas houve um erro ao fazer login. Por favor, tente fazer login manualmente."
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao atualizar usuários físicos:", error.status);
      if(error.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: error.response.data.message, type: "error" })
          }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-azulEscuroForte/5 px-4 sm:px-6 py-8">
      <form
        className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-3">
          <img
            src="src/assets/images/boneco.png"
            alt="Ilustração"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-2 object-contain"
          />
          <h2 className="text-xl sm:text-2xl font-semibold">CADASTRAR SENHA</h2>
        </div>

        <div className="space-y-3">
          <Input
            type="password"
            label="SENHA"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="********"
            largura="cheia"
            errorMessage={errors.senha}
            autoComplete="new-password"
          />
          <Input
            type="password"
            label="CONFIRMAR SENHA"
            name="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="********"
            largura="cheia"
            errorMessage={errors.confirmarSenha}
            autoComplete="new-password"
          />
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <Input
          type="password"
          label="SENHA"
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
          CADASTRAR
        </Botao>

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
