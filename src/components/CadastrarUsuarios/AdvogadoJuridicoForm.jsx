import { useState, useEffect } from 'react';
import axios from 'axios';
import { buscarCep } from '../../service/buscarCep';
import { validarAdvogadoJuridico } from '../../Utils/validacoes';
import EnviarChaveAcesso from './EnvioEmail.jsx';

export default function AdvogadoJuridicoForm() {
  const [formData, setFormData] = useState({
    nomeFantasia: '',
    razaoSocial: '',
    cnpj: '',
    email: '',
    oab: '',
    telefone: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    complemento: '',
    representante: '', 
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Máscaras
    const telefoneMask = new Inputmask('(99) 99999-9999', { placeholder: '(__) _____-____' });
    const cepMask = new Inputmask('99999-999', { placeholder: '_____-___' });
    const cnpjMask = new Inputmask('99.999.999/9999-99', { placeholder: '__.___.___/____-__' });

    telefoneMask.mask(document.querySelector('[name=telefone]'));
    cepMask.mask(document.querySelector('[name=cep]'));
    cnpjMask.mask(document.querySelector('[name=cnpj]'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'cep') {
      const cepLimpo = value.replace(/\D/g, '');

      if (cepLimpo.length === 8) {
        try {
          const endereco = await buscarCep(cepLimpo);

          setFormData((prevData) => ({
            ...prevData,
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
    if (!validateForm()) return;

    const novaSenha = uuidv4();
    const dadosParaEnviar = { ...formData, senha: novaSenha };

    console.log('Dados do formulário:', dadosParaEnviar);
    // TODO ESCREVER AUTORIZACAO PARA AS OUTRAS REQUESTS
    axios.post('http://localhost:8080/advogados-juridicos', dadosParaEnviar, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then((response) => 
    {
      EnviarChaveAcesso(dadosParaEnviar.nome, dadosParaEnviar.senha, dadosParaEnviar.email);

      alert('Cadastro realizado com sucesso!');
      setFormData({
        nomeFantasia: '',
        razaoSocial: '',
        representante: '', 
        cnpj: '',
        email: '',
        oab: '',
        telefone: '',
        cep: '',
        logradouro: '',
        numero: '', 
        bairro: '',
        cidade: '',
        complemento: '',
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.response?.data) {
        const erros = err.response.data;
        let mensagem = "";
          Object.keys(erros).forEach(campo => {
            if(campo === "message" && campo) {
                mensagem = erros[campo] ;
              } else if (campo === "status") {
                if (erros[campo] === 500){
                  mensagem = "Já existe um advogado cadastrado com esses dados. Por favor, verifique os dados e tente novamente.";
                }
              }
          });
          alert(mensagem)
      } else {
        alert('Erro ao cadastrar advogado. Por favor, tente novamente.');
      }
    });
  };

  return (
    <form className="bg-white p-6 rounded-b-lg shadow-md mt-0" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Nome do Representante:"
            name="representante"
            placeholder="Ex: João Silva"
            value={formData.representante}
            onChange={handleChange}
            errorMessage={errors.representante}
          />
          <Input
            label="Nome Fantasia:"
            name="nomeFantasia"
            placeholder="Ex: Advocacia Nova Era"
            value={formData.nomeFantasia}
            onChange={handleChange}
            errorMessage={errors.nomeFantasia}
          />
          <Input
            label="Razão Social:"
            name="razaoSocial"
            placeholder="Ex: Advocacia Nova Era LTDA"
            value={formData.razaoSocial}
            onChange={handleChange}
            errorMessage={errors.razaoSocial}
          />
          <Input
            label="CNPJ:"
            name="cnpj"
            placeholder="00.000.000/0000-00"
            value={formData.cnpj}
            onChange={handleChange}
            mask={mascaraCNPJ}
            errorMessage={errors.cnpj}
          />
          <Input
            label="Email:"
            name="email"
            type="email"
            placeholder="advocacia@dominio.com.br"
            value={formData.email}
            onChange={handleChange}
            errorMessage={errors.email}
          />
          <Input
            label="OAB:"
            name="oab"
            placeholder="000000"
            value={formData.oab}
            onChange={handleChange}
            mask={mascaraOAB}
            errorMessage={errors.oab}
          />
          <Input
            label="Telefone:"
            name="telefone"
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            onChange={handleChange}
            mask={mascaraTelefone}
            errorMessage={errors.telefone}
          />
        </div>

      <div className="coluna">

        <label>CEP:</label>
        <input
          type="text"
          name="cep"
          placeholder="00000-000"
          value={formData.cep}
          onChange={handleChange}
        />
        {errors.cep && <span className="error">{errors.cep}</span>}

        <label>Logradouro:</label>
        <input
          type="text"
          name="logradouro"
          placeholder="Rua Exemplo"
          value={formData.logradouro}
          onChange={handleChange}
        />
        {errors.logradouro && <span className="error">{errors.logradouro}</span>}

        <label>Bairro:</label>
        <input
          type="text"
          name="bairro"
          placeholder="Centro"
          value={formData.bairro}
          onChange={handleChange}
        />
        {errors.bairro && <span className="error">{errors.bairro}</span>}

        <label>Cidade:</label>
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={formData.cidade}
          onChange={handleChange}
        />
        {errors.cidade && <span className="error">{errors.cidade}</span>}

        <label>Complemento:</label>
        <input
          type="text"
          name="complemento"
          placeholder="Apartamento, bloco, etc."
          value={formData.complemento}
          onChange={handleChange}
        />
      </div>

      <div className="linha-centralizada">
        <button type="submit" className="btn-cadastrar">CADASTRAR</button>
      </div>
    </form>
  );
}
