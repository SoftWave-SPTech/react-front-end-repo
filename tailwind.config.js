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
        azulClaro: '#0A307E',
      },
    },
  },
  plugins: [],
};
