import '../Estilos/Button.css'

function Button(props){

    return(
        <>
            <button className={`btn-form-edit ${props.className}`} onClick={props.onClick}>{ props.valorBotao }</button>
        </>
            

    )
}
export default Button