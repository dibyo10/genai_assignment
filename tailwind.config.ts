import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        paper: "#f4efe6",
        ink: "#1a1814",
        muted: "#6b6457",
        rule: "#d9cfb9",
        anshuman: "#1d4ed8",
        abhimanyu: "#047857",
        kshitij: "#6d28d9",
      },
    },
  },
  plugins: [],
} satisfies Config;
