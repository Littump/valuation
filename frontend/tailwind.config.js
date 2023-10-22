export default {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      // => @media (min-width: 640px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#1E222E",
      purple: "#7364E3",
      gray: "#E2E6EA",
      "light-gray": "#F4F6FA",
      "dark-gray": {
        400: "#696E82",
        500: "#30333E",
        600: "#1E222E",
      },
      red: "#E55C5C",
      green: "#6A9F48",
      orange: "#FA8200",
      blue: {
        100: "",
        200: "#F1F4FE",
        300: "#E8EDFD",
        400: "#91A6F6",
        500: "#476BF0",
        600: "#415FD0",
        700: "#374EA2",
        800: "",
        900: "#333c4d",
      },
      dark: {
        100: "#e2e2e9",
        200: "#bdc5db",
        300: "#aac7ff",
        400: "#333c4d",
        500: "#2C74B3",
        600: "#252b37",
        700: "#1d2636",
        800: "#414856",
      },
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
