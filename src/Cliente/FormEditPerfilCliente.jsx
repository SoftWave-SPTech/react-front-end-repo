import Button from "../Components/Button"
import Input from "../Components/Input"
import '../Estilos/FormEditarPerfil.css'
import Image from "../Components/Image"
import { useEffect, useState } from "react"
import MenuLateral from "../Components/MenuLateralCliente/MenuLateralCliente"

function FormEditPerfilCliente(){


    const [usuario, setUsuario] = useState({})
    const [usarioParaAtualzar, setUsuarioParaAtualizar] = useState({}) 

    useEffect(() => {

        if(sessionStorage.getItem('tipoUsuario') == "UsuarioFisico"){

            axios.get(`http://localhost:8080/usuariosFisicos/${usuario.id}`, {
                headers: {
                    Authorization: sessionStorage.getItem('authToken'),
                },
            })
            .then((resposta) =>{
                console.log(resposta)
                setUsuario({
                    id: resposta.data.id,
                    nome: resposta.data.nome,
                    cpf: resposta.data.cpf,
                    rg: resposta.data.rg,
                    email: resposta.data.email,
                    telefone: resposta.data.telefone,
                    logradouro: resposta.data.logradouro,
                    bairro: resposta.data.bairro,
                    cidade: resposta.data.cidade,
                    complemento: resposta.data.complemento,
                    cep: resposta.cep,
                    senha: '.......'
                  });
                  setUsuarioParaAtualizar({
                      nome: usuario.nome,
                      email: usuario.email,
                      telefone: usuario.telefone,
                      logradouro: usuario.logradouro,
                      bairro: usuario.bairro,
                      cidade: usuario.cidade,
                      complemento: usuario.complemento,
                      cep: usuario.cep,
                      senha: '.......'
                  })
            })
            .catch((erro) =>{
                console.log(erro)
            })

        }else if(sessionStorage.getItem('tipoUsuario') == "UsuarioJuridico"){

            axios.get(`http://localhost:8080/usuariosFisicos/${usuario.id}`, {
                headers: {
                    Authorization: sessionStorage.getItem('authToken'),
                },
              })
            .then((resposta) =>{
                console.log(resposta)

                setUsuario({
                    id: resposta.data.id,
                    nomeFantasia: resposta.data.nomeFantasia,
                    razaoSocial: resposta.data.data.razaoSocial,
                    cnpj: resposta.data.cnpj,
                    email: resposta.data.email,
                    telefone: resposta.data.telefone,
                    logradouro: resposta.data.logradouro,
                    bairro: resposta.data.bairro,
                    cidade: resposta.data.cidade,
                    complemento: resposta.data.complemento,
                    cep: resposta.data.cep,
                    senha: '.......'
                  });
  
                  setUsuarioParaAtualizar({
                      nomeFantasia: usuario.nomeFantasia,
                      razaoSocial: usuario.razaoSocial,
                      cnpj: usuario.cnpj,
                      email: usuario.email,
                      telefone: usuario.telefone,
                      logradouro: usuario.logradouro,
                      bairro: usuario.bairro,
                      cidade: usuario.cidade,
                      complemento: usuario.complemento,
                      cep: usuario.cep,
                      senha: '.......'
                  })

            })
            .catch((erro) =>{
                console.log(erro)
            })
        }
    }, []); 
    
        function enviarDadosParaAtualizacao(){
            console.log(usarioParaAtualzar)
    
            if (sessionStorage.getItem('tipoUsuario') == "UsuarioFisico") {
    
                axios.put(`http://localhost:8080/usuariosFisicos/${usuario.id}`, usarioParaAtualzar, {
                    headers: {
                        Authorization: sessionStorage.getItem('authToken'),
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
    
                axios.put(`http://localhost:8080/usuariosJuridicos/${usuario.id}`, usarioParaAtualzar, {
                    headers: {
                      Authorization: sessionStorage.getItem('authToken'),
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
    
    return(
        <>
        <MenuLateral/>
        <div className="container-body-edit">
            <div className="container-edit-perfil">
                <div className="formulario-editar-perfil foto" >
                    <div className="container-titulo-editar-perfil">
                        <h1 className="titulo-editar-perfil">Foto Perfil</h1>
                    </div>

                    <div className="divisao">
                        <Image></Image>
                        
                        <Button valorBotao={'Subir foto'} />
                        <Button valorBotao={'Eliminar'} className={'oposto'} />
                    </div>
                    

                </div>

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
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, nome: e.target.value })}
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
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, nomeFantasia: e.target.value })}
                                disabled={false} />
                                <Input 
                                nome={"Razão Social:"} 
                                type={"text"}
                                valor={usuario.razaoSocial}
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, razaoSocial: e.target.value })}
                                disabled={false} />
                                <Input 
                                nome={"CNPJ:"} 
                                type={"text"}
                                valor={usuario.cnpj}
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, cnpj: e.target.value })}
                                disabled={false} />
                            </>
                        )}
                        <Input 
                        nome={"Email:"}
                        type={"text"}
                        valor={usuario.email}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, email: e.target.value })}
                        disabled={false} />

                        <Input 
                        nome={"Telefone:"}
                        type={"text"}
                        valor={usuario.telefone}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, telefone: e.target.value })}
                        disabled={false} />

                        <Input 
                        nome={"Senha:"}
                        type={"text"}
                        valor={usuario.senha}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, senha: e.target.value })}
                        disabled={false} />
                    </div>

                    <div className="divisoria">
                        <Input 
                        nome={"CEP:"}
                        type={"text"}
                        valor={usuario.cep}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, cep: e.target.value })}
                        disabled={false} />
                        
                        <Input 
                        nome={"Logradouro:"}
                        type={"text"}
                        valor={usuario.logradouro}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, logradouro: e.target.value })}
                        disabled={false} />

                        <Input 
                        nome={"Bairro:"}
                        type={"text"}
                        valor={usuario.bairro}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, bairro: e.target.value })}
                        disabled={false} />

                        <Input 
                        nome={"Cidade:"}
                        type={"text"}
                        valor={usuario.cidade}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, cidade: e.target.value })}
                        disabled={false} />

                        <Input 
                        nome={"Complemento:"}
                        type={"text"}
                        valor={usuario.complemento}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, complemento: e.target.value })}
                        disabled={false} />

                        <div className="divisao">
                        <Button valorBotao={'Cancelar'} className={'oposto'} />
                        <Button valorBotao={'Salvar'} onClick={enviarDadosParaAtualizacao} />
                        </div>  
                    </div>
                    </div>
                      
                    

                </div>
            </div>
        </div>
        </>
    )
}
export default FormEditPerfilCliente