import { Input } from "../Ui/Input.jsx";
import Botao from "../Ui/Botao.jsx";
import BarraTitulo from "../Ui/BarraTitulo.jsx";
import minhaImagem from '../../assets/images/boneco.png'
import { useEffect, useState, useRef } from "react";
import { FiUpload, FiTrash } from 'react-icons/fi';
import { api } from '../../service/api.js';
import { buscarCep } from "../../service/buscarCep.js";
import { mascaraCEP, mascaraTelefone, mascaraCPF, mascaraRG, mascaraCNPJ, mascaraOAB } from '../../Utils/mascaras';
import { validarPerfilAdvogado } from '../../Utils/validacoes.jsx';

function FormPerfilAdvogado() {
    const TOKEN = `Bearer ${sessionStorage.getItem('token')}`
    const fileInputRef = useRef(null);
    const [usuario, setUsuario] = useState({
        email: '',
        telefone: '',
        logradouro: '',
        numero: '',
        representante: '',
        bairro: '',
        cidade: '',
        complemento: '',
        cep: '',
        oab: '',
        nome: '',
        cpf: '',
        rg: '',
        nomeFantasia: '',
        razaoSocial: '',
        cnpj: '',
    });

    const [usuarioParaAtualizar, setUsuarioParaAtualizar] = useState({
        email: '',
        telefone: '',
        logradouro: '',
        representante: '',
        numero: '',
        bairro: '',
        cidade: '',
        complemento: '',
        cep: '',
        oab: '',
        nome: '',
        nomeFantasia: '',
        razaoSocial: '',
        cnpj: '',
    });


    const [errors, setErrors] = useState({});
    const [cepAnterior, setCepAnterior] = useState('');
    const URL = sessionStorage.getItem('tipoUsuario') == 'UsuarioFisico' ? "/usuarios-fisicos/" : "/usuarios-juridicos/"
    const URLFOTO = "/usuarios/foto-perfil"



    useEffect(() => {
        if (sessionStorage.getItem('tipoUsuario') == "AdvogadoFisico") {

            api.get(`/advogados-fisicos/${sessionStorage.getItem('id')}`, {
                headers: {
                    Authorization: TOKEN,
                },
            })
                .then((resposta) => {
                    const dados = {
                        "id": resposta.data.id,
                        "nome": resposta.data.nome,
                        "cpf": resposta.data.cpf,
                        "rg": resposta.data.rg,
                        "oab": resposta.data.oab,
                        "email": resposta.data.email,
                        "telefone": resposta.data.telefone,
                        "logradouro": resposta.data.logradouro,
                        "numero": resposta.data.numero,
                        "bairro": resposta.data.bairro,
                        "cidade": resposta.data.cidade,
                        "complemento": resposta.data.complemento,
                        "cep": resposta.data.cep
                    };

                    criarAtualizarFisicos(dados)
                })
                .catch((erro) => {
                    console.log(erro)
                    console.log(erro.response?.data?.message || 'Erro ao buscar dados do advogado físico');
                })

        } else if (sessionStorage.getItem('tipoUsuario') == "AdvogadoJuridico") {

            api.get(`/advogados-juridicos/${sessionStorage.getItem('id')}`, {
                headers: {
                    Authorization: TOKEN,
                },
            })
                .then((resposta) => {
                    console.log("Dados recebidos para usuário físico:", resposta.data);
                    const dados = {
                        "id": resposta.data.id,
                        "nomeFantasia": resposta.data.nomeFantasia,
                        "razaoSocial": resposta.data.razaoSocial,
                        "cnpj": resposta.data.cnpj,
                        "oab": resposta.data.oab,
                        "email": resposta.data.email,
                        "telefone": resposta.data.telefone,
                        "logradouro": resposta.data.logradouro,
                        "numero": resposta.data.numero,
                        "bairro": resposta.data.bairro,
                        "cidade": resposta.data.cidade,
                        "complemento": resposta.data.complemento,
                        "cep": resposta.data.cep,
                        "representante": resposta.data.representante
                    }

                    criarAtualizarJuridicos(dados)

                })
                .catch((erro) => {
                    console.log(erro)
                    console.log(erro.response?.data?.message || 'Erro ao buscar dados do advogado jurídico');
                })
        }
    }, []);

    function enviarDadosParaAtualizacao() {
        console.log(usuarioParaAtualizar)
        if (sessionStorage.getItem('tipoUsuario') == "AdvogadoFisico") {
            const tipoUsuario = sessionStorage.getItem('tipoUsuario');

            const dadosParaValidar =
            {
                ...usuarioParaAtualizar,
                tipoUsuario: tipoUsuario,
            };

            const errosEncontrados = validarPerfilAdvogado(dadosParaValidar);

            if (Object.keys(errosEncontrados).length > 0) {
                setErrors(errosEncontrados);
                console.log(errosEncontrados)
                return;
            }

            api.put(`/advogados-fisicos/${usuario.id}`, usuarioParaAtualizar, {
                headers: {
                    Authorization: TOKEN,
                },
            })
                .then((resposta) => {
                    console.log(resposta)

                    alert("Dados Atualizados com sucesso!");
                    window.location.reload();
                })
                .catch((erro) => {
                    console.log(erro)
                    console.log(erro.response?.data?.message || 'Erro ao atualizar dados do advogado físico');
                    alert("Ocorreu um erro, tente novamente!");
                })

        } else if (sessionStorage.getItem('tipoUsuario') == "AdvogadoJuridico") {
            const tipoUsuario = sessionStorage.getItem('tipoUsuario');

            const dadosParaValidar =
            {
                ...usuarioParaAtualizar,
                tipoUsuario: tipoUsuario,
            };

            const errosEncontrados = validarPerfilAdvogado(dadosParaValidar);

            if (Object.keys(errosEncontrados).length > 0) {
                setErrors(errosEncontrados);
                console.log(errosEncontrados)
                return;
            }

            api.put(`/advogados-juridicos/${usuario.id}`, usuarioParaAtualizar, {
                headers: {
                    Authorization: TOKEN,
                },
            })
                .then((resposta) => {
                    console.log(resposta)
                    alert("Dados Atualizados com sucesso!");
                    window.location.reload();
                })
                .catch((erro) => {
                    console.log(erro)
                    console.log(erro.response?.data?.message || 'Erro ao atualizar dados do advogado jurídico');
                    alert("Ocorreu um erro, tente novamente!");
                })
        }
    }

    function criarAtualizarFisicos(dados) {
        setUsuario(dados);
        setUsuarioParaAtualizar({
            "nome": dados.nome,
            "email": dados.email,
            "telefone": dados.telefone,
            "logradouro": dados.logradouro,
            "numero": dados.numero,
            "bairro": dados.bairro,
            "cidade": dados.cidade,
            "oab": dados.oab,
            "complemento": dados.complemento,
            "cep": dados.cep,
            "rg": dados.rg,
            "cpf": dados.cpf
        })
    }

    function criarAtualizarJuridicos(dados) {
        setUsuario(dados);

        setUsuarioParaAtualizar({
            "nomeFantasia": dados.nomeFantasia,
            "razaoSocial": dados.razaoSocial,
            "cnpj": dados.cnpj,
            "email": dados.email,
            "telefone": dados.telefone,
            "logradouro": dados.logradouro,
            "representante": dados.representante,
            "numero": dados.numero,
            "bairro": dados.bairro,
            "cidade": dados.cidade,
            "oab": dados.oab,
            "complemento": dados.complemento,
            "cep": dados.cep
        })
    }

    async function buscarEnderecoPorCep(cep) {
        try {
            const endereco = await buscarCep(cep);
            setUsuarioParaAtualizar((prev) => ({
                ...prev,
                logradouro: endereco.logradouro,
                bairro: endereco.bairro,
                cidade: endereco.localidade,
            }));
            setUsuario((prev) => ({
                ...prev,
                logradouro: endereco.logradouro,
                bairro: endereco.bairro,
                cidade: endereco.localidade,
            }));
        } catch (error) {
            alert('CEP inválido ou não encontrado.');
        }
    }

    function cliqueBotaoFoto() {
        fileInputRef.current.click();
    }

    function atualizarFoto(file) {
        console.log(file)
        if (!file) {
            alert("Escolha uma foto primeiro!");
        } else {
               const tiposPermitidos = ["image/png", "image/jpg", "image/jpeg"];
        if (!tiposPermitidos.includes(file.type)) {
            alert("Por favor, selecione uma imagem PNG, JPG ou JPEG.");
            return;
        }


            // FormData é um objeto nativo do JavaScript (existe mesmo sem React).
            // Ele foi criado para simular um formulário HTML em JavaScript, para que a gente possa enviar arquivos e outros dados para o servidor via código.
            // Ele embala o arquivo certinho no formato multipart/form-data, que é um formato especial para enviar:

            // Arquivos (.png, .jpg, .pdf, etc).

            const arquivoFormatado = new FormData();
            arquivoFormatado.append("fotoPerfil", file);

            api.put(`${URLFOTO}/${sessionStorage.getItem('id')}`, arquivoFormatado, {
                headers: 
                {
                    "Authorization": TOKEN
                }
            })
            //.catch(error => {
             //   console.error("Erro ao enviar o arquivo:", error.response?.data?.message || 'Erro ao enviar o arquivo');
              //  console.error("Erro ao enviar o arquivo:", error);
            //});
                .then(response => {
                    console.log("Upload realizado com sucesso:", response.data);
                    sessionStorage.setItem('fotoPerfil', response.data);
                    alert("Foto Atualizada com sucesso!");
                    window.location.reload()
                })
                .catch(error => {
                    console.error("Erro ao enviar o arquivo:", error);
                });
        }
    }

    function excluirFotoPerfil() {
        api.delete(`${URLFOTO}/${sessionStorage.getItem('id')}`, {
            headers: {
                "Authorization": TOKEN,
            }
        })
            .then(response => {
                console.log("Foto Deletada com sucesso");
                sessionStorage.setItem('fotoPerfil', "http://localhost:8080/null");
                window.location.reload()

            })
            .catch(error => {
                console.error("Erro ao enviar o arquivo:", error);
                console.error("Erro ao enviar o arquivo:", error.response?.data?.message || 'Erro ao enviar o arquivo');
            });
    }

    return (
        <>
            <div className="flex justify-center">
                <BarraTitulo tamanho="grande" cor="escuro" className="rounded-lg w-full max-w-[75%] text-base">
                    Foto do usuário
                </BarraTitulo>
            </div>
            <div className="w-full max-w-[75%] mx-auto py-3 mb-4 flex flex-col gap-4 shadow-md rounded-lg bg-white">
                <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <img
                        src={sessionStorage.getItem('fotoPerfil') !== "http://localhost:8080/null" ? sessionStorage.getItem('fotoPerfil') : '/src/assets/images/boneco.png'}
                        alt="Foto de perfil"
                        className="w-28 h-28 rounded-full border-2 border-azulEscuroForte shadow-md object-cover bg-gray-100"
                    />

                    <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">
                        <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">
                            <Botao
                                cor="contornoAzul"
                                tamanho="extraPequeno"
                                largura="auto"
                                className="flex justify-center items-center px-6 py-2 text-base w-[8rem] whitespace-nowrap"
                                onClick={cliqueBotaoFoto}
                            >
                                <span className="flex items-center gap-2">
                                    Subir foto <FiUpload size={18} />
                                </span>
                            </Botao>

                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={(e) => atualizarFoto(e.target.files[0])}
                            />

                            <Botao
                                cor="padrao"
                                tamanho="extraPequeno"
                                largura="auto"
                                className="flex justify-center items-center px-6 py-2 text-base w-8rem] whitespace-nowrap"
                                onClick={excluirFotoPerfil}
                            >
                                <span className="flex items-center gap-2">
                                    Remover <FiTrash size={18} />
                                </span>
                            </Botao>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex justify-center">
                <BarraTitulo tamanho="grande" cor="escuro" className="rounded-lg w-full max-w-[75%] text-base">
                    Informações Pessoais
                </BarraTitulo>
            </div>
            <div className="w-full max-w-[75%] mx-auto py-2 mb-6 flex flex-col gap-4 shadow-md rounded-lg bg-white">
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    {sessionStorage.getItem('tipoUsuario') === 'AdvogadoFisico' ? (
                        <>
                            <Input
                                label="Nome:"
                                name="nome"
                                placeholder="Ex: João Silva"
                                value={usuario.nome}
                                onChange={(e) => {
                                    setUsuarioParaAtualizar({ ...usuarioParaAtualizar, nome: e.target.value });
                                    setUsuario({ ...usuario, nome: e.target.value });
                                }}
                                errorMessage={errors.nome}
                            />
                            <Input label="CPF:" name="cpf" value={mascaraCPF(usuario.cpf)} disabled />
                            <Input label="RG:" name="rg" value={mascaraRG(usuario.rg)} disabled />
                        </>
                    ) : (
                        <>
                            <Input label="Nome do representante" name="representante" placeholder="Ex: João Silva" value={usuario.representante}
                                onChange={(e) => {
                                    setUsuarioParaAtualizar({ ...usuarioParaAtualizar, representante: e.target.value });
                                    setUsuario({ ...usuario, representante: e.target.value });
                                }}
                                errorMessage={errors.representante}
                            />
                            <Input
                                label="Nome Fantasia:"
                                name="nomeFantasia"
                                placeholder="Ex: Advocacia Nova Era"
                                value={usuario.nomeFantasia}
                                onChange={(e) => {
                                    setUsuarioParaAtualizar({ ...usuarioParaAtualizar, nomeFantasia: e.target.value });
                                    setUsuario({ ...usuario, nomeFantasia: e.target.value });
                                }}
                                errorMessage={errors.nomeFantasia}
                            />
                            <Input
                                label="Razão Social:"
                                name="razaoSocial"
                                placeholder="Ex: Advocacia Nova Era LTDA"
                                value={usuario.razaoSocial}
                                onChange={(e) => {
                                    setUsuarioParaAtualizar({ ...usuarioParaAtualizar, razaoSocial: e.target.value });
                                    setUsuario({ ...usuario, razaoSocial: e.target.value });
                                }}
                                errorMessage={errors.razaoSocial}
                            />
                            <Input
                                label="CNPJ:"
                                name="cnpj"
                                value={mascaraCNPJ(usuario.cnpj)}
                                placeholder="00.000.000/0000-00"
                                onChange={(e) => {
                                    setUsuarioParaAtualizar({ ...usuarioParaAtualizar, cnpj: e.target.value });
                                    setUsuario({ ...usuario, cnpj: e.target.value });
                                }}
                                errorMessage={errors.cnpj}
                            />
                        </>
                    )}

                    <Input
                        label="Email:"
                        name="email"
                        placeholder="advocacia@dominio.com.br"
                        value={usuario.email}
                        onChange={(e) => {
                            setUsuarioParaAtualizar({ ...usuarioParaAtualizar, email: e.target.value });
                            setUsuario({ ...usuario, email: e.target.value });
                        }}
                        errorMessage={errors.email}
                    />

                    <Input
                        label="Telefone:"
                        name="telefone"
                        placeholder="(00) 00000-0000"
                        value={mascaraTelefone(usuario.telefone)}
                        onChange={(e) => {
                            setUsuarioParaAtualizar({ ...usuarioParaAtualizar, telefone: e.target.value });
                            setUsuario({ ...usuario, telefone: e.target.value });
                        }}
                        errorMessage={errors.telefone}
                    />

                    <Input label="OAB:" name="oab" placeholder="000000" value={usuario.oab} disabled />

                    <Input
                        label="CEP:"
                        name="cep"
                        placeholder="00000-000"
                        value={mascaraCEP(usuario.cep)}
                        onChange={(e) => {
                            const novoCep = e.target.value;
                            setUsuarioParaAtualizar({ ...usuarioParaAtualizar, cep: novoCep });
                            setUsuario({ ...usuario, cep: novoCep });
                            if (novoCep.replace(/\D/g, '').length === 8 && novoCep !== cepAnterior) {
                                buscarEnderecoPorCep(novoCep);
                                setCepAnterior(novoCep);
                            }
                        }}
                        errorMessage={errors.cep}
                    />
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="w-full">
                            <Input label="Logradouro:" name="logradouro" placeholder="Ex: Rua das Flores" value={usuario.logradouro}
                                onChange={(e) => {
                                    setUsuarioParaAtualizar({ ...usuarioParaAtualizar, logradouro: e.target.value });
                                    setUsuario({ ...usuario, logradouro: e.target.value });
                                }}
                                className="w-full"
                                errorMessage={errors.logradouro}
                            />
                        </div>
                        <div className="w-1/4">
                            <Input label="Número:" name="numero" placeholder="Ex: 123" value={usuario.numero || ""}
                                onChange={(e) => {
                                    setUsuarioParaAtualizar({ ...usuarioParaAtualizar, numero: e.target.value });
                                    setUsuario({ ...usuario, numero: e.target.value });
                                }}
                                className="w-full"
                                errorMessage={errors.numero}
                            />
                        </div>
                    </div>
                    <Input
                        label="Bairro:"
                        name="bairro"
                        placeholder="Ex: Centro"
                        value={usuario.bairro}
                        onChange={(e) => {
                            setUsuarioParaAtualizar({ ...usuarioParaAtualizar, bairro: e.target.value });
                            setUsuario({ ...usuario, bairro: e.target.value });
                        }}
                        errorMessage={errors.bairro}
                    />
                    <Input
                        label="Cidade:"
                        name="cidade"
                        placeholder="Ex: Belo Horizonte"
                        value={usuario.cidade}
                        onChange={(e) => {
                            setUsuarioParaAtualizar({ ...usuarioParaAtualizar, cidade: e.target.value });
                            setUsuario({ ...usuario, cidade: e.target.value });
                        }}
                        errorMessage={errors.cidade}
                    />
                    <Input
                        label="Complemento:"
                        name="complemento"
                        placeholder="Ex: Sala 01, Ed. Omega"
                        value={usuario.complemento}
                        onChange={(e) => {
                            setUsuarioParaAtualizar({ ...usuarioParaAtualizar, complemento: e.target.value });
                            setUsuario({ ...usuario, complemento: e.target.value });
                        }}
                    />
                </div>
                <div className="w-full flex justify-center items-center px-4 pb-4">
                    <Botao onClick={enviarDadosParaAtualizacao} tamanho="grande" largura="pequeno">Salvar</Botao>
                </div>
            </div>
        </>
    );
}
export default FormPerfilAdvogado;