import emailjs from '@emailjs/browser';
import Alert from "../Ui/AlertStyle";

// A função agora recebe setAlert como parâmetro para gerenciar os alerts
const EnviarChaveAcesso = async (nome, chaveAcesso, email, setAlert) => {
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

        setAlert({
            show: true,
            type: "success",
            message: "E-mail enviado com sucesso!"
        });

        return response;
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);

        if (error.status >= 500) {
            setAlert({
                show: true,
                type: "error",
                message: "O serviço não está disponível! Por favor, contate o nosso suporte."
            });
        } else {
            setAlert({
                show: true,
                type: "error",
                message: error.response?.data?.message || "Erro ao enviar e-mail."
            });
        }

        throw error;
    }
};

export default EnviarChaveAcesso;
