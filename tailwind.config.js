/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './src/components/pages/Welcome.jsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        code: ['Source Code Pro', 'monospace'],
        code2: ['Play', 'sans-serif'],
      },
    },
    textColor: {
      'primary': '#5BC288',
      'secondary': '#C37BB6',
      'yellow': '#FFD130',
      'orange': '#CD866F',
      'db': '#7fc9e9'
    },
  },
  plugins: [],
}

