import React from 'react';

const PlayerVideo = () => {
    return (
        <div className="flex flex-col items-center">
            <iframe 
                className="w-full h-96 rounded-lg shadow-lg" 
                src="https://www.youtube.com/embed/FKxMgYDEwjA" 
                title="⚖️ Futuro da Advocacia: Mudanças, Desafios e Oportunidades | Lauriano e Leão Cast #3" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
            ></iframe>
            <span className="text-dourado text-center text-lg underline mt-2">
                ⚖️ Futuro da Advocacia: Mudanças, Desafios e Oportunidades | Lauriano e Leão Cast #3
            </span>
        </div>
    );
};

export default PlayerVideo;