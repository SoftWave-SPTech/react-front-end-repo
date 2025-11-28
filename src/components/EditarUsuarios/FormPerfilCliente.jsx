import { Input } from "../Ui/Input.jsx";
import Botao from "../Ui/Botao.jsx";
import BarraTitulo from "../Ui/BarraTitulo.jsx";
import { useEffect, useState, useRef } from "react";
import { FiUpload, FiTrash } from 'react-icons/fi';
import { api } from '../../service/api.js';
import { buscarCep } from "../../service/buscarCep.js";
import { mascaraCEP, mascaraTelefone, mascaraCPF, mascaraRG, mascaraCNPJ } from '../../Utils/mascaras';
import { validarPerfilCliente } from '../../Utils/validacoes.jsx';
import Alert from "../Ui/AlertStyle.jsx"; // Importa o AlertStyle

function FormPerfilCliente() {
  const TOKEN = `Bearer ${sessionStorage.getItem('token')}`;
  const fileInputRef = useRef(null);
  const [usuario, setUsuario] = useState({
    nomeFantasia: '',
    razaoSocial: '',
    representante: '',
    nome: '',
    cpf: '',
    rg: '',
    email: '',
    telefone: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    complemento: '',
    cep: '',
    cnpj: '',
  });
  const [usuarioParaAtualizar, setUsuarioParaAtualizar] = useState({
    nomeFantasia: '',
    razaoSocial: '',
    representante: '',
    nome: '',
    cpf: '',
    rg: '',
    email: '',
    telefone: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    complemento: '',
    cep: '',
    cnpj: '',
  });

  const [errors, setErrors] = useState({});
  const [cepAnterior, setCepAnterior] = useState('');
  const [alert, setAlert] = useState(null); // Estado para o Alert
  const URL = sessionStorage.getItem('tipoUsuario') === 'UsuarioFisico' ? "/usuarios-fisicos/" : "/usuarios-juridicos/";
  const URLFOTO = "/usuarios/foto-perfil";

  useEffect(() => {
    if (sessionStorage.getItem('tipoUsuario') === "UsuarioFisico") {
      api.get(`/usuarios-fisicos/${sessionStorage.getItem('id')}`, {
        headers: {
          Authorization: TOKEN,
        },
      })
        .then((resposta) => {
          const dados = {
            id: resposta.data.id,
            nome: resposta.data.nome,
            cpf: resposta.data.cpf,
            rg: resposta.data.rg,
            email: resposta.data.email,
            telefone: resposta.data.telefone,
            logradouro: resposta.data.logradouro,
            representante: resposta.data.representante,
            numero: resposta.data.numero,
            bairro: resposta.data.bairro,
            cidade: resposta.data.cidade,
            complemento: resposta.data.complemento,
            cep: resposta.data.cep
          };
          criarAtualizarFisicos(dados);
        })
        .catch((erro) => {
          if(erro.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: erro.response.data.message, type: "error" })
          }
          console.error("Erro ao buscar usuários físicos:", erro.status);
        });

    } else if (sessionStorage.getItem('tipoUsuario') === "UsuarioJuridico") {
      api.get(`/usuarios-juridicos/${sessionStorage.getItem('id')}`, {
        headers: {
          Authorization: TOKEN,
        },
      })
        .then((resposta) => {
          const dados = {
            id: resposta.data.id,
            nomeFantasia: resposta.data.nomeFantasia,
            razaoSocial: resposta.data.razaoSocial,
            cnpj: resposta.data.cnpj,
            representante: resposta.data.representante,
            email: resposta.data.email,
            telefone: resposta.data.telefone,
            logradouro: resposta.data.logradouro,
            numero: resposta.data.numero,
            bairro: resposta.data.bairro,
            cidade: resposta.data.cidade,
            complemento: resposta.data.complemento,
            cep: resposta.data.cep
          };
          criarAtualizarJuridicos(dados);
        })
        .catch((erro) => {
          console.error("Erro ao buscar usuários jurídicos:", erro.status);
          if(erro.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: erro.response.data.message, type: "error" })
          }
        });
    }

    // Buscar foto do perfil da AWS
    api.get(`${URLFOTO}/${sessionStorage.getItem('id')}`, {
      headers: {
        Authorization: TOKEN,
      },
    })
      .then((resposta) => {
        if (resposta.data) {
          sessionStorage.setItem('fotoPerfil', resposta.data);
        }
      })
      .catch((erro) => {
        console.error("Erro ao buscar foto do perfil:", erro.status);
        // Não precisa mostrar erro para o usuário, apenas log
      })
  }, []);

  //TODO avaliar utilidade dessa função
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setUsuarioParaAtualizar(prev => ({
      ...prev,
      [name]: value,
    }));
    setUsuario(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'cep') {
      const cepLimpo = value.replace(/\D/g, '');
      if (cepLimpo.length === 8) {
        try {
          const endereco = await buscarCep(cepLimpo);
          setUsuarioParaAtualizar(prev => ({
            ...prev,
            logradouro: endereco.logradouro || '',
            bairro: endereco.bairro || '',
            cidade: endereco.localidade || '',
          }));
          setUsuario(prev => ({
            ...prev,
            logradouro: endereco.logradouro || '',
            bairro: endereco.bairro || '',
            cidade: endereco.localidade || '',
          }));
        } catch (error) {
          setAlert({
            type: "error",
            message: "CEP inválido ou não encontrado."
          });
        }
      }
    }
  };

  function criarAtualizarFisicos(dados) {
    setUsuario(dados);
    setUsuarioParaAtualizar({
      nome: dados.nome,
      email: dados.email,
      cpf: dados.cpf,
      rg: dados.rg,
      telefone: dados.telefone,
      logradouro: dados.logradouro,
      numero: dados.numero,
      bairro: dados.bairro,
      cidade: dados.cidade,
      complemento: dados.complemento,
      cep: dados.cep
    });
  }

  function criarAtualizarJuridicos(dados) {
    setUsuario(dados);
    setUsuarioParaAtualizar({
      nomeFantasia: dados.nomeFantasia,
      razaoSocial: dados.razaoSocial,
      cnpj: dados.cnpj,
      representante: dados.representante,
      email: dados.email,
      telefone: dados.telefone,
      logradouro: dados.logradouro,
      numero: dados.numero,
      bairro: dados.bairro,
      cidade: dados.cidade,
      complemento: dados.complemento,
      cep: dados.cep
    });
  }

  async function buscarEnderecoPorCep(cep) {
    try {
      const endereco = await buscarCep(cep);
      setUsuarioParaAtualizar((prev) => ({
        ...prev,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
      }));
      setUsuario((prev) => ({
        ...prev,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
      }));
    } catch (error) {
      setAlert({
        type: "error",
        message: "CEP inválido ou não encontrado."
      });
    }
  }

  function enviarDadosParaAtualizacao() {
    if (sessionStorage.getItem('tipoUsuario') === "UsuarioFisico") {

      const tipoUsuario = sessionStorage.getItem('tipoUsuario');

      const dadosParaValidar =
      {
        ...usuarioParaAtualizar,
        tipoUsuario: tipoUsuario,
      };

      const errosEncontrados = validarPerfilCliente(dadosParaValidar);
      console.log(errosEncontrados);

      if (Object.keys(errosEncontrados).length > 0) {
        setErrors(errosEncontrados);
        return;
      }

      api.put(`/usuarios-fisicos/${usuario.id}`, usuarioParaAtualizar, {
        headers: {
          Authorization: TOKEN,
        },
      })
        .then((resposta) => {
          setAlert({
            type: "success",
            message: "Dados Atualizados com sucesso!"
          });
          sessionStorage.setItem('nome', usuarioParaAtualizar.nome);
          sessionStorage.setItem('email', usuarioParaAtualizar.email);
          setTimeout(() => window.location.reload(), 1500);
        })
        .catch((erro) => {
          console.error("Erro ao atualizar usuários físicos:", erro.status);
          if(erro.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: erro.response.data.message, type: "error" })
          }
        });

    } else if (sessionStorage.getItem('tipoUsuario') === "UsuarioJuridico") {

      const tipoUsuario = sessionStorage.getItem('tipoUsuario');

      const dadosParaValidar =
      {
        ...usuarioParaAtualizar,
        tipoUsuario: tipoUsuario,
      };

      const errosEncontrados = validarPerfilCliente(dadosParaValidar);
      console.log(errosEncontrados);

      if (Object.keys(errosEncontrados).length > 0) {
        setErrors(errosEncontrados);
        return;
      }

      api.put(`/usuarios-juridicos/${usuario.id}`, usuarioParaAtualizar, {
        headers: {
          Authorization: TOKEN,
        },
      })
        .then((resposta) => {
          setAlert({
            type: "success",
            message: "Dados Atualizados com sucesso!"
          });
          sessionStorage.setItem('nome', usuarioParaAtualizar.nomeFantasia);
          sessionStorage.setItem('email', usuarioParaAtualizar.email);
          setTimeout(() => window.location.reload(), 1500);
        })
        .catch((erro) => {
          if(erro.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: erro.response.data.message, type: "error" })
          }
          console.error("Erro ao atualizar usuários jurídicos:", erro.status);
        });
    }
  }

  function cliqueBotaoFoto() {
    fileInputRef.current.click();
  }

  function atualizarFoto(file) {
    if (!file) {
      setAlert({
        type: "warning",
        message: "Escolha uma foto primeiro!"
      });
    } else {
      const arquivoFormatado = new FormData();
      arquivoFormatado.append("fotoPerfil", file);

      api.put(`${URLFOTO}/${sessionStorage.getItem('id')}`, arquivoFormatado, {
        headers: {
          "Authorization": TOKEN
        }
      })
        .then(response => {
          sessionStorage.setItem('fotoPerfil', response.data);
          setAlert({
            type: "success",
            message: "Foto Atualizada com sucesso!"
          });
          setTimeout(() => window.location.reload(), 1500);
        })
        .catch(error => {
          console.error("Erro ao atualizar foto de perfil:", error.status);
          if(error.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: error.response.data.message, type: "error" })
          }
        });
    }
  }

  function excluirFotoPerfil() {
    api.delete(`${URLFOTO}/${sessionStorage.getItem('id')}`, {
      headers: {
        "Authorization": TOKEN,
      }
    })
      .then(response => {
        sessionStorage.removeItem('fotoPerfil');
        setAlert({
          type: "success",
          message: "Foto removida com sucesso!"
        });
        setTimeout(() => window.location.reload(), 1500);
      })
      .catch(error => {
        console.error("Erro ao excluuir foto de perfil:", error.status);
        if(error.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: error.response.data.message, type: "error" })
          }
      });
  }

  return (
    <>
      {alert && (
        <div className="w-full max-w-[75%] mx-auto">
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <div className="flex justify-center">
        <BarraTitulo tamanho="grande" cor="escuro" className="rounded-lg w-full max-w-[75%] text-base">
          Foto do usuário
        </BarraTitulo>
      </div>

      <div className="w-full max-w-[75%] mx-auto py-3 mb-4 flex flex-col gap-4 shadow-md rounded-lg bg-white">
        <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <img
            src={(() => {
              const fotoUrl = sessionStorage.getItem('fotoPerfil');
              const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
              if (fotoUrl && fotoUrl !== `${FILE_BASE_URL}/null` && fotoUrl !== "http://localhost:8080/null") {
                return fotoUrl;
              }
              return '/src/assets/images/boneco.png';
            })()}
            alt="Foto de perfil"
            className="w-28 h-28 rounded-full border-2 border-azulEscuroForte shadow-md object-cover bg-gray-100"
          />
          <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">
            <Botao
              cor="contornoAzul"
              tamanho="extraPequeno"
              largura="auto"
              className="flex justify-center items-center px-6 py-2 text-base w-[8rem] whitespace-nowrap"
              onClick={cliqueBotaoFoto}
            >
              <span className="flex items-center gap-2">
                Subir foto <FiUpload size={18} />
              </span>
            </Botao>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => atualizarFoto(e.target.files[0])}
            />

            <Botao
              cor="padrao"
              tamanho="extraPequeno"
              largura="auto"
              className="flex justify-center items-center px-6 py-2 text-base w-[8rem] whitespace-nowrap"
              onClick={excluirFotoPerfil}
            >
              <span className="flex items-center gap-2">
                Remover <FiTrash size={18} />
              </span>
            </Botao>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <BarraTitulo tamanho="grande" cor="escuro" className="rounded-lg w-full max-w-[75%] text-base">
          Informações Pessoais
        </BarraTitulo>
      </div>

      <div className="w-full max-w-[75%] mx-auto py-2 mb-6 flex flex-col gap-4 shadow-md rounded-lg bg-white">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {sessionStorage.getItem('tipoUsuario') === 'UsuarioFisico' ? (
            <>
              <Input label="Nome:" name="nome" placeholder="Ex: João Silva" value={usuario.nome}
                onChange={(e) => {
                  setUsuarioParaAtualizar({ ...usuarioParaAtualizar, nome: e.target.value });
                  setUsuario({ ...usuario, nome: e.target.value });
                }}
                errorMessage={errors.nome}
              />
              <Input label="CPF:" name="cpf" placeholder="000.000.000-00" value={mascaraCPF(usuario.cpf)} disabled />
              <Input label="RG:" name="rg" placeholder="00.000.000-0" value={mascaraRG(usuario.rg)} disabled />
            </>
          ) : (
            <>
              <Input label="Nome do representante" name="representante" placeholder="Ex: João Silva" value={usuario.representante}
                onChange={(e) => {
                  setUsuarioParaAtualizar({ ...usuarioParaAtualizar, representante: e.target.value });
                  setUsuario({ ...usuario, representante: e.target.value });
                }}
                errorMessage={errors.representante}
              />
              <Input label="Nome Fantasia:" name="nomeFantasia" placeholder="Ex: Advocacia Nova Era" value={usuario.nomeFantasia}
                onChange={(e) => {
                  setUsuarioParaAtualizar({ ...usuarioParaAtualizar, nomeFantasia: e.target.value });
                  setUsuario({ ...usuario, nomeFantasia: e.target.value });
                }}
                errorMessage={errors.nomeFantasia}
              />
              <Input label="Razão Social:" name="razaoSocial" placeholder="Ex: Advocacia Nova Era LTDA" value={usuario.razaoSocial}
                onChange={(e) => {
                  setUsuarioParaAtualizar({ ...usuarioParaAtualizar, razaoSocial: e.target.value });
                  setUsuario({ ...usuario, razaoSocial: e.target.value });
                }}
                errorMessage={errors.razaoSocial}
              />
              <Input label="CNPJ:" name="cnpj" placeholder="00.000.000/0000-00" value={mascaraCNPJ(usuario.cnpj)}
                onChange={(e) => {
                  setUsuarioParaAtualizar({ ...usuarioParaAtualizar, cnpj: e.target.value });
                  setUsuario({ ...usuario, cnpj: e.target.value });
                }}
                errorMessage={errors.cnpj}
              />
            </>
          )}

          <Input label="Email:" name="email" placeholder="advocacia@dominio.com.br" value={usuario.email}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, email: e.target.value });
              setUsuario({ ...usuario, email: e.target.value });
            }}
            errorMessage={errors.email}
          />

          <Input label="Telefone:" name="telefone" placeholder="(00) 00000-0000" value={mascaraTelefone(usuario.telefone)}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, telefone: e.target.value });
              setUsuario({ ...usuario, telefone: e.target.value });
            }}
            errorMessage={errors.telefone}
          />

          <Input label="CEP:" name="cep" placeholder="00000-000" value={mascaraCEP(usuario.cep)}
            onChange={(e) => {
              const novoCep = e.target.value;
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, cep: novoCep });
              setUsuario({ ...usuario, cep: novoCep });
              if (novoCep.replace(/\D/g, '').length === 8 && novoCep !== cepAnterior) {
                buscarEnderecoPorCep(novoCep);
                setCepAnterior(novoCep);
              }
            }}
            errorMessage={errors.cep}
          />

          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full">
              <Input label="Logradouro:" name="logradouro" placeholder="Ex: Rua das Flores" value={usuario.logradouro}
                onChange={(e) => {
                  setUsuarioParaAtualizar({ ...usuarioParaAtualizar, logradouro: e.target.value });
                  setUsuario({ ...usuario, logradouro: e.target.value });
                }}
                className="w-full"
                errorMessage={errors.logradouro}
              />
            </div>
            <div className="w-1/4">
              <Input label="Número:" name="numero" placeholder="Ex: 123" value={usuario.numero || ""}
                onChange={(e) => {
                  setUsuarioParaAtualizar({ ...usuarioParaAtualizar, numero: e.target.value });
                  setUsuario({ ...usuario, numero: e.target.value });
                }}
                className="w-full"
                errorMessage={errors.numero}
              />
            </div>
          </div>

          <Input label="Bairro:" name="bairro" placeholder="Ex: Centro" value={usuario.bairro}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, bairro: e.target.value });
              setUsuario({ ...usuario, bairro: e.target.value });
            }}
            errorMessage={errors.bairro}
          />
          <Input label="Cidade:" name="cidade" placeholder="Ex: Belo Horizonte" value={usuario.cidade}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, cidade: e.target.value });
              setUsuario({ ...usuario, cidade: e.target.value });
            }}
            errorMessage={errors.cidade}
          />
          <Input label="Complemento:" name="complemento" placeholder="Ex: Sala 01, Ed. Omega" value={usuario.complemento}
            onChange={(e) => {
              setUsuarioParaAtualizar({ ...usuarioParaAtualizar, complemento: e.target.value });
              setUsuario({ ...usuario, complemento: e.target.value });
            }}
          />
        </div>
        <div className="w-full flex justify-center items-center px-4 pb-4">
          <Botao onClick={enviarDadosParaAtualizacao} tamanho="grande" largura="pequeno">Salvar</Botao>
        </div>
      </div>
    </>
  );
}

export default FormPerfilCliente;