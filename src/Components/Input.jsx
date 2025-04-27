import '../Estilos/Input.css'

function Input(props){

    return(
        <>
        <div className='agrupamento'>
            <label className="label-input-form"> {props.nome}<br />
                <input className="input-form" 
                type="text" 
                value={ props.valor } 
                onChange={props.onChange}
                disabled={props.disabled} />
            </label>
        </div>   
        </>
    )

}
export default Input