import Button from "../Components/Button"
import Input from "../Components/Input"
import '../Estilos/FormEditarPerfil.css'
import Image from "../Components/Image"
import { useState } from "react"

function FormEditPerfilAdvogado(){

    const [tipoUsuario, setTipoUsuario] = useState("juridica")

    
    return(
        <>
            <div className="container">
                <div className="formulario-editar-perfil foto" >
                    <div className="container-titulo-editar-perfil" >
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
                        {/* <Input 
                        nome={"Nome:"}
                        valor={'Luana'} />
                        <Input 
                        nome={"CPF:"}
                        valor={'XXX.XXX.XXX-XX'} />
                        <Input 
                        nome={"RG:"}
                        valor={'XX.XXX.XXX-X'} /> */}
                        {tipoUsuario === 'fisica' ? (
                            <>
                                <Input nome={"Nome:"} valor={'Luana'} />
                                <Input nome={"CPF:"} valor={'XXX.XXX.XXX-XX'} />
                                <Input nome={"RG:"} valor={'XX.XXX.XXX-X'} />
                            </>
                            ) : (
                            <>
                                <Input nome={"Nome Fantasia:"} valor={'Luana modas'} />
                                <Input nome={"Razão Social:"} valor={'Empresa Luana'} />
                                <Input nome={"CNPJ:"} valor={'XX.XXX.XXX/0001-XX'} />
                            </>
                        )}
                        <Input 
                        nome={"Email:"}
                        valor={'luana@gamil.com'} />
                    </div>

                    <div className="divisoria">
                        <Input 
                        nome={"OAB:"}
                        valor={'UF000000'} />
                        <Input 
                        nome={"Telefone:"}
                        valor={'(11) 90000-0000'} />
                        <Input 
                        nome={"CEP:"}
                        valor={'00000-003'} />

                        <div className="divisao">
                        <Button valorBotao={'Cancelar'} className={'oposto'} />
                        <Button valorBotao={'Salvar'} />
                        </div>  
                    </div>
                    </div>
                      
                    

                </div>
            </div>
            
        </>
    )
}
export default FormEditPerfilAdvogado