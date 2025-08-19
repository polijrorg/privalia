/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      textColor: {
        DEFAULT: 'white',
      },
      colors: {
        primary: '#9372DA', // roxo
        primaryDark: '#9372da1a',
        secondary: '#808A95', // cinza
        backgroundPattern: '#141414', // branco
        backgroundPattern2: '#262626', // cinza
        foregroundPattern: '#1A1A1A', // cinza
        borderPattern: '#2B2B2B', // cinza
        success: '#23D365', // verde
      },
    },
  },
  plugins: [],
};
