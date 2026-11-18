import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#174D35",
        deep: "#103B2A",
        nature: "#3C8D5A",
        sage: "#A8C5A0",
        cream: "#F7F7EF",
        earth: "#856B4F",
        sky: "#79B8D5",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
