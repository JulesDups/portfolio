/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Palette basée sur votre sélection - Assurez-vous que ces couleurs sont bien solides
        'brand-primary': '#2D3748', // Gris foncé solide
        'brand-secondary': '#4A5568',
        'brand-accent': '#DD6B20', // Orange
        'brand-light': '#F7FAFC',
        'brand-dark': '#1A202C',
      },
      fontFamily: {
        // Assurez-vous que 'Inter' est importé (ex: via Google Fonts dans index.html)
        sans: ['"Inter"', 'sans-serif'],
      },
      // Keyframes pour l'animation douce
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' }, // Légèrement plus de décalage
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        // Classe d'animation à utiliser
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
      },
    },
  },
  // Suppression du plugin tailwindcss-primeui s'il n'est pas activement utilisé ou configuré pour v4
  // plugins: [require('tailwindcss-primeui')],
  plugins: [], // Gardez un tableau vide si aucun plugin n'est utilisé
};
