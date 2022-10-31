/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './src/components/pages/Welcome.jsx'
  ],
  theme: {
    screens: {
      xs: "375px",
    
    },
    extend: {
      fontFamily: {
        code: ['Source Code Pro', 'monospace'],
      },
      spacing: {
        '2/3':'66.666667%',
        '3/4': '75%',
        '4/5': '80%',
        '5/6': '83.333333%',
        '11/12': '91.666667%',
      },
    },
    textColor: {
      'primary': '#5BC288',
      'secondary': '#C37BB6',
      'yellow': '#FFD130',
      'orange': '#CD866F',
      'db': '#7fc9e9',
      'red': '#F23D41',
      'teal':'#28AD95',
      'aqua':'#28B8F9'
    },
  },
  plugins: [],
}

