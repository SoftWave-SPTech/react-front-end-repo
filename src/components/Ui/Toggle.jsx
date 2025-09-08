import { useState } from "react";
import 'tailwindcss/tailwind.css';
import { api } from "../../service/api";
import AlertStyle from '../Ui/AlertStyle';


export default function Toggle(props) {
    const [ligado, setLigado] = useState(props.status);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

    const idUsuario = props.idUsuario;

    function mudarStatusUsuario(){

        api.put(`/usuarios/atualizar-status/${idUsuario}`, 
            // {
            // headers: {
            //   "Authorization":  TOKEN
            // }
            // }
        )
        .then((res) => {
            console.log(res) 
            setLigado(!ligado)
        })
        .catch((error) =>{
            console.log("Erro ao ativar ou inativar o usuário", error.status);

            if(error.status >= 500){
                setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
            }else{
                setAlert({ show: true, message: error.response.data.message, type: "error" })
            }
        })
    }

    return (
        <div className="flex items-center space-x-4">

        {alert && (
                <AlertStyle
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

        <span className={`${ligado ? "text-verdeToggle" : "text-vermelhoToggle"} font-bold`}>
            {ligado ? "Ativo" : "Inativo"}
        </span>

        <button
            onClick={mudarStatusUsuario}
            className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ${
            ligado ? "bg-verdeToggle" : "bg-vermelhoToggle"
            }`}
        >
            <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                ligado ? "translate-x-6" : "translate-x-0"
            }`}
            ></div>
        </button>
        </div>
    );
}