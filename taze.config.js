import { defineConfig } from 'taze'

export default defineConfig({
  force: true,
  write: true,
  install: true,
  ignorePaths: [
    '**/node_modules/**',
  ],
  depFields: {
    overrides: false,
  },
})
