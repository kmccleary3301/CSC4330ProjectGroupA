/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      //import local font from assets folder url and use it
      Vikendi: ['url(../assets/fonts/Vikendi) format("opentype")'],
      SF: ['url(../assets/fonts/sf-compact-display-medium) format("opentype")'],
      SFCB: ['url(../assets/fonts/sf-compact-display-bold) format("opentype")'],
      SFCRR: ['url(../assets/fonts/sf-compact-display-rounded-regular) format("opentype")'],
      SFCRB: ['url(../assets/fonts/sf-compact-display-rounded-bold) format("opentype")'],
      SFCSB: ['url(../assets/fonts/sf-compact-display-semibold) format("opentype")'],
      SFCR: ['url(../assets/fonts/sf-compact-display-regular) format("opentype")'],
    },
      apple: {
    extend: {},
  },
  plugins: [],
}}
