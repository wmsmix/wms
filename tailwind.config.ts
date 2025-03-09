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
    },
  },
  plugins: [],
} satisfies Config;
