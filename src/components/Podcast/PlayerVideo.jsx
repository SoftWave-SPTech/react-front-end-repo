import React from 'react';

const PlayerVideo = () => {
    return (
        <div className="flex flex-col items-center w-full h-full">
            <iframe 
                className="w-full h-[60vh] rounded-lg shadow-lg" // Aumentado para 80% da altura da viewport
                src="https://www.youtube.com/embed/FKxMgYDEwjA"
                title="⚖️ Futuro da Advocacia: Mudanças, Desafios e Oportunidades | Lauriano e Leão Cast #3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            <span className="text-white text-xl underline mt-2 text-center">
                ⚖️ Futuro da Advocacia: Mudanças, Desafios e Oportunidades | Lauriano e Leão Cast #3
            </span>
        </div>
    );
};

export default PlayerVideo;