import { defineConfig, loadEnv } from '@rsbuild/core'

import { pluginReact } from '@rsbuild/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/rspack'
import { version } from './package.json' with { type: 'json' }

const APP_TITLE = 'template rs'

console.log()

const { publicVars } = loadEnv()

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      APP_TITLE: JSON.stringify(APP_TITLE),
      APP_VERSION: JSON.stringify(version),
      ...publicVars,
    },
  },
  html: {
    favicon: './src/assets/icon/app-icon.png',
    title: APP_TITLE,
    tags: import.meta.env.PUBLIC_CONSOLE === '1'
      ? [
          { tag: 'script', attrs: { src: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js' }, head: true, append: false },
        ]
      : [],
  },
  performance: {
    buildCache: false,
  },
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
      ],
    },
  },
})
