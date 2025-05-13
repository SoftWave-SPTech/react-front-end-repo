import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Botao from '../../components/Ui/Botao';
import { Input } from '../Ui/Input';

import { mascaraCNPJ, mascaraTelefone, mascaraCEP } from '../../Utils/mascaras';
import { buscarCep } from '../../service/buscarCep';
import { validarCamposObrigatorios } from '../../utils/validacoes';

export default function ClienteJuridicoForm() 
{
  const [formData, setFormData] = useState(
  {
    nomeFantasia: '',
    razaoSocial: '',
    cnpj: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    complemento: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = async (e) => 
  {
    const { name, value } = e.target;

    setFormData((prevData) => 
    ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'cep') 
    {
      const cepLimpo = value.replace(/\D/g, '');

      if (cepLimpo.length === 8) 
      {
        try 
        {
          const endereco = await buscarCep(cepLimpo);

          setFormData((prevData) => 
          ({
            ...prevData,
            logradouro: endereco.logradouro || '',
            bairro: endereco.bairro || '',
            cidade: endereco.localidade || '',
          }));
        } 
        catch (error) 
        {
          alert('CEP inválido ou não encontrado.');
        }
      }
    }
  };

  const handleSubmit = (e) => 
  {
    e.preventDefault();

    const errosEncontrados = validarCamposObrigatorios(formData);

    if (Object.keys(errosEncontrados).length > 0) 
    {
      setErrors(errosEncontrados);
      return;
    }

    setErrors({});
    const novaSenha = uuidv4();
    const dadosParaEnviar = { ...formData, senha: novaSenha };

    axios.post('http://localhost:8080/usuarios-juridicos', dadosParaEnviar, 
    {
      headers: 
      {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then((response) => 
    {
      alert('Cadastro realizado com sucesso!');
    })
    .catch((err) => 
    {
      alert(err.response?.data?.message || 'Erro ao cadastrar');
    });
  };

  return (
    <form className="bg-cinzaAzulado p-6 rounded-b-lg shadow-md mt-0" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Nome Fantasia:"
            name="nomeFantasia"
            placeholder="Ex: SuperTech Soluções"
            value={formData.nomeFantasia}
            onChange={handleChange}
            errorMessage={errors.nomeFantasia}
          />
          <Input
            label="Razão Social:"
            name="razaoSocial"
            placeholder="Ex: SuperTech Soluções em Tecnologia LTDA"
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
            placeholder="empresa@dominio.com.br"
            value={formData.email}
            onChange={handleChange}
            errorMessage={errors.email}
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

        <div className="space-y-4">
          <Input
            label="CEP:"
            name="cep"
            placeholder="00000-000"
            value={formData.cep}
            onChange={handleChange}
            mask={mascaraCEP}
            errorMessage={errors.cep}
          />
          <Input
            label="Logradouro:"
            name="logradouro"
            placeholder="Ex: Avenida Paulista"
            value={formData.logradouro}
            onChange={handleChange}
            errorMessage={errors.logradouro}
          />
          <Input
            label="Bairro:"
            name="bairro"
            placeholder="Ex: Bela Vista"
            value={formData.bairro}
            onChange={handleChange}
            errorMessage={errors.bairro}
          />
          <Input
            label="Cidade:"
            name="cidade"
            placeholder="Ex: São Paulo"
            value={formData.cidade}
            onChange={handleChange}
            errorMessage={errors.cidade}
          />
          <Input
            label="Complemento:"
            name="complemento"
            placeholder="Ex: Sala 702, Bloco B"
            value={formData.complemento}
            onChange={handleChange}
            errorMessage={errors.complemento}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center w-full">
        <Botao type="submit" largura="grande" tamanho="grande">
          Cadastrar
        </Botao>
      </div>
    </form>
  );
}
