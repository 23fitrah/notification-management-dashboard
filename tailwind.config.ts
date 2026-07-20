import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf3",
          100: "#d7f5e2",
          200: "#aeeac8",
          300: "#7cd9ab",
          400: "#4ec78f",
          500: "#3cb878", // primary accent (matches reference design)
          600: "#2ea267",
          700: "#25835399",
          800: "#1f6a45",
          900: "#1a5739",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 30px 60px -15px rgba(20, 60, 40, 0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
