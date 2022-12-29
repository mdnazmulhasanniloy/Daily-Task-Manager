const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:{
          100: '#06c2ae',
          200: '#02889b'
        },
        secondary: '#ff693a'
      }
    },
  },
  plugins: [],
});
