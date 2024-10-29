import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    alias: {
      '~': './src',
    },
  },
  html: {
    title: 'template rs ',
  },
  tools: {
    rspack(_config, { appendPlugins }) {
      appendPlugins(
        new RsdoctorRspackPlugin({}),
      )
    },
  },
})
