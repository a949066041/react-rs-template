const path = require('node:path')
const { addDynamicIconSelectors } = require('@iconify/tailwind')
const svgJson = require('./assets/svg.json')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [
    addDynamicIconSelectors({
      iconSets: {
        custom: path.join(__dirname, 'assets/svg.json'),
      },
    }),
  ],
  safelist: [
    ...Object.keys(svgJson.icons).map(name => `icon-[custom--${name}]`),
  ],
}
