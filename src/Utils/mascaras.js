export function maskCPF(value)
{
  return value
    .replace(/\W/g, '')
    .replace(/(\w{3})(\w)/, '$1.$2')
    .replace(/(\w{3})(\w)/, '$1.$2')
    .replace(/(\w{3})(\w{1,2})$/, '$1-$2')
}

export function maskRG(value)
{
  return value
    .replace(/\W/g, '')
    .replace(/(\w{2})(\w)/, '$1.$2')
    .replace(/(\w{3})(\w)/, '$1.$2')
    .replace(/(\w{3})(\w{1})$/, '$1-$2')
}

export function maskTelefone(value)
{
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})$/, '$1-$2')
}

export function maskCEP(value)
{
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d{1,3})$/, '$1-$2')
}

export function removeMask(value)
{
  return value.replace(/\W/g, '')
}
