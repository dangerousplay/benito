const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.tsx",
    "./src/**/*.css",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [require("@tailwindcss/forms"), nextui()],
  darkMode: "class",
  extend: {
    backgroundColor: ['active'],
    opacity: ['disabled'],
    backgroundImage: theme => ({
      'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      'home-hero': "url('/public/bg-home-inspiring.png')",
    })
  }
};
