import { useState } from 'react';
import { api } from '../../service/api.js';
import { nanoid } from 'nanoid';

import { Input } from '../Ui/Input';
import Botao from '../../components/Ui/Botao';

import { mascaraCEP, mascaraTelefone, mascaraCPF, mascaraRG } from '../../Utils/mascaras';
import { buscarCep } from '../../service/buscarCep';
import { validarClienteFisico } from '../../Utils/validacoes';
import EnviarChaveAcesso from './EnvioEmail.jsx';

export default function ClienteFisicoForm() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    rg: '',
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
          alert('CEP inválido ou não encontrado.');
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errosEncontrados = validarClienteFisico(formData);

    if (Object.keys(errosEncontrados).length > 0) {
      setErrors(errosEncontrados);
      return;
    }

    setErrors({});
    const novaSenha = nanoid(8);
    const dadosParaEnviar = { ...formData, senha: novaSenha };

    api.post('/usuarios-fisicos', dadosParaEnviar, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then(() => {

        EnviarChaveAcesso(dadosParaEnviar.nome, dadosParaEnviar.senha, dadosParaEnviar.email);

        alert('Cadastro realizado com sucesso!');
        setFormData({
          nome: '',
          cpf: '',
          rg: '',
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
          Object.keys(erros).forEach(campo => {
            alert(`${campo}: ${erros[campo]}`);
          });
        } else {
          alert('Erro ao cadastrar cliente. Por favor, tente novamente.');
        }
      });
  };

  return (
    <form className="bg-white p-6 rounded-b-lg shadow-md mt-0" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Nome Completo:"
            name="nome"
            placeholder="Ex: João da Silva"
            value={formData.nome}
            onChange={handleChange}
            errorMessage={errors.nome}
          />
          <Input
            label="CPF:"
            name="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={handleChange}
            mask={mascaraCPF}
            errorMessage={errors.cpf}
          />
          <Input
            label="RG:"
            name="rg"
            placeholder="00.000.000-0"
            value={formData.rg}
            onChange={handleChange}
            mask={mascaraRG}
            errorMessage={errors.rg}
          />
          <Input
            label="Email:"
            name="email"
            type="email"
            placeholder="joao@email.com"
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
            placeholder="Ex: Centro"
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
            placeholder="Ex: Apto 21"
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
