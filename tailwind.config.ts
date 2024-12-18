import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      boxShadow: {
        b: "0 4px 0",
        "b-small": "0 2px 0",
      },
      colors: {
        black: "#3c3c3c",
        softblack: "#4b4b4b",

        indigo: "#4525ff",
        indigoglass: "#4255ff",

        lightgreen: "#d7ffb8",

        lightlimegreen: "#a5ed6e",
        limegreen: "#61e002",
        green: "#58cc02",
        darkgreen: "#58a700",

        rum: "#9b91b9",

        blue: "#3c4dff",
        glassblue: "#6371ff",

        empty: "#e5e5e5",
        lightgray: "#f7f7f7",
        gray: "#afafaf",
        darkgray: "#777777",

        lightsky: "#1fc2ff",
        sky: "#1cb0f6",
        darksky: "#1899d6",

        lightpond: "#ddf4ff",
        pond: "#84d8ff",

        lightred: "#ffdfe0",
        red: "#ff4b4b",
        darkred: "#ea2b2b",
        danger: "#ff5252",
      },
    },
  },
  plugins: [],
};
export default config;
