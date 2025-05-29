export const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validarCNPJ = (cnpj) => {
  const limpo = cnpj.replace(/[^a-zA-Z0-9]/g, '');
  return limpo.length === 14;
};

export const validarCPF = (cpf) => {
  const limpo = cpf.replace(/[^a-zA-Z0-9]/g, '');
  return limpo.length === 11;
};

export const validarRG = (rg) => {
  const limpo = rg.replace(/[^a-zA-Z0-9]/g, '');
  return limpo.length >= 7 && limpo.length <= 12;
};

export const validarTelefone = (telefone) => {
  const numeros = telefone.replace(/\D/g, '');
  return numeros.length === 10 || numeros.length === 11;
};


export const validarClienteFisico = (dados) => {
  const erros = {};
  if (!dados.nome) erros.nome = "Campo obrigatório";
  if (!dados.cpf || !validarCPF(dados.cpf)) erros.cpf = "CPF inválido";
  if (!dados.rg || !validarRG(dados.rg)) erros.rg = "RG inválido";
  if (!dados.email || !validarEmail(dados.email)) erros.email = "Email inválido";
  if (!dados.telefone || !validarTelefone(dados.telefone)) erros.telefone = "Telefone inválido";
  if (!dados.cep) erros.cep = "Campo obrigatório";
  if (!dados.logradouro) erros.logradouro = "Campo obrigatório";
  if (!dados.bairro) erros.bairro = "Campo obrigatório";
  if (!dados.cidade) erros.cidade = "Campo obrigatório";
  return erros;
};

export const validarClienteJuridico = (dados) => {
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

export const validarAdvogadoFisico = (dados) => {
  const erros = {};
  if (!dados.nome) erros.nome = "Campo obrigatório";
  if (!dados.cpf || !validarCPF(dados.cpf)) erros.cpf = "CPF inválido";
  if (!dados.rg || !validarRG(dados.rg)) erros.rg = "RG inválido";
  if (!dados.email || !validarEmail(dados.email)) erros.email = "Email inválido";
  if (!dados.oab) erros.oab = "Campo obrigatório";
  if (!dados.telefone || !validarTelefone(dados.telefone)) erros.telefone = "Telefone inválido";
  if (!dados.cep) erros.cep = "Campo obrigatório";
  if (!dados.logradouro) erros.logradouro = "Campo obrigatório";
  if (!dados.bairro) erros.bairro = "Campo obrigatório";
  if (!dados.cidade) erros.cidade = "Campo obrigatório";
  return erros;
};

export const validarAdvogadoJuridico = (dados) => {
  const erros = {};
  if (!dados.nomeFantasia) erros.nomeFantasia = "Campo obrigatório";
  if (!dados.razaoSocial) erros.razaoSocial = "Campo obrigatório";
  if (!dados.cnpj || !validarCNPJ(dados.cnpj)) erros.cnpj = "CNPJ inválido";
  if (!dados.email || !validarEmail(dados.email)) erros.email = "Email inválido";
  if (!dados.oab) erros.oab = "Campo obrigatório";
  if (!dados.telefone || !validarTelefone(dados.telefone)) erros.telefone = "Telefone inválido";
  if (!dados.cep) erros.cep = "Campo obrigatório";
  if (!dados.logradouro) erros.logradouro = "Campo obrigatório";
  if (!dados.bairro) erros.bairro = "Campo obrigatório";
  if (!dados.cidade) erros.cidade = "Campo obrigatório";
  return erros;
};
