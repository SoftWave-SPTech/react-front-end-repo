import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import Alert from "../Ui/AlertStyle";

const EnviarChaveAcesso = (nome, chaveAcesso, email) => {
    const [alert, setAlert] = useState(null);

    const templateParams = {
        name: nome,
        chaveAcesso: chaveAcesso,
        email: email
    };

    emailjs.send(
        'service_wl3tya5',    // ID do serviço de e-mail configurado
        'template_yij79fn',   // ID do template de email
        templateParams,
        'xu4fuCVI4T5hc13Qb'  // Public key da conta EmailJS
    ).then((response) => {
        console.log('E-mail enviado!', response.status, response.text);
        setAlert({
            type: "success",
            message: "E-mail enviado com sucesso!"
        });
    }).catch((error) => {
        console.error('Erro ao enviar e-mail:', error.status);
        if(error.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: error.response.data.message, type: "error" })
          }
    });

    return (
        <>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
        </>
    );
};

export default EnviarChaveAcesso;