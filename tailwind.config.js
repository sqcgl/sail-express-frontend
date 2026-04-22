/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sail: {
          ink: "#071424",
          navy: "#002366",
          blue: "#0a4da3",
          glacier: "#d7eef6",
          ice: "#f4fbfd",
          steel: "#536978",
          salmon: "#ec6f57",
          coral: "#ff9b73",
          kelp: "#0a5f60",
          cream: "#fff7ec"
        }
      },
      fontFamily: {
        display: ['"Libre Baskerville"', "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"]
      },
      boxShadow: {
        cold: "0 28px 90px rgba(4, 31, 54, 0.28)",
        glow: "0 0 60px rgba(236, 111, 87, 0.32)"
      }
    }
  },
  plugins: [],
};
