/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          base: "#FFFFFF",
          light: "#DDDDDD",
          dark: "#CCCCCC",
        },
        blue: {
          primary: "#0F2771",
          dark: "#0C1F5A",
          light: "#3251AD",
          extraLight: "#4285F4",
        },
        orange: {
          secondary: "#FF7028",
          dark: "#E94235",
        },
        black: "#0B0B0B",
        green: "#34A853",
        yellow: "#FABB05",
        gray: {
          base: "#808080",
          dark: "#5B5B5B",
          extraDark: "#323232",
        },
      },
    },
  },
  plugins: [],
};
