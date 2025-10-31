/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'main-color':'#FFF',
      'second-color': '#1126b0ff',
      'font-color': '#1126b0ff',
      'light-font-color': '#8F8694',
      'error-color': '#FF5050'
    },
    extend: {},
  },
  plugins: [],
}
