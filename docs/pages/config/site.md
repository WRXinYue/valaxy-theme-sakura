---
title: Site config
title_zh-CN: 站点配置
toc: true
categories:
  - config
---

## 站点配置 {lang="zh-CN"}

## site config {lang="en"}

:::zh-CN
站点配置是任何主题都通用的，详情请见 [Valaxy 站点配置](https://valaxy.site/guide/config/#站点配置)
:::

:::en
Site configuration is applicable to any theme. For more details, see [Valaxy Site Configuration](https://valaxy.site/guide/config/#siteconfig).
:::

```ts
/**
 * @zh 社交链接
 * @en social links
 */
export interface SocialLink {
  /**
   *@zh  您的链接的标题
   *@en The title of your link
   */
  name: string
  link: string
  /**
   *@zh 图标名称
   *@en  Icon name
   * https://icones.js.org/
   */
  icon: string
  /**
   * @zh 图标颜色
   * @en locn color
   */
  color: string
}

export interface RedirectRule {
  to: string
  from: string | string[]
}

export interface RedirectItem {
  from: string
  to: string
}

// @en shared with valaxy node and client
// @zh 与 valaxy 节点和客户端共享
export interface SiteConfig {
  /**
   * @en enable auto (light/dark mode)
   * @zh 启用自动（明/暗模式）
   * @default 'auto'
   */
  mode: 'light' | 'dark' | 'auto'
  /**
   * @zh 默认语言
   * @en Default language
   *
   * @description 默认语言，设置 `zh-CN` 以改变默认语言为中文
   * @description Default language, set `zh-CN` to change the default language to Chinese.
   * @default 'en'
   */
  lang: string
  /**
   * alternative languages
   * @description 可选语言
   * @default ['en', 'zh-CN']
   * @see https://ogp.me/#optional
   */
  languages: string[]
  /**
   * @see https://day.js.org/docs/en/plugin/timezone
   * @zh_CN 时区 'Asia/Shanghai' Recommended
   * @en_US timezone
   * @default '' Your Computer Timezone
   */
  timezone: string
  /**
   * You site url in web, required for ssg & rss
   * @description 站点的完整 URL，SSG & RSS 需要（譬如生成版权处文章永久链接）
   * @example 'https://valaxy.site'
   * @default '/'
   */
  url: string
  /**
   * Site title
   * @description 站点标题
   */
  title: string
  /**
   * @en subtitle
   * @zh 副标题
   */
  subtitle: string
  /**
   * @en site description
   * @zh 站点描述
   */
  description: string
  /**
   * The owner of this blog
   * @description 博客作者
   */
  author: {
    /**
     * Your name
     * @description 你的名字
     */
    name: string
    email: string
    link: string
    avatar: string
    /**
     * The status of you
     * @description 状态
     */
    status: {
      emoji: string
      /**
       * show when hover emoji
       * @description 当鼠标悬浮在图标上时显示
       */
      message: string
    }
  }

  /**
   * @en show last updated time by git/mtime
   * @zh 通过 git/mtime 显示上次更新时间
   */
  lastUpdated: boolean

  /**
   * @en icon for your website
   * @zh 您网站的图标
   */
  favicon: string

  feed: {
    /**
     * name: feed -> feed.xml / feed.atom / feed.json
     * @default '' -> feed.xml / atom.xml / feed.json
     */
    name: string
    favicon: string
  }

  /**
   *@en social links
   *@zh 社交链接
   */
  social: SocialLink[]

  /**
   *@en search
   *@zh 搜索
   */
  search: {
    enable: boolean
    /**
     * @en Search Type
     * @zh 搜索类型
     * - algolia: Algolia Search
     * - engine: Engine Search, like Google/Baidu
     * - fuse: Local Search by fuse.js
     */
    type: 'algolia' | 'engine' | 'fuse'
  }

  /**
   *
   * fuse search
   * @see https://fusejs.io/
   * @description 本地搜索
   * Please set search.type to 'fuse'
   */
  fuse: {
    /**
     * @default 'valaxy-fuse-list.json'
     * @description 搜索结果列表数据所在路径
     */
    dataPath: string
    /**
     * @see https://fusejs.io/api/options.html
     */
    options: FuseOptions<FuseListItem> & {
      /**
       * @default ['title', 'tags', 'categories', 'excerpt']
       * @description 搜索的字段
       * @see https://fusejs.io/api/options.html#keys
       */
      keys: FuseOptions<FuseListItem>['keys']
    }
  }

  /**
   * set post default frontmatter
   */
  frontmatter: Partial<PostFrontMatter>

  /**
   * comment: waline/...
   */
  comment: {
    enable: boolean
  }

  /**
   * third-party plugin need cdn
   * aplayer, twikoo
   * @default 'https://unpkg.com/'
   */
  cdn: {
    prefix: string
  }

  /**
   * The license of your posts
   * @description 文章所使用的协议，默认使用 Creative Commons
   * @default https://creativecommons.org/licenses/
   */
  license: {
    /**
     * Whether to show at the bottom of the article
     * @description 是否显示在文章底部
     * @default true
     */
    enabled: boolean
    /**
     * Creative License Language, same with your config.lang
     * when lang === 'zh-CN', use 'zh'
     * @description 默认与站点语言相同
     * @default 'en'
     */
    language: string
    /**
     * Type of license
     * @description 证书类型
     * @default 'by-nc-sa'
     */
    type: 'zero' | 'by-sa' | 'by-nd' | 'by-nc' | 'by-nc-sa' | 'by-nc-nd'
  }

  /**
   * donate for author
   * @description 打赏/赞助
   */
  sponsor: {
    enable: boolean
    /**
     * Donate button title attribute
     * @description 打赏按钮的 title 属性
     * @default zh:'打赏' en:'Donate'
     */
    title?: string
    /**
     * Donate content description
     * @description 打赏的描述内容，在按钮下方所有图片上方，与图片一起折叠
     * @default undefined 不显示内容
     */
    description?: string
    methods: {
      name: string
      url: string
      color: string
      icon: string
    }[]
  }

  /**
   * @en image preview by medium-zoom\
   * @zh 通过 medium-zoom进行图片预览
   * @url https://github.com/francoischalifour/medium-zoom
   */
  mediumZoom: {
    /**
     * @en Enable image preview
     * @zh 启用图片预览
     */
    enable: boolean
    /**
     * For example: '.markdown-body img'
     * @default '' content.value querySelectorAll('img')
     */
    selector: string | HTMLElement | HTMLElement[]
    /**
     * @en config items
     * @zh 配置项
     * @see https://github.com/francoischalifour/medium-zoom#options
     */
    options: ZoomOptions
  }

  /**
   *@en lazyload by vanilla-lazyload and markdown-it-image-figures
   *@zh markdown通过 vanilla-lazyload 和 markdown-it-image-figures 实现图片懒加载
   *
   *@en when vanillaLazyLoad.enable is true, imageFigures removeSrc is true, classes is 'lazy'
   *@zh 当 vanillaLazyLoad.enable 为 true 时，imageFigures.removeSrc 为 true，classes 为 'lazy'。
   * @see https://github.com/verlok/vanilla-lazyload
   */
  vanillaLazyload: {
    enable: boolean
    options: ILazyLoadOptions
  }

  /**
   *@en displayed posts length in every page
   *@zh 每页显示的帖子长度
   * @default 7
   */
  pageSize: number

  /**
   * statistics readingTime and wordCount
   * @description 统计阅读时间和字数
   */
  statistics: {
    enable: boolean
    readTime: {
      speed: {
        /**
         * Chinese word count speed
         * @description 中文每分钟阅读字数
         * @default 300 (300 字/分钟)
         */
        cn: number
        /**
         * English word count speed
         * @description 英文每分钟阅读字数
         * @default 100 (200 字/分钟)
         */
        en: number
      }
    }
  }

  /**
   * @description Encrypt article
   * @description:zh-CN 加密文章
   * default algorithm: AES-CBC
   */
  encrypt: {
    enable: boolean
    /**
     * [encrypt](https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/encrypt#%E6%94%AF%E6%8C%81%E7%9A%84%E7%AE%97%E6%B3%95)
     * @default AES-CBC
     */
    algorithm: string
    iv: Uint8Array
    salt: Uint8Array
    /**
     * @description:zh-CN 全局加密密码 todo
     */
    // password: string
  }

  /**
   * @description:en-US Limit the height of the code block in px
   * @description:zh-CN 限制代码块的高度，单位是 px
   */
  codeHeightLimit?: number

  /**
   * @description:en-US client redirect rules
   * @description:zh-CN 客户端重定向规则
   */
  redirects?: {
    useVueRouter?: boolean
    rules?: RedirectRule[]
  }
}

export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends object ? PartialDeep<T[P]> : T[P]
}

/**
 *@en config generated by runtime
 *@zh 运行时生成的配置
 */
export interface RuntimeConfig {
  addons: Record<string, ValaxyAddon>
  redirects: {
    useVueRouter: boolean
    redirectRoutes: RouteRecordRaw[]
  }
}

export interface Pkg {
  name: string
  version: string
  homepage?: string
  [key: string]: any
}

export interface ValaxyConfig<ThemeConfig = DefaultTheme.Config> {
  siteConfig: SiteConfig
  /**
   * The name of theme
   * @description 主题名称
   */
  theme: string
  /**
   * The config of theme
   * @description 主题配置
   */
  themeConfig: ThemeConfig & {
    pkg: Pkg
  }
  /**
   * @en generated by runtime
   * @zh 由运行时生成
   */
  runtimeConfig: RuntimeConfig
}
```
