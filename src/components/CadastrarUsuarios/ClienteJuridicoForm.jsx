import React, { useState } from 'react';
import { api } from '../../service/api.js';
import { nanoid } from 'nanoid';

import Botao from '../../components/Ui/Botao';
import { Input } from '../Ui/Input';

import { mascaraCNPJ, mascaraTelefone, mascaraCEP } from '../../Utils/mascaras';
import { buscarCep } from '../../service/buscarCep';
import { validarClienteJuridico } from '../../Utils/validacoes';
import EnviarChaveAcesso from './EnvioEmail.jsx';
import Alert from '../Ui/AlertStyle'; // Importa o AlertStyle

export default function ClienteJuridicoForm() {
  const [formData, setFormData] = useState({
    nomeFantasia: '',
    razaoSocial: '',
    representante: '',
    cnpj: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    complemento: '',
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null); // Estado para o Alert

  const handleChange = async (e) => {
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
          setAlert({
            type: 'error',
            message: 'CEP inválido ou não encontrado.',
          });
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT DISPARADO");

    const errosEncontrados = validarClienteJuridico(formData);

    if (Object.keys(errosEncontrados).length > 0) {
      setErrors(errosEncontrados);
      return;
    }

    setErrors({});

    const novaSenha = nanoid(8);
    const dadosParaEnviar = { ...formData, senha: novaSenha };

    console.log("Erros encontrados:", errosEncontrados);

    api.post('/usuarios-juridicos', dadosParaEnviar, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        EnviarChaveAcesso(dadosParaEnviar.nome, dadosParaEnviar.senha, dadosParaEnviar.email);

        setAlert({
          type: 'success',
          message: 'Cadastro realizado com sucesso!',
        });
        setFormData({
          nomeFantasia: '',
          razaoSocial: '',
          representante: '',
          cnpj: '',
          email: '',
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
            if (campo === "message" && campo) {
              mensagem = erros[campo];
            } else if (campo === "status") {
              if (erros[campo] === 500) {
                mensagem = "Já existe um cliente cadastrado com esses dados. Por favor, verifique os dados e tente novamente.";
              }
            }
          });
          setAlert({
            type: 'error',
            message: mensagem || 'Erro ao cadastrar cliente. Por favor, tente novamente.',
          });
        } else {
          setAlert({
            type: 'error',
            message: 'Erro ao cadastrar cliente. Por favor, tente novamente.',
          });
        }
      });

  };

  return (
    <form className="bg-white p-6 rounded-b-lg shadow-md mt-0" onSubmit={handleSubmit}>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
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

          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4 w-full">
              <Input
                label="Logradouro:"
                name="logradouro"
                placeholder="Ex: Rua das Flores"
                value={formData.logradouro}
                onChange={handleChange}
                errorMessage={errors.logradouro}
              />
            </div>
            <div className="md:w-1/4 w-full">
              <Input
                label="Número:"
                name="numero"
                placeholder="Ex: 123"
                value={formData.numero}
                onChange={handleChange}
                errorMessage={errors.numero}
              />
            </div>
          </div>

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