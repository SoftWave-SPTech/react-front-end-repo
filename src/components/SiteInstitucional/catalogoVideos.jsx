import React, { useEffect, useState } from "react";

const API_KEY = "AIzaSyA6nQ2oCiJP5x6jNHewGHKJYpKRBV2Nok8"; 
const CHANNEL_ID = "UCaqPFDHprzt6pUNBjyda87Q"; 
const MAX_RESULTS = 10; 

const CatalogoVideos = () => {
    const [videos, setVideos] = useState([]);

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
                console.error("Erro ao carregar vídeos:", error);
            }
        };

        carregarVideos();
    }, []);

    return (
        <div className="p-5 max-w-md mx-auto bg-azulEscuroForte border-2 border-gray-600 rounded-lg shadow-lg">
            <h3 className="text-center text-dourado mb-5 text-xl font-bold">EPISÓDIOS</h3>
            <div className="flex flex-col gap-5 max-h-[400px] overflow-y-auto p-2 bg-azulEscuroFraco">
                {videos.slice(0, 3).map((video) => {
                    const videoId = video.snippet.resourceId.videoId;
                    const titulo = video.snippet.title;

                    return (
                        <div key={videoId} className="bg-azulEscuroFraco border border-black rounded-lg p-3 shadow-md">
                            <h3 className="text-white text-center text-sm mb-2">{titulo}</h3>
                            <iframe
                                className="w-full h-32 rounded-lg"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                frameBorder="0"
                                allowFullScreen={false}
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