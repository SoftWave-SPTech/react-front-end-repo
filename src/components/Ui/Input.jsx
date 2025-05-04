import '../../estilos/Input.css';

function Input(props){

    //Ignore esse componente
    return(
        <>
        <div className='agrupamento'>
            <label className="label-input-form"> {props.nome}<br />
                <input className="input-form" 
                type={props.type} 
                value={ props.valor } 
                onChange={props.onChange}
                disabled={props.disabled} />
            </label>
        </div>   
        </>
    )

}
export default Input