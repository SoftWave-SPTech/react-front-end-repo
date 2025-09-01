import React, { useEffect, useState } from "react";
import LayoutBase from '../layouts/LayoutBase';
import ProcessoHeader from '../components/Ui/ProcessoHeader';
import DocumentosCliente from '../components/Ui/DocumentosCliente';
import LinhaDoTempoProcesso from '../components/Ui/LinhaDoTempoProcesso';
import ComentarioCliente from '../components/Ui/ComentarioCliente';
import Botao from '../components/Ui/Botao';
import { useParams, useNavigate } from 'react-router-dom';
import { PiSealQuestionBold } from 'react-icons/pi';
import BarraTitulo from '../components/Ui/BarraTitulo';
import { api } from "../service/api";
import CardDocumento from '../components/Ui/CardDocumento';
import ModalAguardando from "../components/Ui/ModalAguardando";
import Alert from '../components/Ui/AlertStyle'; // import AlertStyle

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
        console.error("Erro ao enviar o arquivo:", error);
        setAlert({
          type: "error",
          message: "Erro ao buscar dados do processo."
        });
      });

    api.get(`/usuarios/usuario-documentos/${idUsuario}`)
      .then(response => {
        console.log("Consulta com sucesso:", response.data);
        if (response.data.foto != null) {
          setFotoPerfil("http://localhost:8080/" + response.data.foto);
        }
        setDadosUsuario(response.data)
      })
      .catch(error => {
        console.error("Erro ao enviar o arquivo:", error);
        setAlert({
          type: "error",
          message: "Erro ao buscar dados do usuário."
        });
      });
  }, []);

  const handleAtualizar = () => {
    api.get(`/api/processo/numero/${dadosProcesso.numeroProcesso}`)
      .then(response => {
        console.log("Atualizado com sucesso")
        setAlert({
          type: "success",
          message: "Processo atualizado com sucesso!"
        });
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(error => {
        console.error("Erro ao tentar atualizar processo:", error);
        setAlert({
          type: "error",
          message: "Erro ao tentar atualizar processo."
        });
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
    api.post(`/analise-processo/${movimentacaoId}`)
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
        console.error("Erro ao gerar análise IA", error);
        setAlert({
          type: "error",
          message: "Erro ao gerar análise IA."
        });
        setLoading(false);
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
      }
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
        console.error("Erro ao enviar o comentário:", error);
        setAlert({
          type: "error",
          message: "Erro ao enviar o comentário."
        });
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
      <div style={{ padding: '20px', fontFamily: 'Segoe UI, sans-serif', color: '#2f2f2f' }}>
        <ModalAguardando loadingEnd={!loading} />
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <BarraTitulo className="w-[55%]">Vizualizar Processo</BarraTitulo>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Botao tamanho="grande" largura="grande" onClick={() => handleAtualizar()}>
              Atualize seu processo
            </Botao>
            <Botao tamanho="grande" largura="grande" onClick={handleDocumentos}>
              Documentos do Processo
            </Botao>
          </div>
        </div>

        {/* Conteúdo */}
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Coluna Esquerda */}
          <div style={{ flex: 1 }}>
            {/* Dados Cliente */}
            <div style={{ ...blocoStyle, display: 'flex', gap: '16px' }}>
              <img
                alt="Cliente"
                src={fotoPerfil}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <div style={tituloBlocoStyle}>Dados Cliente</div>
                <p style={{ fontWeight: 'bold' }}>{dadosUsuario.nomeFantasia != null ? dadosUsuario.nomeFantasia : dadosUsuario.nome}</p>
                {
                  dadosUsuario.nomeFantasia != null ? <p style={{ fontWeight: 'bold' }}>{dadosUsuario.nome}</p> : ""
                }
                <p style={{
                  fontSize: '0.75rem',
                  color: '#555',
                  background: '#e9e9e9',
                  display: 'inline-block',
                  padding: '4px 6px',
                  borderRadius: '4px',
                  marginBottom: '6px'
                }}>{dadosUsuario.ativo ? "😊 Cliente ativo na plataforma" : "😞 Cliente ainda não acessou a plataforma"}</p>
                <p>{dadosUsuario.email}</p>
                <p>{dadosUsuario.telefone}</p>
              </div>
            </div>

            {/* Documentos Cliente */}
            <div style={blocoStyle}>
              <div style={tituloBlocoStyle}>Documentos Cliente</div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px'
              }}>
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
          <div style={{ flex: 1 }}>
            {/* Dados Processo */}
            <div style={blocoStyle}>
              <div style={tituloBlocoStyle}>Dados Processo</div>
              <p><strong>Número do processo:</strong> {dadosProcesso.numeroProcesso}</p>
              <p><strong>Assunto:</strong> {dadosProcesso.assunto}</p>
              <p><strong>Vara:</strong> {dadosProcesso.vara}</p>
              <p><strong>Fórum:</strong> {dadosProcesso.foro}</p>
              <p><strong>Valor da causa:</strong> {dadosProcesso.valorAcao}</p>
              <p><strong>Juiz:</strong> {dadosProcesso.juiz}</p>
              <p><strong>Área:</strong> {dadosProcesso.area}</p>
            </div>

            {/* Documentos Processo / Advogados */}
            <div style={blocoStyle}>
              <h4 style={{ margin: '10px 0 5px' }}>Advogados Representantes</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {dadosProcesso.advogados?.map((nome, index) => (
                  <li key={index}>☑️ {nome}</li>
                ))}
              </ul>
            </div>

            {/* Linha do Tempo */}
            <div style={{
              ...blocoStyle,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
              {dadosProcesso.movimentacoes?.map((movimentacao) => (
                <div key={movimentacao.id} style={{ textAlign: 'center' }}>
                  <p style={{ marginBottom: '4px' }}>Atualização<br />{movimentacao.data}</p>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#000',
                    borderRadius: '50%',
                    margin: '6px auto'
                  }}></div>
                  <button onClick={() => gerarAnaliseIA(dadosProcesso.id, movimentacao.id)} style={{
                    background: '#0A1F44',
                    color: '#fff',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>Ver análise</button>
                </div>
              ))}
            </div>

            {/* Comentário */}
            <div style={blocoStyle}>
              <div style={tituloBlocoStyle}>Comentário</div>
              <p>
                {dadosProcesso.comentario?.comentario || "Não há comentários anteriores a este!"}
              </p>

              <input
                type="text"
                placeholder="Adicione um comentário para o Cliente..."
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

        {/* Botão Voltar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <Botao tamanho='medio' largura="medio" cores='padrao' onClick={handleVoltar}>
            VOLTAR
          </Botao>
        </div>
      </div>
    </LayoutBase>
  );
};

export default VisualizarProcessosAdvogado;