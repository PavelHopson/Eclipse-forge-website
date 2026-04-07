/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#05070A',
        panel: '#0B0F14',
        card: '#11161C',
        void: '#020304',
        accent: '#A7B4C2',
        glow: '#DCE6F2',
        muted: '#9DA7B3',
        border: '#1C232B',
      },
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.8rem, 7vw, 6.5rem)',
        'section': 'clamp(2rem, 4vw, 3.6rem)',
      },
      animation: {
        'float': 'float 25s ease-in-out infinite',
        'float-slow': 'float 35s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'eclipse-glow': 'eclipseGlow 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(20px, -15px)' },
          '66%': { transform: 'translate(-15px, 10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        eclipseGlow: {
          '0%, 100%': { boxShadow: '0 0 60px rgba(220,230,242,0.06)' },
          '50%': { boxShadow: '0 0 90px rgba(220,230,242,0.12)' },
        },
      },
    },
  },
  plugins: [],
};
