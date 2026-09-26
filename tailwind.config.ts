import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./context/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f1115",
        "ink-soft": "#13161d",
        panel: "#15171d",
        "panel-2": "#1a1e26",
        line: "#232732",
        "line-soft": "#1b1f28",
        muted: "#9ca3af",
        "muted-strong": "#8a92a0",
        accent: "#ccff00",
        "accent-soft": "#c2f10d",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "Arial Narrow", "sans-serif"],
      },
      maxWidth: {
        shell: "1216px",
      },
    },
  },
  plugins: [],
};

export default config;
