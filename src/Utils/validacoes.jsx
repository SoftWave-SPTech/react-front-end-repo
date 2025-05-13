export const validarEmail = (email) =>
/\S+@\S+\.\S+/.test(email);

export const validarCNPJ = (cnpj) =>
{
  const limpo = cnpj.replace(/[^a-zA-Z0-9]/g, '');
  return limpo.length === 14;
};

export const validarTelefone = (telefone) =>
{
  const numeros = telefone.replace(/\D/g, '');
  return numeros.length === 10 || numeros.length === 11;
};

export const validarCamposObrigatorios = (dados) =>
{
  const erros = {};
  if (!dados.nomeFantasia) erros.nomeFantasia = "Campo obrigatório";
  if (!dados.razaoSocial) erros.razaoSocial = "Campo obrigatório";
  if (!dados.cnpj || !validarCNPJ(dados.cnpj)) erros.cnpj = "CNPJ inválido";
  if (!dados.email || !validarEmail(dados.email)) erros.email = "Email inválido";
  if (!dados.telefone || !validarTelefone(dados.telefone)) erros.telefone = "Telefone inválido";
  if (!dados.cep) erros.cep = "Campo obrigatório";
  if (!dados.logradouro) erros.logradouro = "Campo obrigatório";
  if (!dados.bairro) erros.bairro = "Campo obrigatório";
  if (!dados.cidade) erros.cidade = "Campo obrigatório";

  return erros;
};
