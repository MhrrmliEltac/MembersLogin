/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        sofiasans: ["Sofia Sans", "serif"],
        montserratalternates:["Montserrat Alternates", "sans-serif"]
      },
    },
  },
  plugins: [],
};