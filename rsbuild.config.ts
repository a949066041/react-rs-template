import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack'

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      // eslint-disable-next-line node/prefer-global/process
      isDev: JSON.stringify(process.env.NODE_ENV),
    },
  },
  html: {
    title: 'template rs ',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        pathRewrite: path => path.replace('/api', ''),
      },
    },
  },
  tools: {
    rspack: {
      plugins: [TanStackRouterRspack()],
    },
  },
})
