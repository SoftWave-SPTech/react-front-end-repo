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
  const [usuario, setUsuario] = useState({
    nome: '',
    cpf: '',
    rg: '',
    email: '',
    telefone: '',
    logradouro: '',
    numero: '', // Novo campo para número
    bairro: '',
    cidade: '',
    complemento: '',
    cep: '',
    tipoUsuario: sessionStorage.getItem('tipoUsuario'),
  });
  const [usarioParaAtualzar, setUsuarioParaAtualizar] = useState({});
  const [errors, setErrors] = useState({});
  const URLFOTO = "/usuarios/foto-perfil";

  useEffect(() => {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    if (tipoUsuario === "UsuarioFisico") {
      api.get(`/usuarios-fisicos/${sessionStorage.getItem('id')}`, {
        headers: { Authorization: TOKEN },
      })
      .then((resposta) => {
        const dados = resposta.data;
        criarAtualizarFisicos(dados);
      })
      .catch(console.log);
    } else if (tipoUsuario === "UsuarioJuridico") {
      api.get(`/usuarios-juridicos/${sessionStorage.getItem('id')}`, {
        headers: { Authorization: TOKEN },
      })
      .then((resposta) => {
        const dados = resposta.data;
        criarAtualizarJuridicos(dados);
      })
      .catch(console.log);
    }
  }, []);

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
          console.error('Erro ao buscar CEP:', error, error.response?.data?.message);
          alert('CEP inválido ou não encontrado.');
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errosEncontrados = validarPerfilCliente(usuario);
    
    if (Object.keys(errosEncontrados).length > 0) {
      setErrors(errosEncontrados);
      return;
    }

    setErrors({});

    api.put(`/usuarios-${sessionStorage.getItem('tipoUsuario') === 'UsuarioFisico' ? 'fisicos' : 'juridicos'}/${usuario.id}`, usuario, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then(() => {
      alert('Dados atualizados com sucesso!');
    })
    .catch((err) => {
      console.error(err);
      if (err.response?.data) {
        const erros = err.response.data;
        Object.keys(erros).forEach(campo => {
          alert(`${campo}: ${erros[campo]}`);
        });
      } else {
        alert('Erro ao atualizar dados. Por favor, tente novamente.');
      }
    });
  };

  function criarAtualizarFisicos(dados) {
    setUsuario(dados);
    setUsuarioParaAtualizar({
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      logradouro: dados.logradouro,
      numero: dados.numero, // Adicionando o número
      bairro: dados.bairro,
      cidade: dados.cidade,
      complemento: dados.complemento,
      cep: dados.cep,
    });
  }

  function criarAtualizarJuridicos(dados) {
    setUsuario(dados);
    setUsuarioParaAtualizar({
      nomeFantasia: dados.nomeFantasia,
      razaoSocial: dados.razaoSocial,
      cnpj: dados.cnpj,
      email: dados.email,
      telefone: dados.telefone,
      logradouro: dados.logradouro,
      numero: dados.numero, // Adicionando o número
      bairro: dados.bairro,
      cidade: dados.cidade,
      complemento: dados.complemento,
      cep: dados.cep,
    });
  }

  function cliqueBotaoFoto() {
    fileInputRef.current.click();
  }

  function atualizarFoto(file) {
    if (!file) {
      alert("Escolha uma foto primeiro!");
    } else {
      const arquivoFormatado = new FormData();
      arquivoFormatado.append("fotoPerfil", file);

      api.put(`${URLFOTO}/${sessionStorage.getItem('id')}`, arquivoFormatado, {
        headers: { "Authorization": TOKEN }
      })
      .then(response => {
        alert("Upload realizado com sucesso!");
        sessionStorage.setItem('fotoPerfil', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error("Erro ao enviar o arquivo:", error);
        console.error("Erro ao enviar o arquivo:", error.response?.data?.message || error.message);
      });
    }
  }

  function excluirFotoPerfil() {
    api.delete(`${URLFOTO}/${sessionStorage.getItem('id')}`, {
      headers: { "Authorization": TOKEN },
    })
    .then(() => {
      alert("Foto Deletada com sucesso");
      sessionStorage.setItem('fotoPerfil', null);
      window.location.reload();
    })
    .catch(error => {
      console.error("Erro ao excluir a foto:", error);
      alert("Erro ao excluir a foto: " + (error.response?.data?.message || error.message));
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
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {sessionStorage.getItem('tipoUsuario') === 'UsuarioFisico' ? (
            <>
              <Input label="Nome:" name="nome" value={usuario.nome} onChange={handleInputChange} errorMessage={errors.nome} />
              <Input label="CPF:" name="cpf" value={usuario.cpf} onChange={handleInputChange} mask={mascaraCPF} errorMessage={errors.cpf} />
              <Input label="RG:" name="rg" value={usuario.rg} onChange={handleInputChange} mask={mascaraRG} errorMessage={errors.rg} />
            </>
          ) : (
            <>
              <Input label="Nome Fantasia:" name="nomeFantasia" value={usuario.nomeFantasia} onChange={handleInputChange} errorMessage={errors.nomeFantasia}/>
              <Input label="Razão Social:" name="razaoSocial" value={usuario.razaoSocial} onChange={handleInputChange} errorMessage={errors.razaoSocial}/>
              <Input label="CNPJ:" name="cnpj" value={usuario.cnpj} onChange={handleInputChange} mask={mascaraCNPJ} errorMessage={errors.cnpj}/>
            </>
          )}
          <Input label="Email:" name="email" value={usuario.email} onChange={handleInputChange} errorMessage={errors.email}/>
          <Input label="Telefone:" name="telefone" value={usuario.telefone} onChange={handleInputChange} mask={mascaraTelefone} errorMessage={errors.telefone}/>
          <Input label="CEP:" name="cep" value={usuario.cep} onChange={handleInputChange} mask={mascaraCEP} errorMessage={errors.cep}/>

          <div className="flex flex-col md:flex-row gap-4">
            <Input label="Logradouro:" name="logradouro" value={usuario.logradouro} onChange={handleInputChange} errorMessage={errors.logradouro} className="w-full" />
            <Input label="Número:" name="numero" value={usuario.numero} onChange={handleInputChange} errorMessage={errors.numero} className="w-1/6" /> {/* Novo campo número com largura menor */}
          </div>

          <Input label="Bairro:" name="bairro" value={usuario.bairro} onChange={handleInputChange} errorMessage={errors.bairro}/>
          <Input label="Cidade:" name="cidade" value={usuario.cidade} onChange={handleInputChange} errorMessage={errors.cidade}/>
          <Input label="Complemento:" name="complemento" value={usuario.complemento} onChange={handleInputChange} />
        </div>

        <div className="w-full flex justify-center items-center px-4 pb-6">
          <Botao onClick={handleSubmit} largura="medio">Salvar</Botao>
        </div>
      </div>
    </>
  );
}

export default FormPerfilCliente;