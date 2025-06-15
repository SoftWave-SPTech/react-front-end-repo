import '../../estilos/Button.css';

function Button(props){

    //Ignore esse componente
    return(
        <>
            <button className={`btn-form-edit ${props.className}`} onClick={props.onClick}>{ props.valorBotao }</button>
        </>
            

    )
}
export default Button