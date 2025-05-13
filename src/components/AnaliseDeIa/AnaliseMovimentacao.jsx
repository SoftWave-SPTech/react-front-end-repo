import React, { useState } from "react";
import ComentarioAdvogado from "../Ui/ComentarioAdvogado";
import BlocoInformativo from "../Ui/BlocoInformativo";
import Botao from "../Ui/Botao";
import BarraTitulo from "../Ui/BarraTitulo";
import ModalComentario from "../Ui/ModalComentario";

export default function AnaliseMovimentacao() {
  const descricao = `O sistema processou os autos e identificou que a parte autora pleiteia reintegração ao cargo, pagamento de verbas rescisórias, adicional de insalubridade e indenização por dano moral. 
A demissão foi qualificada como "sem justa causa". Além disso, o sistema detectou múltiplos eventos correlacionados no histórico funcional da parte autora, 
incluindo episódios de assédio moral, ausência de ergonomia no ambiente de trabalho, e falhas no fornecimento de equipamentos de proteção individual (EPI), 
fatos que corroboram para o agravamento do quadro. O relatório também identificou inconsistências nos valores pagos a título de hora extra, 
intervalo intrajornada e adicional noturno. O sistema sugere revisão dos lançamentos contábeis realizados no período de 2020 a 2023. 
Há, ainda, recomendações para a empresa adotar boas práticas de compliance e ESG, conforme previsto na norma ISO 45001. 
Por fim, recomenda-se reavaliação dos valores rescisórios e proposição de acordo extrajudicial com cláusula de confidencialidade.`;

  const [comentarios, setComentarios] = useState([
    {
      nome: "Cristhian Lauriano",
      data: "Abril 05, 2025",
      texto: "Reunião agendada para o dia 07/04/2025.",
      imagem: "/icons/avatar1.jpg",
    },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [comentarioSelecionado, setComentarioSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  const handleSalvar = (texto, index = null) => {
    const novoComentario = {
      nome: "Cristhian Lauriano",
      data: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      texto,
      imagem: "/icons/avatar1.jpg",
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
                  nome={coment.nome}
                  data={coment.data}
                  texto={coment.texto}
                  imagem={coment.imagem}
                  onClick={() => {
                    setComentarioSelecionado({ ...coment, index });
                    setModoEdicao(false);
                    setModalAberto(true);
                  }}
                />
              ))}
            </div>

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
          </div>

          {/* Informações + Botão Voltar */}
          <div className="lg:w-[60%] flex flex-col space-y-6 pr-2">
            <div className="max-h-[490px] overflow-y-auto flex flex-col space-y-6">
              <BlocoInformativo
                titulo="Análise com IA"
                descricao={descricao}
                icone="/icons/ai-icon.svg"
                altura="h-[230px]"
              />
              <BlocoInformativo
                titulo="Movimentação"
                descricao={descricao}
                icone="/icons/movimentacao-icon.svg"
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
          comentario={comentarioSelecionado}
          modoEdicao={modoEdicao}
          setModoEdicao={setModoEdicao}
        />
      </div>
    </div>
  );
}
