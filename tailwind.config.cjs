/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#050505',
        panel: '#0a0a0a',
        void: '#030303',
        accent: '#FF6A00',
        ember: '#FF8A3D',
        steel: '#94A3B8',
        frost: '#76C7FF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255, 106, 0, 0.1), 0 20px 60px rgba(255, 106, 0, 0.08)',
        soft: '0 20px 60px rgba(0, 0, 0, 0.4)',
        panel: '0 30px 90px rgba(0, 0, 0, 0.5)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};