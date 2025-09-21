import React from 'react';

const MidiaSocial = () => {
    const youtube = () => {
        window.location.href = "https://www.youtube.com/@LaurianoLeao";
    };
    const spotify = () => {
        window.location.href = "https://open.spotify.com/show/4YWMK1m3VYHfOy3Khwp00A?si=KhzaCmQkQVSPygNMbLKdug";
    };
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 px-2 py-2 bg-transparent rounded-lg shadow-lg w-full flex-wrap min-h-1/2">
            <div
                className="flex flex-col items-center justify-center bg-azulEscuroForte border-2 border-white rounded-lg transition-transform hover:scale-105 hover:shadow-lg cursor-pointer w-full max-w-[14rem] h-32 p-6 mb-4"
                onClick={spotify}
            >
                <p className="font-bold text-white mb-3 text-center text-xl">
                    Ouça agora
                </p>
                <img src="./spotify.svg" alt="Spotify" className="w-16 h-16" />
            </div>

            <div
                className="flex flex-col items-center justify-center bg-azulEscuroForte border-2 border-white rounded-lg transition-transform hover:scale-105 hover:shadow-lg cursor-pointer w-full max-w-[14rem] h-32 p-6 mb-4"
                onClick={youtube}
            >
                <p className="font-bold text-white mb-3 text-center text-xl">
                    Assista agora
                </p>
                <img src="./youtube.svg" alt="YouTube" className="w-16 h-16" />
            </div>
        </div>
    );
};

export default MidiaSocial;