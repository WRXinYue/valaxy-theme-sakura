import { defineConfig } from 'taze'

export default defineConfig({
  force: true,
  write: true,
  install: true,
  ignorePaths: [
    '**/node_modules/**',
  ],
  packageMode: {
    'typescript': 'minor',
    'unocss': 'ignore',
    'eslint': 'ignore',
    'valaxy': 'patch',
    '/vue/': 'latest',
  },
  depFields: {
    overrides: false,
  },
})
