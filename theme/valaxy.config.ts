import { defineTheme } from 'valaxy'
import { VitePWA } from 'vite-plugin-pwa'
import { defaultThemeConfig, generateSafelist, themePlugin } from './node'
import type { ThemeConfig } from './types'

export default defineTheme<ThemeConfig>((options) => {
  return {
    themeConfig: defaultThemeConfig,
    vite: {
      plugins: [
        themePlugin(options),
        VitePWA(
          {
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
              name: 'valaxy-theme-sakura',
              short_name: 'Sakura',
              description: 'Valaxy Sakura Theme',
              theme_color: '#ffffff',
              icons: [
                {
                  src: 'pwa-32x32.svg',
                  type: 'image/svg+xml',
                  sizes: '32x32',
                },
                {
                  src: 'pwa-192x192.svg',
                  type: 'image/svg+xml',
                  sizes: '192x192',
                },
                {
                  src: 'pwa-512x512.svg',
                  type: 'image/svg+xml',
                  sizes: '512x512',
                  purpose: 'any',
                },
              ],
            },
            workbox: {
              globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
              runtimeCaching: [
                {
                  urlPattern: /https:\/\/wrxinyue.s3.bitiful.net\/.*.mp4/,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'external-mp4-files',
                    expiration: {
                      maxEntries: 10,
                      maxAgeSeconds: 60 * 60 * 24 * 30, // 缓存 30 天
                    },
                    cacheableResponse: {
                      statuses: [0, 200, 206],
                    },
                  },
                },
              ],
            },
          },
        ),
      ],
    },
    unocss: {
      safelist: generateSafelist(options.config.themeConfig as ThemeConfig),
    },
  }
})
