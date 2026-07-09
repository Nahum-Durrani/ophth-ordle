import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",       // darkened exam room
        surface: "#141E31",
        raised: "#1C2A42",
        line: "#2A3A57",
        fog: "#8B99B0",
        paper: "#E9EEF6",
        beam: "#F2B84B",      // slit-lamp amber
        correct: "#3FC98F",
        wrong: "#E4604E",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "'Segoe UI'", "system-ui", "sans-serif"],
        body: ["system-ui", "-apple-system", "'Segoe UI'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
