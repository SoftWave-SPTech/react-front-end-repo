export async function buscarCep(cep) 
{
    try {
      // Remove tudo que não for número
      const cepLimpo = cep.replace(/\D/g, '');
  
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  
      if (!response.ok) {
        throw new Error('Erro ao buscar o CEP');
      }
  
      const data = await response.json();
  
      if (data.erro) {
        throw new Error('CEP não encontrado');
      }
  
      return data;
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      throw error;
    }
  }