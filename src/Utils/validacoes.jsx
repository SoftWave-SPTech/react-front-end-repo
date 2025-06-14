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

export const validarCEP = (cep) => {
  const limpo = cep.replace(/\D/g, '');
  return limpo.length === 8;
};

export const validarClienteFisico = (dados) => {
  const erros = {};

  if (!dados.nome) erros.nome = "Campo obrigatório";
  if (!dados.cpf || !validarCPF(dados.cpf)) erros.cpf = "CPF inválido";
  if (!dados.rg || !validarRG(dados.rg)) erros.rg = "RG inválido";
  if (!dados.email || !validarEmail(dados.email)) erros.email = "Email inválido";
  if (!dados.telefone || !validarTelefone(dados.telefone)) erros.telefone = "Telefone inválido";
  if (!dados.cep || !validarCEP(dados.cep)) erros.cep = "CEP deve ter 8 dígitos.";
  if (!dados.logradouro) erros.logradouro = "Campo obrigatório";
  if (!dados.numero) erros.numero = "Campo obrigatório"; 
  if (!dados.bairro) erros.bairro = "Campo obrigatório";
  if (!dados.cidade) erros.cidade = "Campo obrigatório";

  return erros;
};

export const validarClienteJuridico = (dados) => {
  const erros = {};
  if (!dados.nomeFantasia) erros.nomeFantasia = "Campo obrigatório";
  if (!dados.nomeRepresentante) erros.nomeRepresentante = "Campo obrigatório"; 
  if (!dados.razaoSocial) erros.razaoSocial = "Campo obrigatório";
  if (!dados.cnpj || !validarCNPJ(dados.cnpj)) erros.cnpj = "CNPJ inválido";
  if (!dados.email || !validarEmail(dados.email)) erros.email = "Email inválido";
  if (!dados.telefone || !validarTelefone(dados.telefone)) erros.telefone = "Telefone inválido";
  if (!dados.cep || !validarCEP(dados.cep)) erros.cep = "CEP deve ter 8 dígitos.";
  if (!dados.logradouro) erros.logradouro = "Campo obrigatório";
  if (!dados.numero) erros.numero = "Campo obrigatório";  
  if (!dados.bairro) erros.bairro = "Campo obrigatório";
  if (!dados.cidade) erros.cidade = "Campo obrigatório";

  return erros;
};

export const validarAdvogadoFisico = (dados) => {
  const erros = {};
  
  // Validações obrigatórias
  if (!dados.nome) erros.nome = "Nome é obrigatório";
  if (!dados.cpf || !validarCPF(dados.cpf)) erros.cpf = "CPF inválido";
  if (!dados.rg) erros.rg = "RG é obrigatório";
  if (!dados.email || !validarEmail(dados.email)) erros.email = "Email inválido";
  if (!dados.oab) erros.oab = "OAB é obrigatória";
  if (!dados.telefone || !validarTelefone(dados.telefone)) erros.telefone = "Telefone inválido";
  
  // Validações de endereço
  if (!dados.cep || !validarCEP(dados.cep)) erros.cep = "CEP inválido";
  if (!dados.logradouro) erros.logradouro = "Logradouro é obrigatório";
  if (!dados.numero) erros.numero = "Número é obrigatório";
  if (!dados.bairro) erros.bairro = "Bairro é obrigatório";
  if (!dados.cidade) erros.cidade = "Cidade é obrigatória";

  // Validações específicas do backend
  if (dados.oab && (dados.oab.length < 6 || dados.oab.length > 6)) {
    erros.oab = "O número da OAB deve ter 6 dígitos";
  }

  return erros;
};

export const validarAdvogadoJuridico = (dados) => {
  const erros = {};
  
  // Validações obrigatórias
  if (!dados.nomeFantasia) erros.nomeFantasia = "Nome fantasia é obrigatório";
  if (!dados.nomeRepresentante) erros.nomeRepresentante = "Nome do representante é obrigatório";
  if (!dados.razaoSocial) erros.razaoSocial = "Razão social é obrigatória";
  if (!dados.cnpj || !validarCNPJ(dados.cnpj)) erros.cnpj = "CNPJ inválido";
  if (!dados.email || !validarEmail(dados.email)) erros.email = "Email inválido";
  if (!dados.oab) erros.oab = "OAB é obrigatória";
  if (!dados.telefone || !validarTelefone(dados.telefone)) erros.telefone = "Telefone inválido";
  
  // Validações de endereço
  if (!dados.cep || !validarCEP(dados.cep)) erros.cep = "CEP inválido";
  if (!dados.logradouro) erros.logradouro = "Logradouro é obrigatório";
  if (!dados.numero) erros.numero = "Número é obrigatório";
  if (!dados.bairro) erros.bairro = "Bairro é obrigatório";
  if (!dados.cidade) erros.cidade = "Cidade é obrigatória";

  // Validações específicas do backend
  if (dados.oab && (dados.oab.length < 6 || dados.oab.length > 6)) {
    erros.oab = "O número da OAB deve ter 6 dígitos";
  }

  return erros;
};

export const validarPerfilCliente = (dados) => {
  const erros = {};
  
  // Validações comuns
  if (!dados.nome) erros.nome = "Campo obrigatório";
  if (!dados.email || !validarEmail(dados.email)) erros.email = "Email inválido";
  if (!dados.telefone || !validarTelefone(dados.telefone)) erros.telefone = "Telefone inválido";
  if (!dados.cep || !validarCEP(dados.cep)) erros.cep = "CEP deve ter 8 dígitos.";
  if (!dados.logradouro) erros.logradouro = "Campo obrigatório";
  if (!dados.bairro) erros.bairro = "Campo obrigatório";
  if (!dados.cidade) erros.cidade = "Campo obrigatório";
   if (!dados.numero) erros.numero = "Campo obrigatório";

  // Validações específicas para advogado físico
  if (dados.tipoUsuario === "UsuarioFisico") {
    if (!dados.cpf || !validarCPF(dados.cpf)) erros.cpf = "CPF inválido";
    if (!dados.rg || !validarRG(dados.rg)) erros.rg = "RG inválido";
  }

  // Validações específicas para advogado jurídico
  if (dados.tipoUsuario === "UsuarioJuridico") {
    if (!dados.nomeFantasia) erros.nomeFantasia = "Campo obrigatório";
    if (!dados.razaoSocial) erros.razaoSocial = "Campo obrigatório";
    if (!dados.cnpj || !validarCNPJ(dados.cnpj)) erros.cnpj = "CNPJ inválido";
  }

  return erros;
};