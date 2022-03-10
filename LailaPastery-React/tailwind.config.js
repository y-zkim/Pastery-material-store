module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#F06970",
      secondary: "#FFF8F2",
      third: "#472017",
      danger: "#e3342f",
    }),

    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#F06970",
      secondary: "#FFF8F2",
      third: "#472017",
      yellow: "#F59E0B",
    }),

    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      primary: "#F06970",
      secondary: "#FFF8F2",
      third: "#472017",
    }),

    ringColor: (theme) => ({
      ...theme("colors"),
      primary: "#F06970",
      secondary: "#FFF8F2",
      third: "#472017",
      yellow: "#F59E0B",
    }),
  },
  variants: {},
  plugins: [],
};
