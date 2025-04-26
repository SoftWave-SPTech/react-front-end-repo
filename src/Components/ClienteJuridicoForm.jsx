export default function ClienteJuridicoForm() 
{
  return (
    <form className="formulario">

      <div className="coluna">
        <label>Nome Fantasia:</label>
        <input type="text" placeholder="Digite o nome fantasia" />

        <label>Razão Social:</label>
        <input type="text" placeholder="Digite a razão social" />

        <label>CNPJ:</label>
        <input type="text" placeholder="00.000.000/0000-00" />

        <label>Email:</label>
        <input type="email" placeholder="exemplo@email.com" />

        <label>Telefone:</label>
        <input type="text" placeholder="+55 (11) 9 0000-0000" />

      </div>

      <div className="coluna">

        <label>CEP:</label>
        <input type="text" placeholder="00000-000" />

        <label>Logradouro:</label>
        <input type="text" placeholder="Rua Exemplo" />

        <label>Bairro:</label>
        <input type="text" placeholder="Centro" />

        <label>Cidade:</label>
        <input type="text" placeholder="Cidade" />

        <label>Complemento:</label>
        <input type="text" placeholder="Apartamento, bloco, etc." />

      </div>

      <div className="linha-centralizada">
        <button type="submit" className="btn-cadastrar">CADASTRAR</button>
      </div>
      
    </form>
  );
}
