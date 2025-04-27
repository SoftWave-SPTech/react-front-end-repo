import Button from "../Components/Button"
import Input from "../Components/Input"
import '../Estilos/FormEditarPerfil.css'
import Image from "../Components/Image"
import { useEffect, useState } from "react"
import MenuLateralAdvogado from "../Components/MenuLateralAdvogado/MenuLateralAdvogado"
import axios from "axios"

function FormEditPerfilAdvogado(){

    const [tipoUsuario, setTipoUsuario] = useState("juridica")
    const [usuario, setUsuario] = useState([])
    const [usarioParaAtualzar, setUsuarioParaAtualizar] = useState({}) 

    useEffect(() => {
        axios.get(`url aqui`, sessionStorage.getItem('authToken'))
        .then((resposta) =>{
            console.log(resposta)

            if(!resposta.cnpj){
                setTipoUsuario('juridica')
            }else{
                setTipoUsuario("fisica")
            }

            if (tipoUsuario == "fisica") {
                setUsuario({
                  id: resposta.id,
                  nome: resposta.nome,
                  cpf: resposta.cpf,
                  rg: resposta.rg,
                  email: resposta.email,
                  telefone: resposta.telefone,
                  oab: resposta.oab,
                  logradouro: resposta.logradouro,
                  bairro: resposta.bairro,
                  cidade: resposta.cidade,
                  complemento: resposta.complemento,
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

            } else if (tipoUsuario == "juridica") {
                setUsuario({
                  id: resposta.id,
                  nomeFantasia: resposta.nomeFantasia,
                  razaoSocial: resposta.razaoSocial,
                  cnpj: resposta.cnpj,
                  email: resposta.email,
                  telefone: resposta.telefone,
                  oab: resposta.oab,
                  logradouro: resposta.logradouro,
                  bairro: resposta.bairro,
                  cidade: resposta.cidade,
                  complemento: resposta.complemento,
                  cep: resposta.cep,
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
            }
        })
        .catch((erro) =>{
            console.log(erro)
        })
    }, []); 

    function enviarDadosParaAtualizacao(){
        console.log(usarioParaAtualzar)

        if (tipoUsuario == "fisica") {

            axios.put(`http://localhost:8080/advogados-fisicos/${usuario.id}`, usarioParaAtualzar)
            .then((resposta) =>{
                console.log(resposta)
                
                alert("Dados Atualizados com sucesso!");
            })
            .catch((erro) =>{
                console.log(erro)
                alert("Ocorreu um erro, tente novamente!");
            })
            
        }else if (tipoUsuario == "juridica") {

            axios.put(`http://localhost:8080/advogados-juridicos/${usuario.id}`, usarioParaAtualzar)
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
        <MenuLateralAdvogado/>
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
                        {tipoUsuario === 'fisica' ? (
                            <>
                                <Input 
                                nome={"Nome:"} 
                                valor={usuario.nome} 
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, nome: e.target.value })}
                                disabled={'true'} />
                                <Input 
                                nome={"CPF:"} 
                                valor={usuario.cpf}
                                disabled={'false'} />
                                <Input 
                                nome={"RG:"} 
                                valor={usuario.rg}
                                disabled={'false'} />
                            </>
                            ) : (
                            <>
                                <Input 
                                nome={"Nome Fantasia:"} 
                                valor={usuario.nomeFantasia}
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, nomeFantasia: e.target.value })}
                                disabled={'true'} />
                                <Input 
                                nome={"Razão Social:"} 
                                valor={usuario.razaoSocial}
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, razaoSocial: e.target.value })}
                                disabled={'true'} />
                                <Input 
                                nome={"CNPJ:"} 
                                valor={usuario.cnpj}
                                onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, cnpj: e.target.value })}
                                disabled={'true'} />
                            </>
                        )}
                        <Input 
                        nome={"Email:"}
                        valor={usuario.email}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, email: e.target.value })}
                        disabled={'true'} />

                        <Input 
                        nome={"Telefone:"}
                        valor={usuario.telefone}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, telefone: e.target.value })}
                        disabled={'true'} />

                        <Input 
                        nome={"OAB:"}
                        valor={usuario.oab}
                        disabled={'false'} />

                        <Input 
                        nome={"Senha:"}
                        valor={usuario.senha}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, senha: e.target.value })}
                        disabled={'true'} />
                    </div>

                    <div className="divisoria">
                        <Input 
                        nome={"CEP:"}
                        valor={usuario.cep}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, cep: e.target.value })}
                        disabled={'true'} />
                        
                        <Input 
                        nome={"Logradouro:"}
                        valor={usuario.logradouro}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, logradouro: e.target.value })}
                        disabled={'true'} />

                        <Input 
                        nome={"Bairro:"}
                        valor={usuario.bairro}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, bairro: e.target.value })}
                        disabled={'true'} />

                        <Input 
                        nome={"Cidade:"}
                        valor={usuario.cidade}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, cidade: e.target.value })}
                        disabled={'true'} />

                        <Input 
                        nome={"Complemento:"}
                        valor={usuario.complemento}
                        onChange={(e) => setUsuarioParaAtualizar({ ...usarioParaAtualzar, complemento: e.target.value })}
                        disabled={'true'} />

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
export default FormEditPerfilAdvogado