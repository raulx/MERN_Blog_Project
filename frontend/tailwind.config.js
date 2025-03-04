/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      screens: {
        mobile: "360px",
        sm: "480px",
        tablet: "768px",
        md: "976px",
        xl: "1440px",
      },

      colors: {
        ["primary-color"]: "#DE3163",
        ["neutral-dark"]: "#000000",
        ["secondary-color"]: "#E4F6AB",
        ["neutral-light"]: "#FFFFFF",
      },

      fontFamily: {
        orbitron: ["Orbitron", "serif"],
        ["pota-one-regular"]: ["Potta One", "serif"],
        Poppins: ["Poppins", "serif"],
      },
    },
  },

  plugins: [tailwindScrollbar],
};
