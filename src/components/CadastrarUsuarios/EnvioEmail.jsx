import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import Alert from "../Ui/AlertStyle";

const EnviarChaveAcesso = async (nome, chaveAcesso, email) => {
    const templateParams = {
        name: nome,
        chaveAcesso: chaveAcesso,
        email: email
    };

    try {
        const response = await emailjs.send(
            'service_wl3tya5',    // ID do serviço de e-mail configurado
            'template_yij79fn',   // ID do template de email
            templateParams,
            'xu4fuCVI4T5hc13Qb'  // Public key da conta EmailJS
        );
        console.log('E-mail enviado!', response.status, response.text);
        return response;
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw error;
    }
};

export default EnviarChaveAcesso;