import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101214",
        steel: "#3A3F44",
        silver: "#C8CCD0",
        muted: "#8A8F94",
        accent: "#E63946",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "marquee-left": "marquee-left 22s linear infinite",
        "marquee-right": "marquee-right 26s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
