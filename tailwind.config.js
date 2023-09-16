/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xl: "800px",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
}
