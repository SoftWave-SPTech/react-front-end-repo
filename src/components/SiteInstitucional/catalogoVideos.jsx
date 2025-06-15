import React, { useEffect, useState } from "react";
import "../../estilos/catalogoVideos.css"; // Crie um arquivo CSS para estilizar o componente

const API_KEY = "AIzaSyA6nQ2oCiJP5x6jNHewGHKJYpKRBV2Nok8"; // Substitua pela sua chave de API do YouTube
const CHANNEL_ID = "UCaqPFDHprzt6pUNBjyda87Q"; // Substitua pelo ID do canal que deseja exibir
const MAX_RESULTS = 10; // Quantidade de vídeos exibidos

const CatalogoVideos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const carregarVideos = async () => {
            try {
                // 1º Passo: Obter o ID da Playlist de Uploads do Canal
                const urlChannel = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`;
                const resChannel = await fetch(urlChannel);
                const dataChannel = await resChannel.json();
                const uploadPlaylistId =
                    dataChannel.items[0].contentDetails.relatedPlaylists.uploads;

                // 2º Passo: Obter os vídeos da Playlist de Uploads
                const urlVideos = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${uploadPlaylistId}&key=${API_KEY}`;
                const resVideos = await fetch(urlVideos);
                const dataVideos = await resVideos.json();

                // Reverso para exibir os mais recentes primeiro
                setVideos(dataVideos.items.reverse());
            } catch (error) {
                console.error("Erro ao carregar vídeos:", error);
            }
        };

        carregarVideos();
    }, []);

    return (
        <div className="catalogo-videos">
            <h3>Episódios</h3>
            <div className="videos-container">
                {videos.map((video) => {
                    const videoId = video.snippet.resourceId.videoId;
                    const titulo = video.snippet.title;

                    return (
                        <div key={videoId} className="video-block">
                            <h3>{titulo}</h3>
                            <iframe
                                width="100%"
                                height="100"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                frameBorder="0"
                                allowFullScreen="false"
                                title={titulo}
                            ></iframe>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CatalogoVideos;