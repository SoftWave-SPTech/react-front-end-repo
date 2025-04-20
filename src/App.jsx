
import './App.css'

import React from 'react';
import SiteInstitucional from './components/siteInstitucional/siteInstitucional';
import CarroselAdvogados from './components/Carrosel/CarroselAdvogados';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerVideo from './components/podcast/playerVideo';
import MidiaSocial from './components/podcast/midiaSocial';
import CatalogoVideos from './components/podcast/catalogoVideos';

function App() {
  return (
    <>
      {<SiteInstitucional/>}
    </>
  );
}

export default App;
