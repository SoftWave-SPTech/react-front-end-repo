const clean = (value) =>
value.replace(/[^\w]/g, '').toUpperCase();

export const mascaraCNPJ = (value) =>
{
  const cleaned = clean(value);
  return cleaned
    .replace(/^(\w{2})(\w)/, '$1.$2')
    .replace(/^(\w{2})\.(\w{3})(\w)/, '$1.$2.$3')
    .replace(/^(\w{2})\.(\w{3})\.(\w{3})(\w)/, '$1.$2.$3/$4')
    .replace(/^(\w{2})\.(\w{3})\.(\w{3})\/(\w{4})(\w)/, '$1.$2.$3/$4-$5')
    .slice(0, 18);
};

export const mascaraCPF = (value) =>
{
  const cleaned = clean(value);
  return cleaned
    .replace(/^(\w{3})(\w)/, '$1.$2')
    .replace(/^(\w{3})\.(\w{3})(\w)/, '$1.$2.$3')
    .replace(/^(\w{3})\.(\w{3})\.(\w{3})(\w)/, '$1.$2.$3-$4')
    .slice(0, 14);
};

export const mascaraRG = (value) =>
{
  const cleaned = clean(value);
  return cleaned
    .replace(/^(\w{2})(\w)/, '$1.$2')
    .replace(/^(\w{2})\.(\w{3})(\w)/, '$1.$2.$3')
    .replace(/^(\w{2})\.(\w{3})\.(\w{3})(\w)/, '$1.$2.$3-$4')
    .slice(0, 14);
};

export const mascaraTelefone = (value) =>
{
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 10)
  {
    return cleaned
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 14);
  }

  return cleaned
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
};

export const mascaraCEP = (value) =>
{
  const cleaned = value.replace(/\D/g, '');
  return cleaned
    .replace(/^(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
};
