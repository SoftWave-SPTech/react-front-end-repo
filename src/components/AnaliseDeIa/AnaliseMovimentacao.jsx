import React, { useEffect, useState } from "react";
import ComentarioAdvogado from "../Ui/ComentarioAdvogado";
import BlocoInformativo from "../Ui/BlocoInformativo";
import Botao from "../../components/Ui/Botao";
import BarraTitulo from "../../components/Ui/BarraTitulo";
import ModalComentario from "../Ui/ModalComentario";
import { api } from "../../service/api";
import { useParams } from "react-router-dom";

export default function AnaliseMovimentacao() {

  const [comentarios, setComentarios] = useState([
  ]);

  const { movimentacaoId } = useParams();
  const { processoId } = useParams();
  const TOKEN = sessionStorage.getItem("token");
  const tipoUsuario = sessionStorage.getItem("tipoUsuario");
  const [modalAberto, setModalAberto] = useState(false);
  const [comentarioSelecionado, setComentarioSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  const [analise, setAnalise] = useState("");
  const [movimentacao, setMovimentacao] = useState("");

  useEffect(() => {
      api.get(`/analise-processo/por-movimentacao/${movimentacaoId}`, {
        headers: { Authorization: TOKEN }
      }).then((response)=> {
        console.log(response.data);
        const analiseIA = response.data.resumoIA || "Análise não disponível no momento.";
        const movimentacaoAtual = response.data.movimentacoes.movimento || "Movimentação não disponível no momento.";
        setAnalise(analiseIA);
        setMovimentacao(movimentacaoAtual);
      }).catch((error) => {
        console.error("Erro ao buscar análise e movimentação:", error);
        setAnalise("Análise não disponível no momento.");
        setMovimentacao("Movimentação não disponível no momento.");
      });


      api.get(`/comentarios-processos/buscar-por-ultima-movimentacao/${movimentacaoId}`,{
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


  function formatarData(dataISO) {
    if (!dataISO) return "";
    const data = new Date(dataISO);
    const dia = data.getDate().toString().padStart(2, "0");
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");
    return `${dia} ${mes} ${ano}, ${horas}:${minutos}`;
  }

  const handleSalvar = (texto, index = null) => {
    const novoComentario = {
      nomeUsuario: "Cristhian Lauriano",
      dataComentario: new Date().toISOString(),
      comentario: texto,
      fotoUsuario: "/icons/avatar1.jpg",
    };

    if (index !== null) {
      const atualizados = [...comentarios];
      atualizados[index] = novoComentario;
      setComentarios(atualizados);
    } else {
      setComentarios([...comentarios, novoComentario]);
    }

    setModalAberto(false);
    setComentarioSelecionado(null);
    setModoEdicao(false);
  };

  const handleExcluir = (index) => {
  if (index !== null) {
    const novaLista = [...comentarios];
    novaLista.splice(index, 1);
    setComentarios(novaLista);
    setModalAberto(false);
    setComentarioSelecionado(null);
    setModoEdicao(false);
  }
};
  return (
    <div className="w-full min-h-screen bg-[#E5EDFA] px-5 py-7">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex justify-center">
          <BarraTitulo className="justify-center">
            Atualizações 01-04-2025
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
                  imagem={"http://localhost:8080/" + coment.fotoUsuario}
                  onClick={() => {
                    setComentarioSelecionado({ ...coment, index });
                    setModoEdicao(false);
                    setModalAberto(true);
                  }}
                />
              ))}
            </div>
          { (tipoUsuario == "AdvogadoJuridico" || tipoUsuario == "AdvogadoFisico" ) && (
            <div className="flex justify-center mt-4">
              
              <Botao
                
                largura="grande"
                cor="padrao"
                onClick={() => {
                  setComentarioSelecionado(null);
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
