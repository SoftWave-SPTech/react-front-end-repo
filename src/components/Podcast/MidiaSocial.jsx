import React from 'react';

const MidiaSocial = () => {
    return (
        <div className="flex justify-center items-center gap-[2rem] p-[2rem] bg-azulEscuroForte rounded-lg shadow-lg flex-wrap" style={{ minHeight: '50%' }}>
            <div
                className="flex flex-col items-center justify-center bg-azulEscuroForte border-2 border-white rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                style={{ width: '16rem', height: '10rem', padding: '1.5rem' }} // Aumentando largura e altura
            >
                <p className="font-bold text-white mb-[0.75rem] text-center" style={{ fontSize: '1.5rem' }}> {/* Aumentando o tamanho da fonte */}
                    Ouça agora
                </p>
                <img src="./spotify.svg" alt="Spotify" style={{ width: '4rem', height: '4rem' }} /> {/* Aumentando o tamanho do ícone */}
            </div>

            <div
                className="flex flex-col items-center justify-center bg-azulEscuroForte border-2 border-white rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                style={{ width: '16rem', height: '10rem', padding: '1.5rem' }} // Aumentando largura e altura
            >
                <p className="font-bold text-white mb-[0.75rem] text-center" style={{ fontSize: '1.5rem' }}> {/* Aumentando o tamanho da fonte */}
                    Assista agora
                </p>
                <img src="./youtube.svg" alt="YouTube" style={{ width: '4rem', height: '4rem' }} /> {/* Aumentando o tamanho do ícone */}
            </div>
        </div>
    );
};

export default MidiaSocial;