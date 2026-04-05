/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0A0A0A',
        panel: '#121212',
        void: '#050505',
        chrome: '#D7DCE3',
        accent: '#FF6A00',
        ember: '#FF8A3D',
        steel: '#94A3B8',
        frost: '#76C7FF',
      },
      fontFamily: {
        display: ['"Onest"', 'sans-serif'],
        body: ['"Onest"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255, 106, 0, 0.12), 0 16px 54px rgba(255, 106, 0, 0.1)',
        soft: '0 18px 54px rgba(0, 0, 0, 0.32)',
        panel: '0 30px 90px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255,255,255,0.035)',
        frost: '0 0 0 1px rgba(118, 199, 255, 0.12), 0 18px 52px rgba(118, 199, 255, 0.07)',
        monolith: '0 40px 110px rgba(0, 0, 0, 0.56), inset 0 1px 0 rgba(255,255,255,0.045)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
