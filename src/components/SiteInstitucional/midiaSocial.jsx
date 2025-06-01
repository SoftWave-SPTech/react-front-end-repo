import React from 'react';

const MidiaSocial = () => {
    return (
        <div className="flex justify-center items-center gap-5 p-5 bg-azulEscuroForte rounded-lg shadow-lg flex-wrap">
            <div className="flex flex-col items-center justify-center bg-azulEscuroForte border-2 border-dourado rounded-lg p-2 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <p className="font-bold text-white mb-1">Ouça agora</p>
                <img src="./spotify.svg" alt="Spotify" className="w-1/4 h-auto" />
            </div>
            <div className="flex flex-col items-center justify-center bg-azulEscuroForte border-2 border-dourado rounded-lg p-2 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <p className="font-bold text-white mb-1">Assista agora</p>
                <img src="./youtube.svg" alt="YouTube" className="w-1/4 h-auto" />
            </div>
        </div>
    );
};

export default MidiaSocial;