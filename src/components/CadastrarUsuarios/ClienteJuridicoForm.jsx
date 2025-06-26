import { useState, useEffect } from 'react';
import axios from 'axios';
import { buscarCep } from '../../service/buscarCep';
import { validarClienteJuridico } from '../../Utils/validacoes';
import EnviarChaveAcesso from './EnvioEmail.jsx';

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
    bairro: '',
    cidade: '',
    complemento: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
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

    console.log("Erros encontrados:", errosEncontrados);

      api.post('/usuarios-juridicos', dadosParaEnviar, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        EnviarChaveAcesso(dadosParaEnviar.nome, dadosParaEnviar.senha, dadosParaEnviar.email);

        alert('Cadastro realizado com sucesso!');
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
            if(campo === "message" && campo) {
                mensagem = erros[campo] ;
              } else if (campo === "status") {
                if (erros[campo] === 500){
                  mensagem = "Já existe um cliente cadastrado com esses dados. Por favor, verifique os dados e tente novamente.";
                }
              }
          });
          alert(mensagem)
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

        <label>Razão Social:</label>
        <input
          type="text"
          name="razaoSocial"
          placeholder="Digite a razão social"
          value={formData.razaoSocial}
          onChange={handleChange}
        />
        {errors.razaoSocial && <span className="error">{errors.razaoSocial}</span>}

        <label>CNPJ:</label>
        <input
          type="text"
          name="cnpj"
          placeholder="00.000.000/0000-00"
          value={formData.cnpj}
          onChange={handleChange}
        />
        {errors.cnpj && <span className="error">{errors.cnpj}</span>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="exemplo@email.com"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Telefone:</label>
        <input
          type="text"
          name="telefone"
          placeholder="(11) 98030-3049"
          value={formData.telefone}
          onChange={handleChange}
        />
        {errors.telefone && <span className="error">{errors.telefone}</span>}
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
      <Botao tipo="submit" tamanho="pequeno" largura="medio" cor="contornoAzul">
        CADASTRAR
      </Botao>
      <BarraTitulo
      largura="grande"       
      cor="claro"           
      tamanho="medio"     
      >
        EDITAR DADOS
      </BarraTitulo>
      </div>
      <BotaoAdicionar tamanho="grande" onClick={() => console.log('Clicou!')} />
    </form>
  );
}
