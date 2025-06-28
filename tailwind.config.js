const tokensJson = require('./src/shared/theme/tokens.json');

const colors = tokensJson.colors;

// Generate color entries for all light theme colors as CSS var strings
const colorVars = Object.fromEntries(
  Object.keys(colors.light).map((key) => [
    key,
    `rgb(var(--color-${key}) / <alpha-value>)`,
  ]),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/features/**/*.{js,jsx,ts,tsx}',
    './src/shared/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ...colorVars,
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
