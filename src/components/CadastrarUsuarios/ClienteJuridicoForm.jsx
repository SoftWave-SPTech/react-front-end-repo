import { useState, useEffect } from 'react';
import axios from 'axios';
import { buscarCep } from '../../service/buscarCep';
import { v4 as uuidv4 } from 'uuid';
import Inputmask from 'inputmask';
import Botao from '../../components/Ui/Botao';
import BarraTitulo from '../Ui/BarraTitulo';
import BotaoAdicionar from '../Ui/BotaoAdicionarCircular';

export default function ClienteJuridicoForm() {
  const [formData, setFormData] = useState({
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

    if (!formData.nomeFantasia) newErrors.nomeFantasia = "Campo 'Nome Fantasia' é obrigatório.";
    if (!formData.razaoSocial) newErrors.razaoSocial = "Campo 'Razão Social' é obrigatório.";
    if (!formData.cnpj) newErrors.cnpj = "Campo 'CNPJ' é obrigatório.";
    if (!formData.email) newErrors.email = "Campo 'E-mail' é obrigatório.";
    if (!formData.telefone) newErrors.telefone = "Campo 'Telefone' é obrigatório.";
    if (!formData.cep) newErrors.cep = "Campo 'CEP' é obrigatório.";
    if (!formData.logradouro) newErrors.logradouro = "Campo 'Logradouro' é obrigatório.";
    if (!formData.bairro) newErrors.bairro = "Campo 'Bairro' é obrigatório.";
    if (!formData.cidade) newErrors.cidade = "Campo 'Cidade' é obrigatório.";

    if (formData.cnpj && !/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(formData.cnpj)) {
      newErrors.cnpj = "CNPJ inválido.";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido.";
    }
    if (formData.telefone && !/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = "Telefone inválido.";
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
    axios.post('http://localhost:8080/usuarios-juridicos', dadosParaEnviar, {
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
        <label>Nome Fantasia:</label>
        <input
          type="text"
          name="nomeFantasia"
          placeholder="Digite o nome fantasia"
          value={formData.nomeFantasia}
          onChange={handleChange}
        />
        {errors.nomeFantasia && <span className="error">{errors.nomeFantasia}</span>}

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
