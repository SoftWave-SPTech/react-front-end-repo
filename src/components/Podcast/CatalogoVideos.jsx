import React, { useEffect, useState } from "react";
import AlertStyle from '../Ui/AlertStyle';

const API_KEY = "AIzaSyA6nQ2oCiJP5x6jNHewGHKJYpKRBV2Nok8";
const CHANNEL_ID = "UCaqPFDHprzt6pUNBjyda87Q";
const MAX_RESULTS = 10;

const CatalogoVideos = () => {
    const [videos, setVideos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const VISIBLE_COUNT = 3;
    const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });

    useEffect(() => {
        const carregarVideos = async () => {
            try {
                const urlChannel = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`;
                const resChannel = await fetch(urlChannel);
                const dataChannel = await resChannel.json();
                const uploadPlaylistId = dataChannel.items[0].contentDetails.relatedPlaylists.uploads;

                const urlVideos = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${uploadPlaylistId}&key=${API_KEY}`;
                const resVideos = await fetch(urlVideos);
                const dataVideos = await resVideos.json();

                setVideos(dataVideos.items.reverse());
            } catch (error) {
                console.error("Erro ao carregar vídeos:", error.status);
                if(error.status >= 500){
                    setAlert({ show: true, message: "O serviço não está disponível! Por favor, contate o nosso suporte para que possamos ajudá-lo!", type: "error" })
                }else{
                    setAlert({ show: true, message: error.response.data.message, type: "error" })
                }
            }
        };

        carregarVideos();
    }, []);

    const showPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const showNext = () => {
        if (currentIndex + VISIBLE_COUNT < videos.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const visibleVideos = videos.slice(currentIndex, currentIndex + VISIBLE_COUNT);

    return (
        <div className="p-5 bg-azulEscuroFraco rounded-lg shadow-lg w-full">

            {alert && (
                <AlertStyle
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            <div className="flex items-center justify-center gap-4">
                {/* Seta esquerda */}
                <button
                    onClick={showPrev}
                    disabled={currentIndex === 0}
                    className="text-white text-3xl px-4 py-2 hover:text-dourado disabled:opacity-30"
                >
                    {"<"}
                </button>

                {/* Vídeos */}
                <div className="flex gap-4 w-full justify-center">
                    {visibleVideos.map((video) => {
                        const videoId = video.snippet.resourceId.videoId;
                        const titulo = video.snippet.title;

                        return (
                            <div key={videoId} className="bg-azulEscuroFraco border border-black rounded-lg shadow-md w-1/3 p-2">
                                <h3 className="text-white text-center text-sm mb-2 line-clamp-2">{titulo}</h3>
                                <iframe
                                    className="w-full h-32 rounded-lg"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    frameBorder="0"
                                    allowFullScreen
                                    title={titulo}
                                ></iframe>
                            </div>
                        );
                    })}
                </div>

                {/* Seta direita */}
                <button
                    onClick={showNext}
                    disabled={currentIndex + VISIBLE_COUNT >= videos.length}
                    className="text-white text-3xl px-4 py-2 hover:text-dourado disabled:opacity-30"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default CatalogoVideos;