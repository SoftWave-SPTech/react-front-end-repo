import { useState, useEffect } from 'react';
import axios from 'axios';
import { buscarCep } from '../service/buscarCep';
import { v4 as uuidv4 } from 'uuid';
import Inputmask from 'inputmask';

export default function ClienteFisicoForm() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    rg: '',
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
    const cpfMask = new Inputmask('999.999.999-99', { placeholder: '___.___.___-__' });
    const rgMask = new Inputmask('99.999.999-9', { placeholder: '__.___.___-_' });

    telefoneMask.mask(document.querySelector('[name=telefone]'));
    cepMask.mask(document.querySelector('[name=cep]'));
    cpfMask.mask(document.querySelector('[name=cpf]'));
    rgMask.mask(document.querySelector('[name=rg]'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'cep' && value.replace(/\D/g, '').length === 8) {
      buscarEndereco(value.replace(/\D/g, ''));
    }
  };

  const buscarEndereco = async (cep) => {
    try {
      const data = await buscarCep(cep);
      setFormData((prevData) => ({
        ...prevData,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
      }));
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      alert('Erro ao buscar endereço. Verifique o CEP digitado.');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome) newErrors.nome = "Campo 'Nome' é obrigatório.";
    if (!formData.cpf) newErrors.cpf = "Campo 'CPF' é obrigatório.";
    if (!formData.rg) newErrors.rg = "Campo 'RG' é obrigatório.";
    if (!formData.email) newErrors.email = "Campo 'E-mail' é obrigatório.";
    if (!formData.telefone) newErrors.telefone = "Campo 'Telefone' é obrigatório.";
    if (!formData.cep) newErrors.cep = "Campo 'CEP' é obrigatório.";
    if (!formData.logradouro) newErrors.logradouro = "Campo 'Logradouro' é obrigatório.";
    if (!formData.bairro) newErrors.bairro = "Campo 'Bairro' é obrigatório.";
    if (!formData.cidade) newErrors.cidade = "Campo 'Cidade' é obrigatório.";

    if (formData.nome && !/\w+\s+\w+/.test(formData.nome)) {
      newErrors.nome = "Informe seu nome completo.";
    }
    if (formData.cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      newErrors.cpf = "CPF inválido.";
    }
    if (formData.rg && !/^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(formData.rg)) {
      newErrors.rg = "RG inválido.";
    }
    if (formData.telefone && !/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = "Telefone inválido.";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const novaSenha = uuidv4();
    const dadosParaEnviar = { ...formData, senha: novaSenha };

    console.log('Dados do formulário:', dadosParaEnviar);
    // TODO ESCREVER AUTORIZACAO PARA AS OUTRAS REQUESTS
    axios.post('http://localhost:8080/usuarios-fisicos', dadosParaEnviar, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        console.log('Resposta:', response.data);
        alert('Cadastro realizado com sucesso!');
      })
      .catch((err) => {
        console.log('Erro:', err.response?.data || err.message);
        alert(err.response.data.message);
      });
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <div className="coluna">
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          placeholder="Digite o nome completo"
          value={formData.nome}
          onChange={handleChange}
        />
        {errors.nome && <span className="error">{errors.nome}</span>}

        <label>CPF:</label>
        <input
          type="text"
          name="cpf"
          placeholder="000.000.000-00"
          value={formData.cpf}
          onChange={handleChange}
        />
        {errors.cpf && <span className="error">{errors.cpf}</span>}

        <label>RG:</label>
        <input
          type="text"
          name="rg"
          placeholder="00.000.000-0"
          value={formData.rg}
          onChange={handleChange}
        />
        {errors.rg && <span className="error">{errors.rg}</span>}

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
        <button type="submit" className="btn-cadastrar">CADASTRAR</button>
      </div>
    </form>
  );
}
