import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
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
          "10": "#FFFFFF",
          "20": "#F4F4F4",
          "30": "#DDDDDD",
          "40": "#CCCCCC",
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    /* VVV SAYA SUDAH MENGHAPUS BLOK 'EXTEND' KEDUA YANG DUPLIKAT DARI SINI VVV
    */
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
