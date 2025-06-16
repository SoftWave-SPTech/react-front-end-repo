import { Input } from "../Ui/Input.jsx";
import Botao from "../Ui/Botao.jsx";
import BarraTitulo from "../Ui/BarraTitulo.jsx";
import minhaImagem from '../../assets/images/boneco.png';
import { useEffect, useState, useRef } from "react";
import { FiUpload, FiTrash } from 'react-icons/fi';
import { api } from '../../service/api.js';
import { buscarCep } from '../../service/buscarCep';
import { validarPerfilCliente } from '../../Utils/validacoes';
import { mascaraCEP, mascaraTelefone, mascaraCPF, mascaraRG, mascaraCNPJ } from '../../Utils/mascaras';

function FormPerfilCliente() {
  const TOKEN = `Bearer ${sessionStorage.getItem('token')}`;
  const fileInputRef = useRef(null);

  const [usuario, setUsuario] = useState({});
  const [usuarioParaAtualizar, setUsuarioParaAtualizar] = useState({});
  const [errors, setErrors] = useState({});

  const URLFOTO = "/usuarios/foto-perfil";

  useEffect(() => {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    const id = sessionStorage.getItem('id');

    const url = tipoUsuario === "UsuarioFisico" ? `/usuarios-fisicos/${id}` : `/usuarios-juridicos/${id}`;

    api.get(url, {
      headers: { Authorization: TOKEN },
    })
    .then((res) => {
      const dados = res.data;
      setUsuario(dados);
      preencherFormulario(dados, tipoUsuario);
    })
    .catch(console.error);
  }, []);

  function preencherFormulario(dados, tipoUsuario) {
    if (tipoUsuario === "UsuarioFisico") {
      setUsuarioParaAtualizar({
        nome: dados.nome || '',
        cpf: dados.cpf || '',
        rg: dados.rg || '',
        email: dados.email || '',
        telefone: dados.telefone || '',
        cep: dados.cep || '',
        logradouro: dados.logradouro || '',
        numero: dados.numero || '',
        bairro: dados.bairro || '',
        cidade: dados.cidade || '',
        complemento: dados.complemento || '',
      });
    } else {
      setUsuarioParaAtualizar({
        nomeFantasia: dados.nomeFantasia || '',
        razaoSocial: dados.razaoSocial || '',
        cnpj: dados.cnpj || '',
        email: dados.email || '',
        telefone: dados.telefone || '',
        cep: dados.cep || '',
        logradouro: dados.logradouro || '',
        numero: dados.numero || '',
        bairro: dados.bairro || '',
        cidade: dados.cidade || '',
        complemento: dados.complemento || '',
      });
    }
  }

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    const novoValor = name === 'cep' ? mascaraCEP(value) :
                      name === 'telefone' ? mascaraTelefone(value) :
                      name === 'cpf' ? mascaraCPF(value) :
                      name === 'rg' ? mascaraRG(value) :
                      name === 'cnpj' ? mascaraCNPJ(value) : value;

    setUsuarioParaAtualizar(prev => ({
      ...prev,
      [name]: novoValor,
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
        } catch {
          alert('CEP inválido ou não encontrado.');
        }
      }
    }
  };

  const validarDados = () => {
    const erros = validarPerfilCliente(usuarioParaAtualizar);
    setErrors(erros);
    return Object.keys(erros).length === 0;
  };

  const enviarDadosParaAtualizacao = (e) => {
    e.preventDefault();
    if (!validarDados()) return;

    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    const id = sessionStorage.getItem('id');

    const url = tipoUsuario === "UsuarioFisico" ? `/usuarios-fisicos/${id}` : `/usuarios-juridicos/${id}`;

    api.put(url, usuarioParaAtualizar, {
      headers: { Authorization: TOKEN },
    })
    .then(() => {
      alert("Dados atualizados com sucesso!");
      window.location.reload();
    })
    .catch(() => {
      alert("Erro ao atualizar, tente novamente.");
    });
  };

  function cliqueBotaoFoto() {
    fileInputRef.current.click();
  }

  function atualizarFoto(file) {
    if (!file) {
      alert("Escolha uma foto primeiro!");
    } else {
      const formData = new FormData();
      formData.append("fotoPerfil", file);

      api.put(`${URLFOTO}/${sessionStorage.getItem('id')}`, formData, {
        headers: { "Authorization": TOKEN },
      })
      .then((res) => {
        alert("Upload realizado com sucesso!");
        sessionStorage.setItem('fotoPerfil', res.data);
        window.location.reload();
      })
      .catch(() => {
        alert("Erro ao enviar o arquivo.");
      });
    }
  }

  function excluirFotoPerfil() {
    api.delete(`${URLFOTO}/${sessionStorage.getItem('id')}`, {
      headers: { "Authorization": TOKEN },
    })
    .then(() => {
      alert("Foto excluída com sucesso!");
      sessionStorage.setItem('fotoPerfil', null);
      window.location.reload();
    })
    .catch(() => {
      alert("Erro ao excluir a foto.");
    });
  }

  return (
    <>
      <div className="w-full max-w-[75%] mx-auto py-6 mb-6 flex flex-col gap-6 shadow-md rounded-lg bg-white">
        <BarraTitulo tamanho="responsivo" largura="grande" cor="escuro" className="rounded-lg">
          Foto do usuário
        </BarraTitulo>
        <div className="px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-6">
          <img
            src={sessionStorage.getItem('fotoPerfil') || minhaImagem}
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
              Remover <FiTrash className="ml-1 inline-block"/>
            </Botao>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[75%] mx-auto py-4 mb-10 flex flex-col gap-6 shadow-md rounded-lg bg-white">
        <BarraTitulo tamanho="responsivo" largura="grande" cor="escuro" className="rounded-lg">
          Informações pessoais
        </BarraTitulo>
        <form onSubmit={enviarDadosParaAtualizacao}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {sessionStorage.getItem('tipoUsuario') === 'UsuarioFisico' ? (
              <>
                <Input label="Nome:" name="nome" value={usuarioParaAtualizar.nome} onChange={handleInputChange} errorMessage={errors.nome} />
                <Input label="CPF:" name="cpf" value={usuarioParaAtualizar.cpf} onChange={handleInputChange} errorMessage={errors.cpf} />
                <Input label="RG:" name="rg" value={usuarioParaAtualizar.rg} onChange={handleInputChange} errorMessage={errors.rg} />
              </>
            ) : (
              <>
                <Input label="Nome Fantasia:" name="nomeFantasia" value={usuarioParaAtualizar.nomeFantasia} onChange={handleInputChange} errorMessage={errors.nomeFantasia}/>
                <Input label="Razão Social:" name="razaoSocial" value={usuarioParaAtualizar.razaoSocial} onChange={handleInputChange} errorMessage={errors.razaoSocial}/>
                <Input label="CNPJ:" name="cnpj" value={usuarioParaAtualizar.cnpj} onChange={handleInputChange} errorMessage={errors.cnpj}/>
              </>
            )}
            <Input label="Email:" name="email" value={usuarioParaAtualizar.email} onChange={handleInputChange} errorMessage={errors.email}/>
            <Input label="Telefone:" name="telefone" value={usuarioParaAtualizar.telefone} onChange={handleInputChange} errorMessage={errors.telefone}/>
            <Input label="CEP:" name="cep" value={usuarioParaAtualizar.cep} onChange={handleInputChange} errorMessage={errors.cep}/>

            <div className="flex flex-col md:flex-row gap-4">
              <Input label="Logradouro:" name="logradouro" value={usuarioParaAtualizar.logradouro} onChange={handleInputChange} errorMessage={errors.logradouro} className="w-full" />
              <Input label="Número:" name="numero" value={usuarioParaAtualizar.numero} onChange={handleInputChange} errorMessage={errors.numero} className="w-1/4" />
            </div>

            <Input label="Bairro:" name="bairro" value={usuarioParaAtualizar.bairro} onChange={handleInputChange} errorMessage={errors.bairro}/>
            <Input label="Cidade:" name="cidade" value={usuarioParaAtualizar.cidade} onChange={handleInputChange} errorMessage={errors.cidade}/>
            <Input label="Complemento:" name="complemento" value={usuarioParaAtualizar.complemento} onChange={handleInputChange} />
          </div>

          <div className="w-full flex justify-center items-center px-4 pb-6">
            <Botao type="submit" largura="medio">Salvar</Botao>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormPerfilCliente;
