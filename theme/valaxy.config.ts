import type { Hero, ThemeConfig, ThemeUserConfig } from './types'
import defu from 'defu'
import { defineTheme } from 'valaxy'
import { addonHitokoto } from 'valaxy-addon-hitokoto'
import { addonVercount } from 'valaxy-addon-vercount'
import { generateSafelist, defaultThemeConfig as sakuraDefaultThemeConfig, themePlugin } from './node'

/**
 * 将 Markdown 正文转换为纯文本，用于自动摘要
 */
function getExcerptText(content: string) {
  return content
    .replace(/````[\s\S]*?````/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/^:::[^\n]*$/gm, ' ')
    .replace(/^<<<.*$/gm, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]+\$/g, ' ')
    .replace(/\{\{[^\n]*?\}\}/g, ' ')
    .replace(/\{lang="[^"]*"\}/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s+/gm, ' ')
    .replace(/^\s{0,3}>\s?/gm, ' ')
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, ' ')
    .replace(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/gm, ' ')
    .replace(/^\s*\|.*\|\s*$/gm, ' ')
    .replace(/[*_~`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default defineTheme<ThemeUserConfig>((options) => {
  const { themeConfig: userThemeConfig, siteConfig } = options.config
  const defaultThemeConfig = sakuraDefaultThemeConfig as ThemeConfig
  const themeConfig = defu(userThemeConfig, defaultThemeConfig) as ThemeConfig

  if (siteConfig.search?.enable && !userThemeConfig.navbarOptions?.tools?.includes('search'))
    defaultThemeConfig.navbarOptions.tools.push('search')

  if (userThemeConfig.navbarOptions?.tools)
    defaultThemeConfig.navbarOptions.tools = []

  if (userThemeConfig.banner)
    defaultThemeConfig.hero = { ...userThemeConfig.banner, ...userThemeConfig.hero } as Hero

  return {
    themeConfig: defaultThemeConfig,

    /**
     * 未手动填写摘要（frontmatter excerpt / <!-- more -->）时，自动从正文提取
     */
    extendMd(ctx) {
      // frontmatter 中手写摘要，或存在 <!-- more --> 时不再自动生成
      if (ctx.data.excerpt || ctx.excerpt?.trim())
        return

      const text = getExcerptText(ctx.content)
      if (!text)
        return

      const maxLength = 120
      const excerpt = text.length > maxLength ? `${text.slice(0, maxLength)}…` : text
      ctx.route.addToMeta({ excerpt: escapeHtml(excerpt) })
    },

    vite: {
      plugins: [
        themePlugin(themeConfig),
      ],
      optimizeDeps: {
        include: ['interactjs'],
      },
    },
    unocss: {
      safelist: generateSafelist(themeConfig),
    },
    addons: [
      addonVercount(),
      addonHitokoto(),
    ],
    fuse: {
      extendKeys: ['cover', 'date'],
    },
  }
})
