import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        sand: "#EFE7DC",
        ink: "#1C1917",
        charcoal: "#292524",
        clay: "#B08968",
        bronze: "#8B5E34",
        gold: "#C9A227",
        muted: "#78716C",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "ultra-wide": "0.35em",
      },
      maxWidth: {
        prose: "68ch",
      },
      animation: {
        "fade-in": "fadeIn 0.7s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;