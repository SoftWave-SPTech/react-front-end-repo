import React, { useEffect, useState } from "react";
import ComentarioAdvogado from "../Ui/ComentarioAdvogado";
import BlocoInformativo from "../Ui/BlocoInformativo";
import BarraTitulo from "../../components/Ui/BarraTitulo";
import ModalComentario from "../Ui/ModalComentario";
import { api } from "../../service/api";
import { useParams } from "react-router-dom";
import { formatarData } from "../../Utils/mascaras";
import Botao from "../Ui/Botao";

export default function AnaliseMovimentacao() {

  const [comentarios, setComentarios] = useState([
  ]);

  const { movimentacaoId } = useParams();
  const TOKEN = sessionStorage.getItem("token");
  const tipoUsuario = sessionStorage.getItem("tipoUsuario");
  const [modalAberto, setModalAberto] = useState(false);
  const [comentarioSelecionado, setComentarioSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  const [analise, setAnalise] = useState("");
  const [movimentacao, setMovimentacao] = useState("");
  const [movimentacaoData, setMovimentacaoData] = useState("");

  useEffect(() => {
    api.get(`/analise-processo/por-movimentacao/${movimentacaoId}`, {
      headers: { Authorization: TOKEN }
    }).then((response) => {
      console.log("Análise e movimentação recebidas:" , response.data);
      // console.log(response.data);
      const analiseIA = response.data.resumoIA || "Análise não disponível no momento.";
      const movimentacaoAtual = response.data.ultimaMovimentacao.movimento || "Movimentação não disponível no momento.";
      const movimentacaoData = response.data.ultimaMovimentacao.data || "Data não disponível.";
      setAnalise(analiseIA);
      setMovimentacao(movimentacaoAtual);
      setMovimentacaoData(movimentacaoData)

    }).catch((error) => {
      console.error("Erro ao buscar análise e movimentação:", error);
      setAnalise("Análise não disponível no momento.");
      setMovimentacao("Movimentação não disponível no momento.");
    });


    api.get(`/comentarios-processos/buscar-por-ultima-movimentacao/${movimentacaoId}`, {
      headers: { Authorization: TOKEN }
    }).then((response) => {
      console.log("Comentários recebidos:", response.data);
      if (Array.isArray(response.data)) {
        setComentarios(response.data);
      } else {
        setComentarios([]);
      }
    }).catch((error) => {
      console.error("Erro ao buscar comentários:", error);
      setComentarios([]);
    });

  }, []);


  const handleSalvar = (texto) => {
    const novoComentario = {
      id : comentarioSelecionado?.id || null,
      nomeUsuario: sessionStorage.getItem("nome"),
      dataComentario: getISOComFusoBrasil(),
      comentario: texto,
      fotoUsuario: sessionStorage.getItem("fotoPerfil"),
      idUsuario: sessionStorage.getItem("id"),
    };

    console.log("Novo comentário:", novoComentario);
    const salvarComentario = {
      comentario: novoComentario.comentario,
      dataCriacao: novoComentario.dataComentario,
      usuarioID: sessionStorage.getItem("id"),
      ultimaMovimentacaoID: movimentacaoId,
      processoID: null
    };
if (!comentarioSelecionado?.id) { // Adiciona o ID do comentário existente para edição
    api.post(`/comentarios-processos/movimentacao`,  salvarComentario, {
      headers: { Authorization: TOKEN }
    }).then((response) => {
      api.get(`/comentarios-processos/buscar-por-ultima-movimentacao/${movimentacaoId}`, {
        headers: { Authorization: TOKEN }
      }).then((response) => {
        setComentarios(Array.isArray(response.data) ? response.data : []);
      });
    }).catch((error) => {
      console.error("Erro ao salvar comentário:", error);
    });
  }else{
    api.put(`/comentarios-processos/${comentarioSelecionado.id}`,  salvarComentario, {
      headers: { Authorization: TOKEN }
    }).then((response) => {
      console.info("Comentário atualizado com sucesso:", response.data);
      api.get(`/comentarios-processos/buscar-por-ultima-movimentacao/${movimentacaoId}`, {
        headers: { Authorization: TOKEN }
      }).then((response) => {
        setComentarios(Array.isArray(response.data) ? response.data : []);
      });
    }).catch((error) => {
      console.error("Erro ao atualizar comentário:", error);
    });
  };
    setModalAberto(false);
    setComentarioSelecionado(null);
    setModoEdicao(false);
}
  const handleExcluir = (id , index) => {
    if (id !== null) {

      api.delete(`/comentarios-processos/${id}`, {
        headers: { Authorization: TOKEN }
      }).then((response) => {     
        console.info("Comentário excluído com sucesso:", response.data);
      }).catch((error) => {
        console.error("Erro ao excluir comentário:", error);
      });

      const novaLista = [...comentarios];
      novaLista.splice(index, 1);


      setComentarios(novaLista);
      setModalAberto(false);
      setComentarioSelecionado(null);
      setModoEdicao(false);
    }
  };

  function getISOComFusoBrasil() {
  const data = new Date();
  const offsetMs = -3 * 60 * 60 * 1000; // UTC-3 em milissegundos
  const dataComOffset = new Date(data.getTime() + offsetMs);
  return dataComOffset.toISOString();
}
  return (
    <div className="w-full min-h-screen px-5">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex justify-center">
          <BarraTitulo className="justify-center">
            Atualizações {movimentacaoData}
          </BarraTitulo>
        </div>

        <div className="flex flex-col lg:flex-row gap-x-6">
          {/* Comentários */}
          <div className="lg:w-[40%]">
            <div className="space-y-6 max-h-[490px] overflow-y-auto pr-2">
              {comentarios.map((coment, index) => (
                <ComentarioAdvogado
                  key={index}
                  id={coment.id}
                  nome={coment.nomeUsuario}
                  data={formatarData(coment.dataComentario)}
                  texto={coment.comentario}
                  // Precisa mudar para uma constante que armazena o prefixo no caminho da foto do perfil do comentario
                  imagem={typeof coment?.fotoUsuario === "string" &&
                    coment.fotoUsuario.trim() !== "" &&
                    coment.fotoUsuario !== "null"
                      ? coment.fotoUsuario.includes("http")
                        ? coment.fotoUsuario
                        : `http://localhost:8080/${coment.fotoUsuario}`
                      : "/src/assets/images/boneco.png"}
                    onClick={() => {
                    setComentarioSelecionado({
                      id: coment.id,
                      nomeUsuario: coment.nomeUsuario,
                      dataComentario: coment.dataComentario,
                      comentario: coment.comentario,
                      fotoUsuario: coment.fotoUsuario || sessionStorage.getItem("fotoPerfil"),
                      idUsuario: coment.idUsuario,
                      index
                    });
                    setModoEdicao(false);
                    setModalAberto(true);
                  }}
                />
              ))}
            </div>
            {(tipoUsuario == "AdvogadoJuridico" || tipoUsuario == "AdvogadoFisico") && (
              <div className="flex justify-center mt-4">
                <Botao
                  largura="grande"
                  cor="padrao"
                  onClick={() => {
                    setComentarioSelecionado({
                      nomeUsuario: sessionStorage.getItem("nome"),
                      dataComentario: getISOComFusoBrasil(),
                      comentario: "",
                      fotoUsuario: sessionStorage.getItem("fotoPerfil"),
                      idUsuario: sessionStorage.getItem("id"),
                      index: null
                    });
                    setModoEdicao(true);
                    setModalAberto(true);
                  }}
                >
                  <span className="flex items-center gap-2">
                    Novo Comentário <span className="text-xl">+</span>
                  </span>
                </Botao>
              </div>
            )}
          </div>

          {/* Informações + Botão Voltar */}
          <div className="lg:w-[60%] flex flex-col space-y-6 pr-2">
            <div className="max-h-[490px] overflow-y-auto flex flex-col space-y-6">
              <BlocoInformativo
                titulo="Análise com IA"
                descricao={analise}
                icone="/ai-icon.png"
                altura="h-[230px]"
              />
              <BlocoInformativo
                titulo="Movimentação"
                descricao={movimentacao}
                icone="/Scales-black.svg"
                altura="h-[230px]"
              />
            </div>
            {/* Botão Voltar centralizado abaixo dos blocos */}
            <div className="flex justify-center mt-4">
              <Botao
                cor="padrao"
                className="px-10 py-2"
                onClick={() => window.history.back()}
              >
                Voltar
              </Botao>
            </div>
          </div>
        </div>

        <ModalComentario
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          onSalvar={handleSalvar}
          onExcluir={handleExcluir}
          comentario={comentarioSelecionado}
          modoEdicao={modoEdicao}
          setModoEdicao={setModoEdicao}
        />
      </div>
    </div>
  );
}