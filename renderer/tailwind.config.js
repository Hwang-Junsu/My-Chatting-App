const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      orange: colors.orange,
      red: colors.red,
      sky: colors.sky,
      green: colors.green,
      indigo: colors.indigo,
    },
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        fadeInWithUp: "fadeInWithUp 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0%" },
          to: { opacity: "100%" },
        },
        fadeInWithUp: {
          from: { transform: "translateY(10px)", opacity: "0%" },
          to: { transform: "translateY(0px)", opacity: "100%" },
        },
      },
      fontFamily: {
        gothic: ["MICEGothic Bold"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
