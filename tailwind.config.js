/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      colors: {
        dourado: '#D9BB62',
        branco: '#FFFFFF',
        preto: '#000000',
        azulEscuroForte: 'rgb(1, 13, 38)',
        azulEscuroFraco: '#020E29',
        AzulEscuro: '#010D26',
        azulClaro: '#0F2A5E',
        AzulPodcast: '#081A40',
        cinzaAzulado: '#F4F4F4',
        vermelhoToggle: "#BE0200",
        verdeToggle: "#1BD660",
        azulMenu: "#AAD6ED"
      },
    },
  },
plugins: [],
};
