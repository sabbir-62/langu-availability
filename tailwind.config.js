/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        header: "#FFFFFF",
        "header-hover": "#2a3f55",
        primary: { teal: "#2bbcb3", dark: "#1a8a83" },
        sidebar: "#2c2c2e",
        "text-main": "#2D2D2D",
        "text-muted": "#7f8c8d",
        "footer-bg": "#3b3b3d",
        "footer-dark": "#2c2c2e",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
