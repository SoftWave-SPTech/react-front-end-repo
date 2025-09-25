import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
     <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap" rel="stylesheet" />
    <App />
  </StrictMode>,
)