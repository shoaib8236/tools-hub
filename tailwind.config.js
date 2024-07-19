/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add your content paths here
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0E46A3",
        secondary: "#95D2B3",
        dark: {
          "background-primary": "#171717",
          "background-secondary": "#212121",
          "heading-primary": "#F1F5F9",
          "heading-secondary": "#F1F5F9",
          "text-primary": "#F1F5F9",
          "text-secondary": "#999999",
          "border-primary": "#4D4D4D",
          "border-secondary": "#4D4D4D",
        },
        light: {
          background: "#FFFFFF",
          text: "#111827",
        },
      },
      borderColor: {
        primary: "#d4d4d4",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Menlo", "monospace"],
      },
    },
    screens: {
      xs: "368px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1024px",
      "2xl": "1280px",
    },
  },
  plugins: [],
};
