import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        navy: {
          DEFAULT: "#0b1f4a",
          50: "#f3f6fc",
          100: "#e6edf7",
          200: "#c4d2ea",
          600: "#1a3a7a",
          700: "#0f2a5e",
          900: "#071434",
        },
        lime: "#d8ff3a",
        cream: "#fafaf2",
      },
      boxShadow: {
        sticker: "4px 4px 0 0 #0b1f4a",
        "sticker-sm": "3px 3px 0 0 #0b1f4a",
        "sticker-lime": "4px 4px 0 0 #d8ff3a",
      },
    },
  },
  plugins: [],
} satisfies Config;
