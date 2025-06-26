import React from 'react';
import '../../estilos/midiaSocial.css'; // Opcional: para estilização

const MidiaSocial = () => {
    const youtube = () => {
        window.location.href = "https://www.youtube.com/@LaurianoLeao";
      };
      const spotify = () => {
        window.location.href = "https://open.spotify.com/show/4YWMK1m3VYHfOy3Khwp00A?si=KhzaCmQkQVSPygNMbLKdug";
      };
    return (
        <div className="flex justify-center items-center gap-5 p-5 bg-azulEscuroForte rounded-lg shadow-lg flex-wrap">
            <div className="flex flex-col items-center justify-center bg-azulEscuroForte rounded-lg p-2 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer hover:border-2 hover:border-dourado" onClick={spotify}>
                <p className="font-bold text-white mb-1">Ouça agora</p>
                <img src="./spotify.svg" alt="Spotify" className="w-1/4 h-auto" />
            </div>
            <div className="flex flex-col items-center justify-center bg-azulEscuroForte rounded-lg p-2 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer hover:border-2 hover:border-dourado" onClick={youtube}>
                <p className="font-bold text-white mb-1">Assista agora</p>
                <img src="./youtube.svg" alt="YouTube" className="w-1/4 h-auto" />
            </div>
        </div>
    );
};

export default MidiaSocial