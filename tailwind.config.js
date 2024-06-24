/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      backgroundColor: {
        button: "#262D27",
      },
      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: "#808080",
        grayButton: "#3F4640",
        dark: "#1E1E2C",
        darkModal: "#313242",
        darkBlue: "#105198",
        accordion: "#2A2A4D",
        yellow: "#F2DA00",
        darkChoco: "#313242",
        grayDisable: "#DBDADA",
        "host-content": "#0A0F0C",
        "header-info": "#262D27",
        "workset-content": "#121714",
        "dark-on-primary-container": "#ffffff",
        "dark-on-error": "#8c1010",
        "error-on-click": "#BE1215",
        "dark-on-secondary": "#ffffff",
        "dark-on-primary": "#ffffff",
        "dark-outline": "#4e4e4e",
        "dark-on-surface": "#ffffff",
        "dark-surface-main": "#1e1e1c",
        "dark-error": "#db484a",
        "dark-tertiary": "#ffffff",
        "dark-primary": "#38389a",
        "dark-on-surface-variant": "#696969",
        "dark-surface-container-high": "#313242",
        "dark-surface-container-low": "rgba(30, 30, 44, 0.5)",
        "dark-primary-container": "#2a2a4d",
        "dark-secondary": "#a09898",
        "light-on-primary-container": "#d9d9d9",
        "light-on-error": "#ffffff",
        "light-on-secondary": "#ffffff",
        "light-on-primary": "#ffffff",
        "light-outline": "#4e4e4e",
        "light-on-surface": "#000000",
        "light-surface-main": "#f5f5f5",
        "light-error": "#db484a",
        "light-tertiary": "#000000",
        "light-primary": "#2e6adf",
        "light-on-surface-variant": "#696969",
        "light-surface-container-high": "#ffffff",
        "light-surface-container-low": "rgba(245, 245, 245, 0.5)",
        "light-primary-container": "#4893e6",
        "light-secondary": "#a09898",
        "area-dash": "#C84800",
        "container-error": "DB484A",
        text: "#E1EAE4",
        btn: {
          primary: "#4F9669",
          click: "#294734",
          hover: "#81AC91",
          secondary: "#171E1A",
        },
        accent: {
          3: "#3F4640",
          4: "#2C2A2A",
        },
        error: {
          50: "#872A2A",
          100: "#5D1F1F",
          150: "#501818",
        },
        primary: {
          20: "#6B9479",
          50: "#4F9669",
          100: "#365A43",
          150: "#294734",
        },
        neutral: {
          1: "#E1EAF5",
          2: "#6E6F6E",
          3: "#494D49",
          4: "#3F4640",
        },
        bg1: {
          50: "#E1EAF5",
          100: "#0A0F0C",
          150: "#0A0C0B",
        },
        bg2: {
          50: "#222522",
          100: "#262D27",
          150: "#1B231C",
          200: "#2C2A2A",
        },
        bg3: {
          50: "#202321",
          100: "#121714",
          150: "#0A0F0C",
        },
        warning: "#D7C525",
        success: {
          10: "#7CFFDB",
          20: "#44C4A1",
        },
        active: "#2C4CBE",
      },
      width: {
        60: "60px",
        50: "50px",
        30: "30px",
        85: "85px",
      },
      padding: {
        7.5: "7.5px",
        5.5: "5.5px",
        19: "19px",
        85: "85px",
      },
      animation: {
        flash: "flash 0.1s linear forwards",
      },
      boxShadow: {
        buttonShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },

      keyframes: {
        flash: {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Montserrat",
          fontWeight: "400",
          src: "url(/src/assets/fonts/Montserrat-Regular.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Montserrat",
          fontWeight: "500",
          src: "url(/src/assets/fonts/Montserrat-Medium.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Montserrat",
          fontWeight: "600",
          src: "url(/src/assets/fonts/Montserrat-SemiBold.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Montserrat",
          fontWeight: "700",
          src: "url(/src/assets/fonts/Montserrat-Bold.ttf)",
        },
      });
    }),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Montserrat",
          fontWeight: "800",
          src: "url(/src/assets/fonts/Montserrat-ExtraBold.ttf)",
        },
      });
    }),
  ],
};
