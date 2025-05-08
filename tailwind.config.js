/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  // ...
  plugins: [require('tailwindcss-primeui')],
  theme: {
    extend: {
      colors: {
        // Assurez-vous que cette couleur est solide
        'brand-primary': '#2D3748', // Exemple: un gris foncé solide
        'brand-secondary': '#4A5568',
        'brand-accent': '#DD6B20', // Exemple: un orange
        'brand-light': '#F7FAFC',
        'brand-dark': '#1A202C',
      },
    },
  },
  colors: {
    // Suggestion de palettes (à choisir ou adapter)
    // Palette 1: Bleu Profond & Corail (Créativité & Professionnalisme)
    'brand-primary': '#0A2463', // Bleu profond
    'brand-secondary': '#3E92CC', // Bleu plus clair
    'brand-accent': '#FF674D', // Corail
    'brand-light': '#F8F9FA', // Gris très clair / Blanc cassé
    'brand-dark': '#212529', // Gris foncé pour texte

    // Palette 2: Dégradé Violet/Bleu & Vert Citron (Modernité & Technologie)
    // 'tech-primary': '#6D28D9', // Violet
    // 'tech-secondary': '#2563EB', // Bleu
    // 'tech-accent': '#A3E635',  // Vert Citron
    // 'tech-light': '#EFF6FF',
    // 'tech-dark': '#1E293B',

    // Palette 3: Vert Forêt & Tons Terreux (Chaleur & Fiabilité)
    // 'nature-primary': '#1A4314', // Vert Forêt
    // 'nature-secondary': '#C5D8A4', // Vert clair
    // 'nature-accent': '#F4A261',  // Jaune Moutarde / Orange clair
    // 'nature-light': '#FDF6EC',
    // 'nature-dark': '#2A2B2A',
  },
  fontFamily: {
    // Exemple de polices (assurez-vous de les importer via @font-face ou un CDN)
    sans: ['"Inter"', 'sans-serif'], // Police moderne et lisible
    // mono: ['"Fira Code"', 'monospace'], // Pour du code si besoin
  },
};
