import { defineTheme } from 'valaxy'
import { addonVercount } from 'valaxy-addon-vercount'
import { addonHitokoto } from 'valaxy-addon-hitokoto'
import { VitePWA } from 'vite-plugin-pwa'
import type { PluginOption } from 'vite'
import { defaultThemeConfig, generateSafelist, themePlugin } from './node'
import type { ThemeConfig } from './types'

export default defineTheme<ThemeConfig>((options) => {
  const themeConfig = options.config.themeConfig || {}
  const siteConfig = options.config.siteConfig || {}

  return {
    themeConfig: defaultThemeConfig as ThemeConfig,
    vite: {
      plugins: [
        themePlugin(options),
        VitePWA({
          registerType: 'autoUpdate',
          injectRegister: 'auto',
          includeAssets: ['favicon.ico'],
          manifest: {
            name: siteConfig.title,
            short_name: siteConfig.subtitle,
            description: siteConfig.description,
            theme_color: themeConfig.colors.primary,
            icons: [
              {
                src: 'pwa-192x192.png',
                type: 'image/png',
                sizes: '192x192',
              },
              {
                src: 'pwa-512x512.png',
                type: 'image/png',
                sizes: '512x512',
              },
            ],
          },
          workbox: {
            runtimeCaching: [
              {
                urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'static-resources',
                },
              },
              {
                urlPattern: ({ request }) => request.destination === 'image',
                handler: 'CacheFirst',
                options: {
                  cacheName: 'images-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 30,
                  },
                },
              },
              {
                urlPattern: /.*\.mp4$/,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'media',
                  expiration: {
                    maxEntries: 500,
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                  },
                  cacheableResponse: {
                    statuses: [200],
                  },
                  rangeRequests: true,
                },
              },
            ],
          },
          devOptions: {
            enabled: true,
          },
        }) as PluginOption,
      ],
    },
    unocss: {
      safelist: generateSafelist(options.config.themeConfig as ThemeConfig),
    },
    // markdown: {
    //   wrapperClasses: (id, code) => code.includes('@layout-full-width')
    //     ? ''
    //     : 'prose m-auto slide-enter-content',
    //   headEnabled: true,
    //   exportFrontmatter: false,
    //   exposeFrontmatter: false,
    //   exposeExcerpt: false,
    //   markdownItOptions: {
    //     quotes: '""\'\'',
    //   },
    // },
    addons: [
      addonVercount(),
      addonHitokoto(),
    ],
  }
})
