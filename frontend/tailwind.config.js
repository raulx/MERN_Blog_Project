/** @type {import('tailwindcss').Config} */
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
      gridTemplateRows: {
        8: "repeat(8, minmax(0, 1fr))",
        10: "repeat(10,minmax(0,1fr))",
        13: "repeat(13,minmax(0,1fr))",
      },
    },
  },
  plugins: [],
};
