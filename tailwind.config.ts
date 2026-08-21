import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#07111F",
          950: "#07111F",
          900: "#0D1B2A",
          800: "#142438",
          700: "#1E334D",
        },
        champagne: {
          DEFAULT: "#D6B36A",
          50: "#FAF6ED",
          100: "#F4ECDA",
          200: "#E9D9B5",
          300: "#DEC690",
          400: "#D6B36A",
          500: "#B8964E",
          600: "#94763A",
          700: "#705628",
        },
        ivory: {
          DEFAULT: "#F5F1E8",
          100: "#F8FAFC",
          200: "#F5F1E8",
          300: "#ECE8DE",
        },
        pearl: "#ECE8DE",
        slateMuted: "#AAB6C4",
        gold: {
          400: "#D6B36A",
          500: "#D6B36A",
        },
        charcoal: {
          900: "#07111F",
          800: "#0D1B2A",
          700: "#1E334D",
          400: "#AAB6C4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      borderRadius: {
        DEFAULT: "6px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        "champagne-glow": "0 0 20px rgba(214, 179, 106, 0.2)",
        "editorial-shadow": "0 8px 30px rgba(7, 17, 31, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
