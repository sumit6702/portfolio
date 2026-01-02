import type { Config } from "tailwindcss";
import { colors, nextui } from "@nextui-org/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcol_dark: "#333333",
        warm_light: "#F5F5F5",
        main_text: "#52b788",
      },
      fontFamily: {
        header: ['var(--font-main)', 'serif'],
        body: ['var(--font-certia)', 'sans-serif'],
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            background: "#151515",
          },
        },
        light: {
          colors: {
            background: "#ffffff",
          },
        },
      },
    }),
  ],
} satisfies Config;
