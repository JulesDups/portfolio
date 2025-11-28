/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Au cas où src est ajouté plus tard
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#2D3748",
        "brand-secondary": "#4A5568",
        "brand-accent": "#DD6B20",
        "brand-light": "#F7FAFC",
        "brand-dark": "#1A202C",
      },
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
