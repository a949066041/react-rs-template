import { defineConfig, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'


export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  },
  presets: [presetUno(), presetIcons()],
})
