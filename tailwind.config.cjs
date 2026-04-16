/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#05070A',
        panel: '#080C12',
        card: '#0D1218',
        void: '#020304',
        accent: '#6BA3FF',
        'accent-dim': '#4A7FD4',
        glow: '#9DC4FF',
        muted: '#B0BEC9',
        border: '#1A2230',
        live: '#4AE6A0',
        'accent-warm': '#F5A623',
        'accent-warm-dim': '#D4901E',
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
      },
    },
  },
  plugins: [],
};
