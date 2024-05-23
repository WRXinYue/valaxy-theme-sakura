---
title: Theme config
title_zh-CN: 主题配置
toc: true
categories:
  - config
---

## 主题配置

如下是主题配置(ThemeConfig)总览，具体效果可以看各个组件的配置说明

```ts
export interface ThemeConfig {
  colors?: {
    /**
     * 主色
     * @default '#e67474'
     */
    primary: string
  }

  /**
   * 页脚
   */
  footer: Footer

  /**
   * 导航栏图标
   */
  favicon: boolean

  /**
   * 横幅
   */
  banner: Banner

  /**
   * 置顶文章
   */
  articlePinned?: {
    title?: string
    desc?: string
    img?: string
    link?: string
  }[]

  /**
   * 侧边栏
   */
  sidebar: NavItem[] | SidebarMulti

  /**
   * 导航栏
   */
  navbar: NavItem[]
  navbarTitle: string | string[]

  /**
   * 文章
   */
  article?: {
    /**
     * 文章导航合并
     */
    navigationMerge?: boolean
  }

  /**
   * 文章大纲标题
   */
  outlineTitle?: string

  /**
   * 分页配置
   */
  pagination?: {
    /**
     * 仅对'infinite-scroll'类型有效的动画
     */
    animation?: boolean

    /**
     * 每页项目数 - 适用于'pagination'类型
     * 指定每页显示多少项目/文章
     * 默认为 siteConfig.pageSize 配置
     */
    itemsPerPage?: number

    /**
     * 'infinite-scroll'类型的可选设置，例如加载更多的阈值
     */
    infiniteScrollOptions?: {
      /**
       * 启用内容预加载，即在用户实际到达尾部之前预先准备好下一内容
       * 这可以通过提前准备好下一内容来提高用户体验
       */
      preload?: boolean

      /**
       * 设置加载新项目的阈值，基于当前项目结束前的像素数
       */
      threshold?: number
    }
  }

  /**
   * 页面是否启用滚动阻尼效果
   */
  scrollDamping?: boolean

  /**
   * 页面是否启用动画
   */
  animation?: boolean

  /**
   * 404 页面图片
   */
  notFoundImage?: string

  /**
   * 公告板
   */
  noticeBoard?: {
    message?: string
  }
}

export interface Banner {
  title?: string
  motto?: string
  urls?: string[] | string
  style?: 'filter-dot' | 'filter-dim' | 'filter-grid' | ''
}

export type SidebarMulti = (string | SidebarItem)[]

// 导航多重结构
// export interface SidebarMulti {
//   [path: string]: SidebarItem[] | { items: SidebarItem[], base: string }
// }

export interface SidebarItem {
  /**
   * 项目文本标签
   */
  text?: string

  /**
   * 图标
   */
  icon?: string

  /**
   * 项目链接
   */
  link?: string

  /**
   * 项目的子项
   */
  items?: SidebarItem[]

  /**
   * 如果未指定，则组不可折叠
   *
   * 如果为 `true`，组可折叠且默认折叠
   *
   * 如果为 `false`，组可折叠但默认展开
   */
  collapsed?: boolean

  /**
   * 子项的基路径
   */
  base?: string

  /**
   * 在上/下一页的页脚显示的自定义文本
   */
  docFooterText?: string

  rel?: string
  target?: string
}

export interface NavItem {
  text?: string
  /** 本地化 */
  locale?: string | number
  link: string
  /** 图标 */
  icon?: string
  /** 子菜单 */
  submenu?: NavItem[]
}

export interface Footer {
  /**
   * 建站于
   */
  since?: number

  /**
   * 年份与版权信息之间的图标
   */
  icon?: {
    /**
     * 图标名，i-xxx
     */
    enable?: boolean
    name?: string
    img?: string
    animated?: boolean
    url?: string
    title?: string
  }

  /**
   * 由 valaxy & valaxy-theme-${name} 提供支持，默认为 yun
   */
  powered?: boolean

  /** 备案 ICP */
  icp?: string
}
```

## 示例

在 Valaxy 中，`ThemeConfig`是`export default defineValaxyConfig<ThemeConfig>`中的`themeConfig`部分，允许用户对主题进行个性化配置以下是 valaxy-theme-sakura 主题的Banner配置示例：

```ts
import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',

  themeConfig: {
    banner: {
      title: 'Hello, sakura',
      motto: 'You got to put the past behind you before you can move on.',
      urls: [
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/optimize/cGZ4kz2q.webp',
        'https://wrxinyue-images.s3.bitiful.net/wallpaper/Genshin Impact - Yae Miko (4) Cybust PC.mp4',
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-yxwy7k.jpg',
      ],
      style: '',
    },
  },
})
```

::: tip
在TypeScript中，当您看到`enable?: boolean`这样的语法时，这意味着`enable`属性是可选的

更多关于可选属性的信息，请参考[TypeScript Required](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)
:::
