import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"], // Pastikan mencakup semua file
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        titillium: ["var(--font-titillium-web)", "sans-serif"],
        noto: ["var(--font-noto-serif)", "serif"],
      },
      colors: {
        white: {
          10: "#FFFFFF",
          20: "#F4F4F4",
          30: "#DDDDDD",
          40: "#CCCCCC",
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
          light: "#7C7C7C",
          dark: "#5B5B5B",
          extraDark: "#323232",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
