import Button from "../Components/Button"
import Input from "../Components/Input"
import '../Estilos/FormEditarPerfil.css'
import Image from "../Components/Image"
import { useEffect, useState, useRef } from "react"
import MenuLateralAdvogado from "../Components/MenuLateralAdvogado/MenuLateralAdvogado"
import axios from "axios"

function FormEditPerfilAdvogado(){
    const TOKEN = `Bearer ${sessionStorage.getItem('token')}`
    const fileInputRef = useRef(null);
    const [usuario, setUsuario] = useState({})
    const [usarioParaAtualzar, setUsuarioParaAtualizar] = useState({})

    useEffect(() => {

        if(sessionStorage.getItem('tipoUsuario') == "UsuarioFisico"){

            axios.get(`http://localhost:8080/advogados-fisicos/${sessionStorage.getItem('id')}`, {
                headers: {
                    Authorization: TOKEN,
                },
              })
            .then((resposta) =>{
                console.log(resposta)
                const dados = {
                    "id": resposta.data.id,
                    "nome": resposta.data.nome,
                    "cpf": resposta.data.cpf,
                    "rg": resposta.data.rg,
                    "oab": resposta.data.oab,
                    "email": resposta.data.email,
                    "telefone": resposta.data.telefone,
                    "logradouro": resposta.data.logradouro,
                    "bairro": resposta.data.bairro,
                    "cidade": resposta.data.cidade,
                    "complemento": resposta.data.complemento,
                    "cep": resposta.data.cep
                }

                criarAtualizarFisicos(dados)
            })
            .catch((erro) =>{
                console.log(erro)
            })

        }else if(sessionStorage.getItem('tipoUsuario') == "UsuarioJuridico"){
            
            axios.get(`http://localhost:8080/advogados-juridicos/${sessionStorage.getItem('id')}`, {
                headers: {
                    Authorization: TOKEN,
                },
              })
            .then((resposta) =>{
                console.log(resposta)

                const dados = {
                    "id": resposta.data.id,
                    "nomeFantasia": resposta.data.nomeFantasia,
                    "razaoSocial": resposta.data.razaoSocial,
                    "cnpj": resposta.data.cnpj,
                    "oab": resposta.data.oab,
                    "email": resposta.data.email,
                    "telefone": resposta.data.telefone,
                    "logradouro": resposta.data.logradouro,
                    "bairro": resposta.data.bairro,
                    "cidade": resposta.data.cidade,
                    "complemento": resposta.data.complemento,
                    "cep": resposta.data.cep
                }

                criarAtualizarJuridicos(dados)

            })
            .catch((erro) =>{
                console.log(erro)
            })
        }
    }, []); 

    function enviarDadosParaAtualizacao(){
        console.log(usarioParaAtualzar)

        if (sessionStorage.getItem('tipoUsuario') == "UsuarioFisico") {

            axios.put(`http://localhost:8080/advogados-fisicos/${usuario.id}`, usarioParaAtualzar,  {
                headers: {
                    Authorization: TOKEN,
                },
              })
            .then((resposta) =>{
                console.log(resposta)
                
                alert("Dados Atualizados com sucesso!");
            })
            .catch((erro) =>{
                console.log(erro)
                alert("Ocorreu um erro, tente novamente!");
            })
            
        }else if (sessionStorage.getItem('tipoUsuario') == "UsuarioJuridico") {

            axios.put(`http://localhost:8080/advogados-juridicos/${usuario.id}`, usarioParaAtualzar,  {
                headers: {
                    Authorization: TOKEN,
                },
              })
            .then((resposta) =>{
                console.log(resposta)

                alert("Dados Atualizados com sucesso!");
            })
            .catch((erro) =>{
                console.log(erro)
                alert("Ocorreu um erro, tente novamente!");
            })
        }
    }

    function criarAtualizarFisicos(dados){
        setUsuario(dados);
          setUsuarioParaAtualizar({
              "nome": dados.nome,
              "email": dados.email,
              "telefone": dados.telefone,
              "logradouro": dados.logradouro,
              "bairro": dados.bairro,
              "cidade": dados.cidade,
              "complemento": dados.complemento,
              "cep": dados.cep
          })
    }

    function criarAtualizarJuridicos(dados){
        setUsuario(dados);

          setUsuarioParaAtualizar({
              "nomeFantasia": dados.nomeFantasia,
              "razaoSocial": dados.razaoSocial,
              "cnpj": dados.cnpj,
              "email": dados.email,
              "telefone": dados.telefone,
              "logradouro": dados.logradouro,
              "bairro": dados.bairro,
              "cidade": dados.cidade,
              "complemento": dados.complemento,
              "cep": dados.cep
          })
    }

    function cliqueBotaoFoto(){
        fileInputRef.current.click();  
    }

    function atualizarFoto(file){
        console.log(file)
        if(!file){
            alert("Escolha uma foto primeiro!");
        }else{

            // FormData é um objeto nativo do JavaScript (existe mesmo sem React).
            // Ele foi criado para simular um formulário HTML em JavaScript, para que a gente possa enviar arquivos e outros dados para o servidor via código.
            // Ele embala o arquivo certinho no formato multipart/form-data, que é um formato especial para enviar:

            // Arquivos (.png, .jpg, .pdf, etc).

            const arquivoFormatado = new FormData();
            arquivoFormatado.append("file", file);
        }
    }
    
    return(
        <>
        <MenuLateralAdvogado/>
        <div className="container-body-edit">
            <div className="container-edit-perfil">
                {/* <div className="formulario-editar-perfil foto" >
                    <div className="container-titulo-editar-perfil">
                        <h1 className="titulo-editar-perfil">Foto Perfil</h1>
                    </div>

                    <div className="divisao">
                        <Image></Image>

                        <Button valorBotao={`Subir foto`} onClick={cliqueBotaoFoto}/>
                        <input type="file" ref={fileInputRef} className="selecionar-foto" onChange={(e) => atualizarFoto(e.target.files[0])}/>

                        <Button valorBotao={'Eliminar'} className={'oposto'} />
                    </div>
                    

                </div> */}

                <div className="formulario-editar-perfil" >
                    <div className="container-titulo-editar-perfil" >
                        <h1 className="titulo-editar-perfil">Informações Pessoais</h1>
                    </div>

                    <div className="divisao">
                    <div className="divisoria">
                        {sessionStorage.getItem('tipoUsuario') == 'UsuarioFisico' ? (
                            <>
                                <Input 
                                nome={"Nome:"} 
                                type={"text"}
                                valor={usuario.nome} 
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "nome": e.target.value }) && setUsuario({ ...usuario, "nome": e.target.value })}
                                disabled={false} />
                                <Input 
                                nome={"CPF:"} 
                                type={"text"}
                                valor={usuario.cpf}
                                disabled={true} />
                                <Input 
                                nome={"RG:"} 
                                type={"text"}
                                valor={usuario.rg}
                                disabled={true} />
                            </>
                            ) : (
                            <>
                                <Input 
                                nome={"Nome Fantasia:"} 
                                type={"text"}
                                valor={usuario.nomeFantasia}
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "nomeFantasia": e.target.value }) && setUsuario({ ...usuario, "nomeFantasia": e.target.value })}
                                disabled={false} />
                                <Input 
                                nome={"Razão Social:"} 
                                type={"text"}
                                valor={usuario.razaoSocial}
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "razaoSocial": e.target.value }) && setUsuario({ ...usuario, "razaoSocial": e.target.value })}
                                disabled={false} />
                                <Input 
                                nome={"CNPJ:"} 
                                type={"text"}
                                valor={usuario.cnpj}
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "cnpj": e.target.value }) && setUsuario({ ...usuario, "cnpj": e.target.value })}
                                disabled={false} />
                            </>
                        )}
                        <Input 
                        nome={"Email:"}
                        type={"text"}
                        valor={usuario.email}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "email": e.target.value }) && setUsuario({ ...usuario, "email": e.target.value })}
                        disabled={false} />

                        <Input 
                        nome={"Telefone:"}
                        type={"text"}
                        valor={usuario.telefone}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "telefone": e.target.value }) && setUsuario({ ...usuario, "telefone": e.target.value })}
                        disabled={false} />

                        <Input 
                        nome={"OAB:"}
                        type={"text"}
                        valor={usuario.oab}
                        disabled={true} />

                        <Input 
                        nome={"Senha:"}
                        type={"password"}
                        valor={usuario.senha}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "senha": e.target.value }) && setUsuario({ ...usuario, "senha": e.target.value })}
                        disabled={false} />
                    </div>

                    <div className="divisoria">
                        <Input 
                        nome={"CEP:"}
                        type={"text"}
                        valor={usuario.cep}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "cep": e.target.value }) && setUsuario({ ...usuario, "cep": e.target.value })}
                        disabled={false} />
                        
                        <Input 
                        nome={"Logradouro:"}
                        type={"text"}
                        valor={usuario.logradouro}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "logradouro": e.target.value }) && setUsuario({ ...usuario, "logradouro": e.target.value })}
                        disabled={false} />

                        <Input 
                        nome={"Bairro:"}
                        type={"text"}
                        valor={usuario.bairro}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "bairro": e.target.value }) && setUsuario({ ...usuario, "bairro": e.target.value })}
                        disabled={false} />

                        <Input 
                        nome={"Cidade:"}
                        type={"text"}
                        valor={usuario.cidade}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "cidade": e.target.value }) && setUsuario({ ...usuario, "cidade": e.target.value })}
                        disabled={false} />

                        <Input 
                        nome={"Complemento:"}
                        type={"text"}
                        valor={usuario.complemento}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, "complemento": e.target.value }) && setUsuario({ ...usuario, "complemento": e.target.value })}
                        disabled={false} />

                        <div className="divisao">
                        <Button valorBotao={'Cancelar'} className={'oposto'}  />
                        <Button valorBotao={'Salvar'} onClick={enviarDadosParaAtualizacao}  />
                        </div>  
                    </div>
                    </div>
                      
                    

                </div>
            </div>
        </div>
        </>
    )
}
export default FormEditPerfilAdvogado