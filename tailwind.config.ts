import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Beblessed.io inspired Pastel Palette (Strictly NO Teal)
        bg: {
          DEFAULT: "#FBFAFF",
          subtle: "#F5F3FC",
        },
        lavender: {
          DEFAULT: "#D9CCF2",
          light: "#EFEAFF",
          soft: "#F6F2FF",
          border: "#C7B5EC",
          dark: "#B8A2DC",
        },
        periwinkle: {
          DEFAULT: "#B8C9F5",
          light: "#E3EAFF",
          soft: "#F1F5FF",
          border: "#9FB7EF",
          dark: "#8EA9E6",
        },
        babyPink: {
          DEFAULT: "#F9C9DC",
          light: "#FDEBF2",
          soft: "#FFF4F8",
          border: "#F3AFCA",
          dark: "#E896B7",
        },
        peach: {
          DEFAULT: "#FFD3B8",
          light: "#FFEFE5",
          soft: "#FFF7F2",
          border: "#FFBE99",
          dark: "#EFA983",
        },
        mint: {
          DEFAULT: "#CFF1E0",
          light: "#EDFAF3",
          soft: "#F6FDF9",
          border: "#B2E6CB",
          dark: "#98D9B7",
        },
        butterYellow: {
          DEFAULT: "#FFE9A8",
          light: "#FFF8DC",
          soft: "#FFFAEA",
          border: "#FFDE7D",
          dark: "#EFC856",
        },
        deepInk: {
          DEFAULT: "#2E2A4F", // Strong readable heading/button ink
          hover: "#1F1C36",
          muted: "#5A5480",
          light: "#7B75A2",
          border: "#3F3A66",
        },
        bodyText: {
          DEFAULT: "#4A4668",
          muted: "#6B668B",
          subtle: "#8D88AB",
        },

        // Aliases to seamlessly overwrite previous palette without breaking existing classes
        primary: {
          DEFAULT: "#2E2A4F", // Deep ink primary button
          hover: "#1F1C36",
          light: "#B8C9F5",
          soft: "#E2EAFF",
        },
        deepTeal: {
          DEFAULT: "#2E2A4F", // Mapped to Deep Ink
          muted: "#5A5480",
          light: "#7B75A2",
          dark: "#1F1C36",
        },
        cream: {
          DEFAULT: "#FBFAFF",
          surface: "#FFFFFF",
          subtle: "#F5F3FC",
          dark: "#EDEAF7",
        },
        coralPeach: {
          DEFAULT: "#FFD3B8", // Mapped to Peach
          hover: "#FFBE99",
          light: "#FFEFE5",
          dark: "#EFA983",
          soft: "#FFF7F2",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-fraunces)",
          "Fraunces",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "Plus Jakarta Sans",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        handwriting: [
          "var(--font-caveat)",
          "Caveat",
          "cursive",
        ],
        display: [
          "var(--font-fraunces)",
          "Fraunces",
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        "soft-sm": "0 2px 8px rgba(46, 42, 79, 0.04)",
        "soft-md": "0 8px 24px rgba(46, 42, 79, 0.06)",
        "soft-lg": "0 16px 36px rgba(46, 42, 79, 0.08)",
        "soft-xl": "0 24px 48px -12px rgba(46, 42, 79, 0.12)",
        "pill": "0 4px 14px rgba(46, 42, 79, 0.08)",
        "pill-hover": "0 8px 20px rgba(46, 42, 79, 0.12)",
        "glass": "inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 12px 30px rgba(46, 42, 79, 0.06)",
        "hero-card": "inset 0 1px 2px rgba(255, 255, 255, 0.95), 0 24px 50px rgba(46, 42, 79, 0.07)",
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      animation: {
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        "float-slow": "floatGentle 8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "bounce-subtle": "bounceSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
