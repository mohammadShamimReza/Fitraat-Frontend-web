import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // screens: {
    //   tablet: "640px",
    //   // => @media (min-width: 640px) { ... }

    //   laptop: "1024px",
    //   // => @media (min-width: 1024px) { ... }

    //   desktop: "1280px",
    //   // => @media (min-width: 1280px) { ... }
    // },
    extend: {
      keyframes: {
        expand: {
          "0%": { maxHeight: "150px", opacity: "1" },
          "100%": { maxHeight: "1000px", opacity: "1" },
        },
        collapse: {
          "0%": { maxHeight: "1000px", opacity: "1" },
          "100%": { maxHeight: "300px", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      animation: {
        expand: "expand 0.5s ease-out forwards",
        collapse: "collapse 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
