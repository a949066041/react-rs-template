import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack'

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    alias: {
      '~': './src',
    },
  },
  html: {
    favicon: './src/assets/icon/app-icon.png',
    title: 'template rs',
  },
  tools: {
    rspack: {
      plugins: [TanStackRouterRspack()],
    },
  },
})
