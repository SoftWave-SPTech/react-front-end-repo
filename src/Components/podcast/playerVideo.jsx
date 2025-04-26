import React from 'react';
import './playerVideo.css'; // Opcional: para estilização

const PlayerVideo = () => {
    return (
        <div>
            <iframe 
            width="100%" 
            height="400" 
            src="https://www.youtube.com/embed/FKxMgYDEwjA" 
            title="⚖️ Futuro da Advocacia: Mudanças, Desafios e Oportunidades | Lauriano e Leão Cast #3" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <span className='player-text'>⚖️ Futuro da Advocacia: Mudanças, Desafios e Oportunidades | Lauriano e Leão Cast #3</span>
        </div>
    );
};

export default PlayerVideo;