import { Input } from "../Ui/Input.jsx";
import Botao from "../Ui/Botao.jsx";
import BarraTitulo from "../Ui/BarraTitulo.jsx";
import minhaImagem from '../../assets/images/boneco.png'
import { useEffect, useState, useRef } from "react";
import { FiUpload, FiTrash } from 'react-icons/fi';
import { api } from '../../service/api.js';

function FormPerfilCliente() {
  const TOKEN = `Bearer ${sessionStorage.getItem('token')}`;
  const fileInputRef = useRef(null);
  const [usuario, setUsuario] = useState({});
  const [usarioParaAtualzar, setUsuarioParaAtualizar] = useState({});
  const URL = sessionStorage.getItem('tipoUsuario') == 'UsuarioFisico' ? "/usuarios-fisicos/" :"/usuarios-juridicos/"
  const URLFOTO = "/usuarios/foto-perfil"

            

  useEffect(() => {

    if (sessionStorage.getItem('tipoUsuario') == "UsuarioFisico") {

      api.get(`/usuarios-fisicos/${sessionStorage.getItem('id')}`, {
        headers: {
          Authorization: TOKEN,
        },
      })
        .then((resposta) => {
          console.log(resposta)
          const dados = {
            "id": resposta.data.id,
            "nome": resposta.data.nome,
            "cpf": resposta.data.cpf,
            "rg": resposta.data.rg,
            "email": resposta.data.email,
            "telefone": resposta.data.telefone,
            "logradouro": resposta.data.logradouro,
            "bairro": resposta.data.bairro,
            "cidade": resposta.data.cidade,
            "complemento": resposta.data.complemento,
            "cep": resposta.data.cep
          }

          criarAtualizarFisicos(dados)

        })
        .catch((erro) => {
          console.log(erro)
        })

    } else if (sessionStorage.getItem('tipoUsuario') == "UsuarioJuridico") {

      api.get(`/usuarios-juridicos/${sessionStorage.getItem('id')}`, {
        headers: {
          Authorization: TOKEN,
        },
      })
        .then((resposta) => {
          console.log(resposta)

          const dados = {
            "id": resposta.data.id,
            "nomeFantasia": resposta.data.nomeFantasia,
            "razaoSocial": resposta.data.razaoSocial,
            "cnpj": resposta.data.cnpj,
            "email": resposta.data.email,
            "telefone": resposta.data.telefone,
            "logradouro": resposta.data.logradouro,
            "bairro": resposta.data.bairro,
            "cidade": resposta.data.cidade,
            "complemento": resposta.data.complemento,
            "cep": resposta.data.cep
          }

          criarAtualizarJuridicos(dados)

        })
        .catch((erro) => {
          console.log(erro)
        })
    }
  }, []);

  function criarAtualizarFisicos(dados) 
  {
    setUsuario(dados);
    setUsuarioParaAtualizar({
      "nome": dados.nome,
      "email": dados.email,
      "telefone": dados.telefone,
      "logradouro": dados.logradouro,
      "bairro": dados.bairro,
      "cidade": dados.cidade,
      "complemento": dados.complemento,
      "cep": dados.cep
    })
  }

  function criarAtualizarJuridicos(dados) 
  {
    setUsuario(dados);

    setUsuarioParaAtualizar({
      "nomeFantasia": dados.nomeFantasia,
      "razaoSocial": dados.razaoSocial,
      "cnpj": dados.cnpj,
      "email": dados.email,
      "telefone": dados.telefone,
      "logradouro": dados.logradouro,
      "bairro": dados.bairro,
      "cidade": dados.cidade,
      "complemento": dados.complemento,
      "cep": dados.cep
    })
  }

  function enviarDadosParaAtualizacao() {
    console.log(usarioParaAtualzar)

    if (sessionStorage.getItem('tipoUsuario') == "UsuarioFisico") {

      api.put(`/usuarios-fisicos/${usuario.id}`, usarioParaAtualzar, {
        headers: {
          Authorization: TOKEN,
        },
      })
        .then((resposta) => {
          console.log(resposta)

          alert("Dados Atualizados com sucesso!");
        })
        .catch((erro) => {
          console.log(erro)

          alert("Ocorreu um erro, tente novamente!");
        })

    } else if (sessionStorage.getItem('tipoUsuario') == "UsuarioJuridico") {

      api.put(`/usuarios-juridicos/${usuario.id}`, usarioParaAtualzar, {
        headers: {
          Authorization: TOKEN,
        },
      })
        .then((resposta) => {
          console.log(resposta)

          alert("Dados Atualizados com sucesso!");
        })
        .catch((erro) => {
          console.log(erro)

          alert("Ocorreu um erro, tente novamente!");
        })
    }
  }

  function cliqueBotaoFoto() {
    fileInputRef.current.click();
  }

  function atualizarFoto(file) {
        console.log(file)
        if (!file) {
            alert("Escolha uma foto primeiro!");
        } else {

            // FormData é um objeto nativo do JavaScript (existe mesmo sem React).
            // Ele foi criado para simular um formulário HTML em JavaScript, para que a gente possa enviar arquivos e outros dados para o servidor via código.
            // Ele embala o arquivo certinho no formato multipart/form-data, que é um formato especial para enviar:

            // Arquivos (.png, .jpg, .pdf, etc).

            const arquivoFormatado = new FormData();
            arquivoFormatado.append("fotoPerfil", file);

            api.put(`${URLFOTO}/${sessionStorage.getItem('id')}`, arquivoFormatado, {
            headers: {
                "Authorization":  TOKEN
            }
            })
            .then(response => {
            console.log("Upload realizado com sucesso:", response.data);
              sessionStorage.setItem('fotoPerfil', response.data);
              window.location.reload()
            })
            .catch(error => {
            console.error("Erro ao enviar o arquivo:", error);
            });
        }
    }

    function excluirFotoPerfil(){
      api.delete(`${URLFOTO}/${sessionStorage.getItem('id')}`, {
            headers: {
                "Authorization":  TOKEN,
            }
            })
            .then(response => {
            console.log("Foto Deletada com sucesso");
            sessionStorage.setItem('fotoPerfil', null);
            window.location.reload()

            })
            .catch(error => {
            console.error("Erro ao enviar o arquivo:", error);
            });
    }

  return (
    <>
      <div className="w-full max-w-[65%] mx-auto py-6 mb-6 flex flex-col gap-6 shadow-md rounded-lg bg-transparent">
        <BarraTitulo tamanho="responsivo" largura="grande" cor="escuro" className="rounded-lg">
          Foto do usuário
        </BarraTitulo>
        <div className="px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-6">
          <img
            src={sessionStorage.getItem('fotoPerfil') != null || sessionStorage.getItem('fotoPerfil') != undefined ? sessionStorage.getItem('fotoPerfil') : minhaImagem}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full border-[3px] border-white shadow-md object-cover"
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <Botao cor="contornoAzul" largura="auto" onClick={cliqueBotaoFoto}>
              Subir foto <FiUpload className="ml-1 inline-block"/>
            </Botao>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => atualizarFoto(e.target.files[0])}
            />
            <Botao cor="padrao" largura="auto" onClick={excluirFotoPerfil}>
              Eliminar <FiTrash className="ml-1 inline-block"/>
            </Botao>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[65%] mx-auto py-4 mb-10 flex flex-col gap-6 shadow-md rounded-lg bg-transparent">
        <BarraTitulo tamanho="responsivo" largura="grande" cor="escuro" className="rounded-lg">
          Informações pessoais
        </BarraTitulo>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {sessionStorage.getItem('tipoUsuario') === 'UsuarioFisico' ? (
            <>
              <Input label="Nome:" name="nome" value={usuario.nome}
                onChange={(e) => {
                  setUsuarioParaAtualizar({ ...usuarioParaAtualizar, nome: e.target.value });
                  setUsuario({ ...usuario, nome: e.target.value });
                }}
              />
              <Input label="CPF:" name="cpf" value={usuario.cpf} disabled />
              <Input label="RG:" name="rg" value={usuario.rg} disabled />
            </>
          ) : (
            <>
              <Input label="Nome Fantasia:" name="nomeFantasia" value={usuario.nomeFantasia}
                onChange={(e) => {
                  setUsuarioParaAtualizar({ ...usuarioParaAtualizar, nomeFantasia: e.target.value });
                  setUsuario({ ...usuario, nomeFantasia: e.target.value });
                }}
              />
              <Input label="Razão Social:" name="razaoSocial" value={usuario.razaoSocial}
                onChange={(e) => {
                  setUsuarioParaAtualizar({ ...usuarioParaAtualizar, razaoSocial: e.target.value });
                  setUsuario({ ...usuario, razaoSocial: e.target.value });
                }}
              />
              <Input label="CNPJ:" name="cnpj" value={usuario.cnpj}
                onChange={(e) => {
                  setUsuarioParaAtualizar({ ...usuarioParaAtualizar, cnpj: e.target.value });
                  setUsuario({ ...usuario, cnpj: e.target.value });
                }}
              />
            </>
          )}

          <Input label="Email:" name="email" value={usuario.email}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, email: e.target.value });
              setUsuario({ ...usuario, email: e.target.value });
            }}
          />
          <Input label="Telefone:" name="telefone" value={usuario.telefone}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, telefone: e.target.value });
              setUsuario({ ...usuario, telefone: e.target.value });
            }}
          />
          <Input label="CEP:" name="cep" value={usuario.cep}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, cep: e.target.value });
              setUsuario({ ...usuario, cep: e.target.value });
            }}
          />
          <Input label="Logradouro:" name="logradouro" value={usuario.logradouro}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, logradouro: e.target.value });
              setUsuario({ ...usuario, logradouro: e.target.value });
            }}
          />
          <Input label="Bairro:" name="bairro" value={usuario.bairro}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, bairro: e.target.value });
              setUsuario({ ...usuario, bairro: e.target.value });
            }}
          />
          <Input label="Cidade:" name="cidade" value={usuario.cidade}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, cidade: e.target.value });
              setUsuario({ ...usuario, cidade: e.target.value });
            }}
          />
          <Input label="Complemento:" name="complemento" value={usuario.complemento}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, complemento: e.target.value });
              setUsuario({ ...usuario, complemento: e.target.value });
            }}
          />
        </div>

        <div className="w-full flex justify-center items-center px-4 pb-6">
          <Botao onClick={enviarDadosParaAtualizacao} largura="medio">Salvar</Botao>
        </div>
      </div>
    </>
  );

}

export default FormPerfilCliente;
