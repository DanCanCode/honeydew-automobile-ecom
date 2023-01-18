const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./client/**/*.{html, js}","./public/**/*.{html,js}"],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    
  ],
}
