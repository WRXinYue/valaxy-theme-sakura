import { defineConfig } from 'vite'

// import { VitePWA } from 'vite-plugin-pwa'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  // https://github.com/antfu/vite-plugin-inspect
  // Visit http://localhost:3333/__inspect/ to see the inspector
  plugins: [Inspect()],
})
