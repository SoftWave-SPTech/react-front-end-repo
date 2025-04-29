import React from 'react';
import './midiaSocial.css'; // Opcional: para estilização

const MidiaSocial = () => {
    return (
        <div className="midia-social-container">
            <div className="midia-block">
                <p>Ouça agora</p>
                <img src="./spotify.svg" alt="" className='social-img'/>
            </div>
            <div className="midia-block">
                <p>Assista agora</p>
                <img src="./youtube.svg" alt="" className='social-img'/>
            </div>
        </div>
    );
};

export default MidiaSocial