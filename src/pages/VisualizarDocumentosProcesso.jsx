import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import BarraTitulo from '../components/Ui/BarraTitulo';
import BotaoAdicionar from '../components/Ui/BotaoAdicionarCircular';
import ModalUpload from '../components/Ui/ModalUpload';
import CardDocumento from '../components/Ui/CardDocumento';
import ModalConfirmacao from '../components/Ui/ModalConfirmacao';
import { api } from '../service/api';
import { useParams, useNavigate } from 'react-router-dom';


export default function VisualizarDocumentosProcesso() {
  const [documentos, setDocumentos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [modalExcluir, setModalExcluir] = useState({ aberto: false, index: null });
  const TOKEN = `Bearer ${sessionStorage.getItem('token')}`;
  const { idProcesso } = useParams();
  const navigate = useNavigate();

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  useEffect(() => {
    api.get(`/documentos-processos/processo/${idProcesso}`, {
      headers: {
        "Authorization":  TOKEN
      }
      })
      .then(response => {
      console.log("Upload realizado com sucesso:", response.data);
      setDocumentos(response.data)
      })
      .catch(error => {
      console.error("Erro ao enviar o arquivo:", error);
    });

  }, []);

  const adicionarDocumento = (novoDoc) => {
    setDocumentos([...documentos, novoDoc]);
    
    const formData = new FormData();
    formData.append("nomeArquivo", novoDoc.nome);
    formData.append("documentoProcesso", novoDoc.file);
    formData.append("idProcesso", idProcesso)
    
    api.post("/documentos-processos", formData, {
            headers: {
                "Authorization":  TOKEN
            }
            })
            .then(response => {
            console.log("Upload realizado com sucesso:", response.data);
            window.location.reload()
            })
            .catch(error => {
            console.error("Erro ao enviar o arquivo:", error);
            });

    fecharModal();
  };

  const excluirDocumento = () => {
    const novaLista = documentos.filter((_, i) => i !== modalExcluir.index);
    setDocumentos(novaLista);

    api.delete(`/documentos-processos/${modalExcluir.id}`, {
      headers: {
        "Authorization":  TOKEN
      }
    })
    .then(response => {
      console.log("Documento Deletado com sucesso");
    })
    .catch(error => {
      console.error("Erro ao enviar o arquivo:", error);
    });

    setModalExcluir({ aberto: false, index: null, id: null });
  };

  const confirmarExclusao = (id, index) => {
    setModalExcluir({ aberto: true, index, id });
  };

  const cancelarExclusao = () => {
    setModalExcluir({ aberto: false, index: null, id: null });
  };

  console.log(documentos);

  const documentosFiltrados = documentos.filter((doc) =>
    doc.nomeArquivo?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <LayoutBase tipoMenu="advogado">
      Seu conteúdo aqui
    </LayoutBase>
  );
};

export default VisualizarDocumentosProcesso;
