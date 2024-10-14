/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        cabin: ['Cabin','sans-serif'],
        space : ['space-grotesk'],
        geologica : ['geologica'],
        
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dark": '#18191A',
        "medium": '#242526'
      },
    },
  },
  plugins: [],
};
