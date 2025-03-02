/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'bounce-in': 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};