/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "base-color": "#F6EEEA",
        "lighter-base-color": "#FBF6F4",
        "darker-base-color": "#E6D6CF",
      },
    },
  },
  plugins: [],
};
