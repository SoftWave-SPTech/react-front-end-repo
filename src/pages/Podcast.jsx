import React from 'react';
import LayoutBase from '../layouts/LayoutBase';
import MidiaSocial from '../components/Podcast/midiaSocial';
import PlayerVideo from '../components/Podcast/playerVideo';
import CatalogoVideos from '../components/Podcast/catalogoVideos';

const Podcast = () => {
    return (
        <LayoutBase backgroundClass="bg-azulEscuroFraco">
            <div className="text-center p-5 mb-5">
                <h1 className="text-white text-3xl font-bold">Lauriano & Leão Cast</h1>
                <h2 className="text-white text-2xl mt-2">Episódios</h2>
            </div>
            <section className="flex flex-col md:flex-row items-stretch gap-4 px-4 pb-4 w-[95%] mx-auto mb-12">
                <div className="w-full md:w-[80%]">
                    <PlayerVideo />
                </div>
                <div className="w-full md:w-[20%] flex items-center justify-center">
                    <MidiaSocial />
                </div>
            </section>

            <CatalogoVideos />
        </LayoutBase>
    );
};

export default Podcast;
