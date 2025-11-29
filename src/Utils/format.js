// função utilitária para formatar valores em reais
export const formatCurrencyBRL = (valor) =>
  (valor ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
