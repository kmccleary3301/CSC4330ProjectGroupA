//custom styles for tailwind
module.exports = {
  content: [],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      //import local font from assets folder url and use it
      Vikendi: ['url(../assets/fonts/Vikendi) format("opentype")'],
      //add system font
      system: ['system-ui', 'sans-serif'],
      SF: ['SF Pro Display', 'sans-serif'],
      SFBold: ['url(../assets/fonts/sfc-bold.ttf) format("truetype")'],
    },
    colors: {/* Colors */
      black: "#000",
      gray_100: "#182640",
      gray_200: "rgba(255, 255, 255, 0)",
      gray_300: "#3c405b",
      almond: "#fae8cd",
      blue: "rgba(191, 203, 255, 0.64)",
      white: "#fff",
    },
    padding: {
      p_5xs: 8,
      p_5xl: 24,
      p_13xl: 32,
    },
    FontSize: {
      size_xs: 12,
      size_mini: 16,
      size_lg: 18,
      size_3xl: 22,
      size_7xl: 26,
      size_9xl: 28,
      size_13xl: 32,
      size_16xl: 36,
      size_21xl: 40,
      size_27xl: 46,
      size_31xl: 50,
      size_73xl: 92,
    },
    /* Margins */
  Margin: {
    m_negative_lg: -800,
    m_negative_md: -400,
    m_negative_sm: -200,
    m_negative_xs: -100,
    m_negative_xxs: -50,
    m_negative_xxxs: -30,
    m_negative_xxxxs: -10,
    m_0: 0,
    m_xxxxs: 10,
    m_xxxs: 20,
    m_xxs: 30,
    m_xs: 40,
    m_s: 50,
    m_m: 60,
    m_l: 70,
    m_xl: 80,
    m_xxl: 90,
    m_xxxl: 100,
    m_xxxxl: 200,
    m_large: 250,
    m_extra_large: 300,
},
/* border radiuses */
Border: {
  br_45xl: 64,
  br_10xs_2: 2,
  br_16xl: 32,
},
     apple: {
    extend: {},
  },
  plugins: [],
}}
export default customStyles;