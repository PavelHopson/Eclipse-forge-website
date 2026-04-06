/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#030303',
        panel: '#080808',
        void: '#010101',
        accent: '#FF6A00',
        ember: '#FF8A3D',
        frost: '#76C7FF',
      },
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 8vw, 6.5rem)',
        'section': 'clamp(2rem, 4vw, 3.6rem)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'float-slow': 'float 30s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(30px, -20px)' },
          '66%': { transform: 'translate(-20px, 15px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
