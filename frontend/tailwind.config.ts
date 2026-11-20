import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#234B35",
          dark: "#183A2A",
          light: "#2E5F43",
          hover: "#1D412E",
        },
        deep: {
          green: "#183A2A",
        },
        cream: {
          DEFAULT: "#F8F5EC",
          light: "#FCFAF6",
          dark: "#EFE8DC",
        },
        beige: {
          DEFAULT: "#E8DDC9",
          dark: "#D4C5AA",
        },
        gold: {
          DEFAULT: "#B99A5B",
          light: "#CFB57E",
          dark: "#9E8146",
        },
        charcoal: "#292929",
        whatsapp: "#25D366",
        terracotta: "#C05621",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-dmsans)", "DM Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(35, 75, 53, 0.08)",
        card: "0 2px 10px rgba(0, 0, 0, 0.04)",
        dropdown: "0 10px 25px -5px rgba(24, 58, 42, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
