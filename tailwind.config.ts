import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/preline.js",
  ],
  plugins: [require("preline/plugin")],
  theme: {
    extend: {
      colors: {
        accent: "#DC3962",
        backgroundAccent: "#1E2029",
        backgroundAccentLighter: "#22242d",
        backgroundColor: "#12141D",
        lightAccent: "#FF715B",
        primaryText: "#FFFFFF",
        secondaryText: "#6B8594",
      },
    },
    borderRadius: {
      DEFAULT: "0.25rem",
      full: "9999px",
      lg: "0.5rem",
      link: "12px",
      md: "0.375rem",
      none: "0",
      xl: "0.75rem",
      sm: "0.125rem",
      website: "10px",
    },
  },
};
export default config;
