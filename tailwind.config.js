/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        secondary: "#174e8d",
        bg: "#F1F1F2",
        red: "#d41f37",
        elements: "#50E3C2",
        accent: "#F5A623",
        transparent: "#00000000",
        tinted: "#0000009c",
        faded: "#ffffff81",
        text: {
          primary: "#313133",
          secondary: "#666666",
        },
        border: "#E6E9ED",
        success: "#7ED321",
        error: "#D0021B",
      },
      boxShadow: {
        uShape: "0 3px 7px 0 rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
