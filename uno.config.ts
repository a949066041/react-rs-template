import presetIcons from '@unocss/preset-icons'
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  },
  presets: [presetUno(), presetIcons()],
})
