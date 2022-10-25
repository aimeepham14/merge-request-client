/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './src/components/pages/Welcome.jsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        code: ['Source Code Pro', 'monospace'],
      },
    },
    textColor: {
      'primary': '#5BC288',
      'secondary': '#C37BB6',
      'background': '#2C2C2D'
    },
  },
  plugins: [],
}

