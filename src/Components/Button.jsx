import '../Estilos/Button.css'

function Button(props){

    return(
        <>
            <button className={`btn-form-edit ${props.className}`}>{ props.valorBotao }</button>
        </>
            

    )
}
export default Button