/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      }, 
      backgroundImage: theme => ({
        'night-sky': 'linear-gradient(to right, #000c40, #203a43, #2c5364)',
      })
    }
  },
  plugins: [],
};
