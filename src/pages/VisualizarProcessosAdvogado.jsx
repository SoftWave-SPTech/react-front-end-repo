import React, { useEffect, useState } from "react";
import LayoutBase from '../layouts/LayoutBase';
import Botao from '../components/Ui/Botao';
import { useParams, useNavigate } from 'react-router-dom';
import BarraTitulo from '../components/Ui/BarraTitulo';
import CardDocumento from '../components/Ui/CardDocumento';
import ModalAguardando from "../components/Ui/ModalAguardando";
import { api, apiGemini } from "../service/api";
import { FiSmile, FiFrown, FiMail, FiPhone } from "react-icons/fi";
import { FaBalanceScale, FaWhatsapp } from "react-icons/fa"; // Importa o ícone do WhatsApp
import Alert from '../components/Ui/AlertStyle'; 

const VisualizarProcessosAdvogado = () => {
  const { idUsuario, idProcesso } = useParams();
  const navigate = useNavigate();
  const [comentario, setComentario] = useState('');
  const [dadosProcesso, setDadosProcesso] = useState({});
  const [dadosUsuario, setDadosUsuario] = useState({});
  const [loading, setLoading] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState("/src/assets/images/boneco.png");
  const [alert, setAlert] = useState(null); // alert state
  const TOKEN = `Bearer ${sessionStorage.getItem('token')}`;

  useEffect(() => {
    api.get(`/processos/visualizar-processo/${idProcesso}`)
      .then(response => {
        console.log("Consulta com sucesso:", response.data);
        setDadosProcesso(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar processo:", error.status);
        if(error.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: error.response.data.message, type: "error" })
          }
      });

    api.get(`/usuarios/usuario-documentos/${idUsuario}`)
      .then(response => {
        console.log("Consulta com sucesso:", response.data);
        if (response.data.foto != null) {
          setFotoPerfil(response.data.foto);
        }
        // Adiciona número de telefone de teste se não houver telefone
        setDadosUsuario({
          ...response.data,
          telefone: response.data.telefone || "+5511999999999"
        });
      })
      .catch(error => {        console.error("Erro ao buscar documentos do usuário:", error.status);
        if(error.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: error.response.data.message, type: "error" })
          }
      });
  }, []);

  const handleAtualizar = () => {
    api.get(`/api/processo/numero/${dadosProcesso.numeroProcesso}`)
      .then(() => {
        console.log("Atualizado com sucesso")
        setAlert({
          type: "success",
          message: "Processo atualizado com sucesso!"
        });
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(error => {
        console.error("Erro ao tentar atualizar processo:", error.status);
        if(error.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: error.response.data.message, type: "error" })
          }
      });
  };

  const handleDocumentos = () => {
    navigate(`/documentos-processo/${idProcesso}`);
  };

  const handleVoltar = () => {
    navigate(-1); // volta para a página anterior
  };

  function gerarAnaliseIA(processoId, movimentacaoId) {
    setLoading(true);
    apiGemini.post(`/analise-processo/${movimentacaoId}`)
      .then((res) => {
        console.log("Análise IA gerada com sucesso:", res.data);
        setAlert({
          type: "success",
          message: "Análise IA gerada com sucesso!"
        });
        setLoading(false);
        setTimeout(() => {
          setAlert(null);
          navigate(`/analise-ia/${processoId}/${movimentacaoId}`);
        }, 1000);
      })
      .catch((error) => {
        console.error("Erro ao gerar análise IA", error.status);
        if(error.status == 409){
          setLoading(false);
          navigate(`/analise-ia/${processoId}/${movimentacaoId}`);
        }else{
          setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          setLoading(false);
        }
      });
  }

  
    const cadastrarComentario = (idProcesso) => {
    api.post(`/comentarios-processos/processo`, 
      {
        comentario: comentario,
        dataCriacao: new Date().toISOString(),
        usuarioID: sessionStorage.getItem("id"),
        ultimaMovimentacaoID: null,
        processoID: idProcesso,
      },
      // {
      //   headers: {
      //     "Authorization": TOKEN
      //   }
      // }
    )
      .then(response => {
        console.log("Comentário enviado com sucesso:", response.data);
        setComentario('');
        setAlert({
          type: "success",
          message: "Comentário enviado com sucesso!"
        });
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(error => {
        console.error("Erro ao enviar o comentário:", error.status);
        if(error.status >= 500){
            setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
          }else{
            setAlert({ show: true, message: error.response.data.message, type: "error" })
          }
      });
  };

    const blocoStyle = {
    background: '#FFFFFF',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    marginBottom: '20px'
  };

  const tituloBlocoStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px'

  };

  return (
    <LayoutBase backgroundClass="bg-cinzaAzulado">
      <div className="p-2 md:p-5 font-sans text-[#2f2f2f] min-h-screen w-full">
        <ModalAguardando loadingEnd={!loading} />
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        {/* Top Bar */}
        <div className="flex flex-col mb-6">
          <BarraTitulo className="w-full text-lg md:text-3xl py-3 md:py-4">Visualizar Processo</BarraTitulo>
        </div>

        {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

        {/* Conteúdo principal responsivo */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-5 w-full">
          {/* Coluna Esquerda */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Dados Cliente */}
            <div className="bg-white rounded-lg p-3 md:p-4 shadow flex flex-col md:flex-row gap-3 md:gap-4 items-center w-full">
              <img
                alt="Cliente"
                src={fotoPerfil}
                className="w-20 h-20 md:w-[100px] md:h-[100px] rounded-full object-cover mb-2 md:mb-0"
              />
              <div className="w-full">
                <div className="text-base md:text-lg font-bold mb-2">Dados Cliente</div>
                <p className="font-bold break-words">{dadosUsuario.nomeFantasia ?? dadosUsuario.nome}</p>
                {dadosUsuario.nomeFantasia && (
                  <p className="font-bold break-words">{dadosUsuario.nome}</p>
                )}
                <p className={`text-xs px-2 py-1 rounded mb-2 inline-block ${dadosUsuario.ativo ? "bg-[#e9e9e9] text-[#555]" : "bg-[#fbe9e9] text-[#b71c1c]"}`}>
                  {dadosUsuario.ativo ? (
                    <span className="flex items-center gap-1">
                      <FiSmile className="inline text-lg" /> Cliente ativo na plataforma
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <FiFrown className="inline text-lg" /> Cliente ainda não acessou a plataforma
                    </span>
                  )}
                </p>
                <p className="flex items-center gap-2 break-all"><FiMail className="text-base" /> {dadosUsuario.email}</p>
                <p className="flex items-center gap-2 break-all">
                  <FiPhone className="text-base" /> {dadosUsuario.telefone}
                  {/* Botão WhatsApp dentro dos dados do cliente */}
                  {dadosUsuario.telefone && (
                    <a
                      href={`https://wa.me/${dadosUsuario.telefone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center text-xs"
                      title="Conversar no WhatsApp"
                    >
                      <FaWhatsapp className="mr-1" /> {/* Ícone do WhatsApp */}
                      WhatsApp
                    </a>
                  )}
                </p>
              </div>
            </div>

            {/* Documentos Cliente */}
            <div className="bg-white rounded-lg p-3 md:p-4 shadow w-full">
              <div className="text-base md:text-lg font-bold mb-2">Documentos do Cliente</div>
              <div className="max-h-56 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dadosUsuario.documentos?.map((doc, idx) => (
                  <CardDocumento
                    key={doc.id}
                    doc={doc}
                    onExcluir={() => confirmarExclusao(doc.id, idx)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Dados Processo */}
            <div className="bg-white rounded-lg p-3 md:p-4 shadow w-full">
              <div className="text-base md:text-lg font-bold mb-2">Dados Processo</div>
              <p className="break-words"><strong>Número do processo:</strong> {dadosProcesso.numeroProcesso}</p>
              <p className="break-words"><strong>Assunto:</strong> {dadosProcesso.assunto}</p>
              <p className="break-words"><strong>Vara:</strong> {dadosProcesso.vara}</p>
              <p className="break-words"><strong>Fórum:</strong> {dadosProcesso.foro}</p>
              <p className="break-words"><strong>Valor da causa:</strong> {dadosProcesso.valorAcao}</p>
              <p className="break-words"><strong>Juiz:</strong> {dadosProcesso.juiz}</p>
              <p className="break-words"><strong>Área:</strong> {dadosProcesso.area}</p>
              <div className="flex flex-col sm:flex-row gap-2 w-full mt-4 justify-center items-center">
                <Botao
                  tamanho="grande"
                  largura="grande"
                  className="w-full sm:w-auto"
                  onClick={handleAtualizar}
                >
                  Atualize seu processo
                </Botao>
                <Botao
                  tamanho="grande"
                  largura="grande"
                  className="w-full sm:w-auto"
                  onClick={handleDocumentos}
                >
                  Documentos do Processo
                </Botao>
              </div>
            </div>

            {/* Advogados */}
            <div className="bg-branco rounded-lg p-3 md:p-4 shadow text-black w-full">
              <div className="text-base md:text-lg font-bold mb-2">Advogados Representantes</div>
              <hr className="border-gray-300 mb-3" />
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {dadosProcesso.advogados?.map((nome, index) => (
                  <li key={index} className="flex items-center gap-2 text-base md:text-lg">
                    <span className="inline-block w-4 h-4 rounded bg-[#d9bb62]"></span>
                    {nome}
                  </li>
                ))}
              </ul>
            </div>

            {/* Linha do Tempo */}
            <div className="bg-branco rounded-lg p-3 md:p-4 shadow w-full">
              <div
                className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin"
                style={{ scrollbarColor: "#010D26 #e5e7eb", scrollbarWidth: "thin" }}
              >
                {dadosProcesso.movimentacoes?.map((movimentacao) => (
                  <div
                    key={movimentacao.id}
                    className="flex-shrink-0 w-32 md:w-36 bg-branco rounded-lg shadow flex flex-col items-center justify-between py-2"
                  >
                    <p className="mb-1 text-xs text-center">Atualização<br />{movimentacao.data}</p>
                    {/* <div className="w-10 h-10 bg-preto rounded-full mb-2"></div> */}
                    <FaBalanceScale className="text-3xl text-AzulEscuro mb-2" />
                    <button
                      onClick={() => gerarAnaliseIA(dadosProcesso.id, movimentacao.id)}
                      className="bg-AzulEscuro text-branco px-2 py-1 rounded text-xs hover:bg-AzulPodcast transition"
                    >
                      Ver análise
                    </button>
                  </div>
                ))}
              </div>
              <style>
                {`
                  .scrollbar-thin::-webkit-scrollbar {
                    height: 8px;
                  }
                  .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #010D26; /* AzulEscuro */
                    border-radius: 4px;
                  }
                  .scrollbar-thin::-webkit-scrollbar-track {
                    background: #e5e7eb;
                  }
                `}
              </style>

            {/* Comentário removido */}
            <div style={blocoStyle}>
              <div style={tituloBlocoStyle}>Resumo do Processo</div>
              <p>
                {dadosProcesso.comentario?.comentario || "Não há registro de resumo do processo anteriores a este!"}
              </p>

              <input
                type="text"
                placeholder="Adicione um resumo do processo para o Cliente..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginTop: '8px'
                }}
              />
            <Botao onClick={() => cadastrarComentario(dadosProcesso.id)} tamanho="pequeno" largura="pequeno">
              ENVIAR
            </Botao>
            </div>

          </div>
        </div>
        </div>
        

        <div className="flex justify-center mt-6">
          <Botao tamanho='medio' largura="medio" cor='padrao' onClick={handleVoltar}>
            VOLTAR
          </Botao>
        </div>
      </div>
    </LayoutBase>
  );
};

export default VisualizarProcessosAdvogado;