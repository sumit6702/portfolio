import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#14B8A6", // Teal
          hover: "#0D9488",
          dark: "#0F766E",
          light: "#2DD4BF",
          soft: "#99F6E4",
        },
        deepTeal: {
          DEFAULT: "#0F4C4A", // Deep Teal for headings, dark elements
          muted: "#1B6361",
          light: "#2E7C79",
          dark: "#093231",
        },
        mint: {
          DEFAULT: "#CCFBF1", // Mint for cards, soft backgrounds
          light: "#F0FDFA",
          border: "#99F6E4",
          dark: "#5EEAD4",
        },
        cream: {
          DEFAULT: "#FFF8F0", // Cream main page background
          surface: "#FFFFFF",
          subtle: "#FDF4E7",
          dark: "#F5EAD9",
        },
        coralPeach: {
          DEFAULT: "#FF8A7A", // Coral Peach accent pops & badges
          hover: "#FF7360",
          light: "#FFB5AA",
          dark: "#E55C4A",
          soft: "#FFEBE7",
        },
        butterYellow: {
          DEFAULT: "#FFE69A", // Butter Yellow decorative shapes & stickers
          hover: "#FFDE7B",
          light: "#FFF3C9",
          dark: "#F5CE59",
          soft: "#FFF9E6",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-outfit)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-fredoka)",
          "var(--font-outfit)",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        "3d-teal": "0 6px 0 #0D9488, 0 12px 20px -3px rgba(15, 76, 74, 0.2)",
        "3d-teal-sm": "0 4px 0 #0D9488, 0 8px 14px -2px rgba(15, 76, 74, 0.15)",
        "3d-teal-pressed": "0 2px 0 #0D9488, 0 4px 8px -2px rgba(15, 76, 74, 0.2)",
        "3d-coral": "0 6px 0 #E55C4A, 0 12px 20px -3px rgba(229, 92, 74, 0.25)",
        "3d-coral-sm": "0 4px 0 #E55C4A, 0 8px 14px -2px rgba(229, 92, 74, 0.2)",
        "3d-yellow": "0 6px 0 #E6B83B, 0 12px 20px -3px rgba(230, 184, 59, 0.25)",
        "3d-card": "0 10px 0 #E2E8F0, 0 20px 30px -10px rgba(15, 76, 74, 0.08)",
        "3d-card-mint": "0 8px 0 #99F6E4, 0 20px 30px -10px rgba(15, 76, 74, 0.09)",
        "3d-card-hover": "0 14px 0 #99F6E4, 0 28px 40px -12px rgba(15, 76, 74, 0.14)",
        "clay": "inset 0 2px 4px rgba(255, 255, 255, 0.8), inset 0 -3px 6px rgba(15, 76, 74, 0.08), 0 10px 20px -5px rgba(15, 76, 74, 0.08)",
        "clay-hover": "inset 0 3px 6px rgba(255, 255, 255, 0.9), inset 0 -4px 8px rgba(15, 76, 74, 0.12), 0 16px 28px -6px rgba(15, 76, 74, 0.12)",
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4.5s ease-in-out infinite reverse",
        "float-fast": "float 3s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "wiggle": "wiggle 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
