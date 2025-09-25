import { useState } from 'react';
import { api } from '../../service/api';
import { nanoid } from 'nanoid';

import Botao from '../Ui/Botao';
import { Input } from '../Ui/Input';

import { buscarCep } from '../../service/buscarCep';
import { validarAdvogadoFisico } from '../../Utils/validacoes';
import { mascaraCEP, mascaraTelefone, mascaraCPF, mascaraRG,mascaraOAB } from '../../Utils/mascaras';
import EnviarChaveAcesso from './EnvioEmail';
import AlertStyle from '../Ui/AlertStyle';

export default function AdvogadoFisicoForm() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    rg: '',
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

    const errosEncontrados = validarAdvogadoFisico(formData);

    if (Object.keys(errosEncontrados).length > 0) {
      setErrors(errosEncontrados);
      return;
    }

    setErrors({});
   const tokenPrimeiroAcesso = nanoid(8);
    const dadosParaEnviar = { ...formData, tokenPrimeiroAcesso: tokenPrimeiroAcesso };

    console.log("Dados enviados para o backend:", dadosParaEnviar);

    api
      .post('/advogados-fisicos', dadosParaEnviar, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then(async () => {
        try {
          await EnviarChaveAcesso(dadosParaEnviar.nome, dadosParaEnviar.tokenPrimeiroAcesso, dadosParaEnviar.email);
          setAlert({
            type: 'success',
            message: 'Cadastro realizado com sucesso!',
          });
        } catch (emailError) {
          console.error('Erro ao enviar email:', emailError);
          setAlert({
            type: 'success',
            message: 'Cadastro realizado com sucesso! (Email não pôde ser enviado)',
          });
        }
       
        setFormData({
          nome: '',
          cpf: '',
          rg: '',
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

        console.error("Erro ao cadastrar advogado fisico:", err.status);
        if (err.response?.data) {
          setAlert({ show: true, message: err.response.data.message, type: "error" })
        } else {
          setAlert({
            type: 'error',
            message: 'Erro ao cadastrar advogado. Por favor, tente novamente.'
          });
        }
        //alert(err.response?.data?.message || 'Erro ao cadastrar');

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
            label="Nome Completo:"
            name="nome"
            placeholder="Digite o nome completo"
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
            placeholder="ana@email.com"
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
            placeholder="Ex: Rio de Janeiro"
            value={formData.cidade}
            onChange={handleChange}
            errorMessage={errors.cidade}
          />
          <Input
            label="Complemento:"
            name="complemento"
            placeholder="Ex: Apto 101"
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