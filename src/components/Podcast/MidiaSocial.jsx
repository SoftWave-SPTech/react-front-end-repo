import React from 'react';

const MidiaSocial = () => {
    const youtube = () => {
        window.location.href = "https://www.youtube.com/@LaurianoLeao";
      };
      const spotify = () => {
        window.location.href = "https://open.spotify.com/show/4YWMK1m3VYHfOy3Khwp00A?si=KhzaCmQkQVSPygNMbLKdug";
      };
    return (
        <div className="flex justify-center items-center gap-[2rem] pl-[2.5rem] bg-transparent rounded-lg shadow-lg flex-wrap" style={{ minHeight: '50%' }}>
            <div
                className="flex flex-col items-center justify-center bg-azulEscuroForte border-2 border-white rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                style={{ width: '14rem', height: '8rem', padding: '1.5rem' }} // Aumentando largura e altura
                onClick={spotify}
            >
                <p className="font-bold text-white mb-[0.75rem] text-center" style={{ fontSize: '1.5rem' }}> {/* Aumentando o tamanho da fonte */}
                    Ouça agora
                </p>
                <img src="./spotify.svg" alt="Spotify" style={{ width: '4rem', height: '4rem' }} /> {/* Aumentando o tamanho do ícone */}
            </div>

            <div
                className="flex flex-col items-center justify-center bg-azulEscuroForte border-2 border-white rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                style={{ width: '14rem', height: '8rem', padding: '1.5rem', paddingTop: '1.5rem' }} // Aumentando largura e altura
                onClick={youtube}
            >
                <p className="font-bold text-white mb-[0.75rem] text-center" style={{ fontSize: '1.5rem' }}> {/* Aumentando o tamanho da fonte */}
                    Assista agora
                </p>
                <img src="./youtube.svg" alt="YouTube" style={{ width: '4rem', height: '4rem' }} /> {/* Aumentando o tamanho do ícone */}
                
            </div >

        </div>
    );
};

export default MidiaSocial;