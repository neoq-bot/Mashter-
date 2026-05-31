/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "terminal-bg": "#0a0e27",
        "terminal-dark": "#0f1419",
        "neon-green": "#00ff41",
        "neon-red": "#ff006e",
        "neon-yellow": "#ffd60a",
        "neon-blue": "#00d9ff",
      },
      fontFamily: {
        mono: ["Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
