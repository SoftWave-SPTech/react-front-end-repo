import emailjs from '@emailjs/browser';

const EnviarChaveAcesso = (nome, chaveAcesso, email) => {

        const templateParams = {
            name : nome,              
            chaveAcesso : chaveAcesso,
            email : email 
        };


        emailjs.send(
            'service_wl3tya5',    // ID do serviço de e-mail configurado
            'template_yij79fn',   // ID do template de email
            templateParams,      
            'xu4fuCVI4T5hc13Qb'     // Public key da conta EmailJS
        ).then((response) => {
            console.log('E-mail enviado!', response.status, response.text);
            alert('E-mail enviado com sucesso!');
        }).catch((error) => {
            console.error('Erro ao enviar e-mail:', error);
            alert('Erro ao enviar e-mail. Verifique os dados e tente novamente.');
        });
};

export default EnviarChaveAcesso;