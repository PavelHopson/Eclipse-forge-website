/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0A0A0A',
        panel: '#121212',
        accent: '#FF6A00',
        ember: '#FF8A3D',
        steel: '#94A3B8',
        frost: '#76C7FF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255, 106, 0, 0.18), 0 24px 80px rgba(255, 106, 0, 0.14)',
        soft: '0 18px 60px rgba(0, 0, 0, 0.35)',
        panel: '0 32px 90px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255,255,255,0.04)',
        frost: '0 0 0 1px rgba(118, 199, 255, 0.14), 0 22px 70px rgba(118, 199, 255, 0.08)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
