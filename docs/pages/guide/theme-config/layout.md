---
title: Layout & Sidebar Widgets
title_zh-CN: 布局与侧边栏挂件
toc: true
categories:
  - theme-config
---

# Layout & Sidebar Widgets 布局与侧边栏挂件

Valaxy Theme Sakura 引入了灵活的布局系统，允许你针对不同的页面（如首页、文章页、归档页等）自定义布局模式和侧边栏挂件。

## 布局配置 (Layout Configuration)

你可以在 `valaxy.config.ts` 的 `themeConfig.layout` 中进行配置。

```ts
// valaxy.config.ts
export default defineValaxyConfig({
  themeConfig: {
    layout: {
      // 通用配置 (默认)
      general: {
        layout: 'triple-columns',
        sidebar: {
          left: ['SakuraSidebarSiteInfo', 'SakuraSidebarLinks'],
          right: ['SakuraSidebarTags', 'SakuraSidebarLatestPosts']
        }
      },
      // 针对文章页的配置
      post: {
        layout: 'two-columns-right',
        sidebar: {
          right: ['SakuraSidebarToc', 'SakuraSidebarSiteInfo']
        }
      },
      // 针对归档页的配置
      archives: {
        layout: 'one-column'
      }
    }
  }
})
```

### 布局模式 (Layout Modes)

`layout` 属性支持以下四种模式：

| 模式 | 说明 |
| --- | --- |
| `triple-columns` | **三栏布局**：左侧边栏 + 内容区 + 右侧边栏 (默认) |
| `two-columns-right` | **两栏布局 (右)**：内容区 + 右侧边栏 |
| `two-columns-left` | **两栏布局 (左)**：左侧边栏 + 内容区 |
| `one-column` | **单栏布局**：仅显示内容区，无侧边栏 |

## 侧边栏挂件 (Sidebar Widgets)

侧边栏的内容由一系列挂件（Components）组成。你可以在 `sidebar.left` 和 `sidebar.right` 数组中按顺序配置这些挂件。

### 内置挂件

主题内置了以下常用挂件，可以直接使用字符串名称引用：

| 挂件名称 | 说明 |
| --- | --- |
| `SakuraSidebarSiteInfo` | **站点信息**：显示头像、文章数、分类数、标签数等 |
| `SakuraSidebarCategories` | **分类列表**：显示站点文章分类 |
| `SakuraSidebarTags` | **标签云**：显示热门标签 |
| `SakuraSidebarLinks` | **友情链接**：显示友情链接列表 |
| `SakuraSidebarLatestPosts` | **最新文章**：显示最近发布的文章列表 |
| `SakuraSidebarLatestComments` | **最新评论**：显示最新的评论（需启用评论系统） |
| `SakuraSidebarMusic` | **音乐播放器**：嵌入 MetingJS 音乐播放器 |
| `SakuraSidebarToc` | **文章目录**：显示当前文章的目录（仅在文章页有效） |

### 高级配置

除了使用字符串名称，你也可以使用对象形式来传递参数或控制启用状态：

```ts
sidebar: {
  left: [
    // 简单引用
    'SakuraSidebarSiteInfo',
    
    // 带参数或控制的引用
    {
      component: 'SakuraSidebarTags',
      enable: true,
      props: {
        limit: 10 // (假设该组件支持 limit 参数)
      }
    }
  ]
}
```
