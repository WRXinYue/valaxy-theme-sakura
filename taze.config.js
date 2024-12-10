import { defineConfig } from 'taze'

export default defineConfig({
  force: true,
  write: true,
  install: true,
  ignorePaths: [
    '**/node_modules/**',
  ],
  packageMode: {
    'typescript': 'major',
    'unocss': 'ignore',
    'eslint': 'ignore',
    'valaxy': 'latest',
    '/vue/': 'latest',
  },
  depFields: {
    overrides: false,
  },
})
