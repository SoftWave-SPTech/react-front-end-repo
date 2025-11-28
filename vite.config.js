import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite que o servidor rode no IP 0.0.0.0
    port: 5173, // Porta de desenvolvimento
  },
  preview: {
    host: '0.0.0.0',
    port: 3000, // Porta de produção preview
  },
})