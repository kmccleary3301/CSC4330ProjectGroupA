module.exports = {
  content: [
  //   './screens/*.{js,jsx}', // Adjust these paths to match your project structure
  // './styles.ts', // Include the styles.ts file in the project folder directly
  // // Add more paths if necessary
  // './src/**/*.{html,js}',
  // './app/**/*.{js,jsx,ts,tsx}',
 // './**/*.{js,jsx,ts,tsx}'
 './screens/**/*.{html,js}',
  './components/**/*.{html,js}',
  './styles.ts',
  './App.js',
  './App.tsx',
  './index.js',
  './index.tsx',
  './src/**/*.{html,js}',
  './app/**/*.{js,jsx,ts,tsx}',
  './**/*.{js,jsx,ts,tsx}'
],
  
  darkMode: 'media',
  mode: 'jit',
  theme: {
    colors: {
      blue: '#182640',
      tan: '#FAE8CD',
    },
    fontFamily: {
      vikendi: ['Vikendi', 'sans-serif'],
      sf: ['SF', 'sans-serif'],
      sfbold: ['SFBold', 'sans-serif'],
    },
    extend: {},
  },
  rules: {
    preflight: false,
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
