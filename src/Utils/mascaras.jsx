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

export const mascaraRG = (value) => {
  const cleaned = clean(value).slice(0, 10); 
  return cleaned
    .replace(/^(\w{2})(\w)/, '$1.$2')
    .replace(/^(\w{2})\.(\w{3})(\w)/, '$1.$2.$3')
    .replace(/^(\w{2})\.(\w{3})\.(\w{3})(\w)/, '$1.$2.$3-$4');
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

export function formatarData(dataISO) {
    if (!dataISO) return "";
    const data = new Date(dataISO);
    const dia = data.getDate().toString().padStart(2, "0");
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");
    return `${dia} ${mes} ${ano}, ${horas}:${minutos}`;
  }

export const mascaraOAB = (value) => 
{
  const somenteNumeros = value.replace(/\D/g, ''); 
  return somenteNumeros.slice(0, 6); 
};
