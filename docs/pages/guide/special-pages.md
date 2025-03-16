---
title: Special Pages
title_zh-CN: 特殊页面
toc: true
categories:
  - guide
---

# Special Pages{lang="en"}

# 特殊页面{lang="zh-CN"}

::: en

Valaxy Theme Sakura includes several special page layouts that you can use by creating specific files in your `pages` directory. These pages have predefined layouts and functionality that are automatically applied when you use the corresponding layout in your frontmatter.

:::

::: zh-CN

Valaxy Theme Sakura 包含多种特殊页面布局，您可以通过在 `pages` 目录中创建特定文件来使用这些布局。当您在 frontmatter 中使用相应的布局时，这些页面的预定义布局和功能会自动应用。

:::

## Available Special Pages{lang="en"}

## 可用的特殊页面{lang="zh-CN"}

::: en

The following special pages are available in the Sakura theme:

| Page Type  | Layout       | Description                                        |
| ---------- | ------------ | -------------------------------------------------- |
| Tags       | `tags`       | Displays all tags used in your blog                |
| Categories | `categories` | Displays all categories used in your blog          |
| Archives   | `archives`   | Shows a chronological archive of all your posts    |
| Search     | `search`     | Provides a search interface for your blog          |
| Links      | `links`      | Displays your friend links or other external links |
| Anime      | `anime`      | Displays anime-related content                     |
| Comment    | `comment`    | A dedicated page for comments                      |
| About      | Custom       | About page (typically uses a custom layout)        |

:::

::: zh-CN

Sakura 主题中提供以下特殊页面：

| 页面类型 | 布局         | 描述                           |
| -------- | ------------ | ------------------------------ |
| 标签     | `tags`       | 显示博客中使用的所有标签       |
| 分类     | `categories` | 显示博客中使用的所有分类       |
| 归档     | `archives`   | 按时间顺序显示所有文章的归档   |
| 搜索     | `search`     | 提供博客的搜索界面             |
| 友情链接 | `links`      | 显示友情链接或其他外部链接     |
| 动漫     | `anime`      | 显示动漫相关内容               |
| 评论     | `comment`    | 专门用于评论的页面             |
| 关于     | 自定义       | 关于页面（通常使用自定义布局） |

:::

## How to Create Special Pages{lang="en"}

## 如何创建特殊页面{lang="zh-CN"}

::: en

To create any of these special pages, you need to create an `index.md` file in the corresponding subdirectory under your `pages` directory. For example:

```
pages/
├── tags/
│   └── index.md
├── categories/
│   └── index.md
├── archives/
│   └── index.md
└── ...
```

:::

::: zh-CN

要创建这些特殊页面，您需要在 `pages` 目录下的相应子目录中创建 `index.md` 文件。例如：

```
pages/
├── tags/
│   └── index.md
├── categories/
│   └── index.md
├── archives/
│   └── index.md
└── ...
```

:::

## Example Configurations{lang="en"}

## 示例配置{lang="zh-CN"}

::: en

Here are example frontmatter configurations for each special page:

:::

::: zh-CN

以下是每个特殊页面的 frontmatter 配置示例：

:::

### Tags Page{lang="en"}

### 标签页面{lang="zh-CN"}

::: en

```md
---
layout: tags
title: Tags
icon: i-ri-price-tag-3-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

::: zh-CN

```md
---
layout: tags
title: 标签
icon: i-ri-price-tag-3-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

### Categories Page{lang="en"}

### 分类页面{lang="zh-CN"}

::: en

```md
---
layout: categories
title: Categories
icon: i-ri-folder-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

::: zh-CN

```md
---
layout: categories
title: 分类
icon: i-ri-folder-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

### Archives Page{lang="en"}

### 归档页面{lang="zh-CN"}

::: en

```md
---
layout: archives
title: Archives
icon: i-ri-archive-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

::: zh-CN

```md
---
layout: archives
title: 归档
icon: i-ri-archive-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

### Search Page{lang="en"}

### 搜索页面{lang="zh-CN"}

::: en

```md
---
layout: search
title: Search
icon: i-ri-search-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

::: zh-CN

```md
---
layout: search
title: 搜索
icon: i-ri-search-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

### Links Page{lang="en"}

### 友情链接页面{lang="zh-CN"}

::: en

```md
---
layout: links
title: Links
icon: i-ri-links-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

::: zh-CN

```md
---
layout: links
title: 友情链接
icon: i-ri-links-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

### Anime Page{lang="en"}

### 动漫页面{lang="zh-CN"}

::: en

```md
---
layout: anime
title: Anime
icon: i-ri-movie-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

::: zh-CN

```md
---
layout: anime
title: 动漫
icon: i-ri-movie-line
cover: /path/to/your/cover-image.jpg
comment: false
---
```

:::

### Comment Page{lang="en"}

### 评论页面{lang="zh-CN"}

::: en

```md
---
layout: comment
title: Comment
icon: i-ri-chat-1-line
nav: false
cover: /path/to/your/cover-image.jpg
---
```

:::

::: zh-CN

```md
---
layout: comment
title: 评论
icon: i-ri-chat-1-line
nav: false
cover: /path/to/your/cover-image.jpg
---
```

:::

## Customization{lang="en"}

## 自定义设置{lang="zh-CN"}

::: en

Each special page can be customized by adding additional frontmatter properties. Common properties include:

- `title`: The title of the page
- `icon`: The icon to display (using Iconify format)
- `nav`: Whether to show the page in navigation
- `cover`: A cover image for the page
- `comment`: Whether to enable comments on the page

For more detailed customization options, refer to the [frontmatter configuration](/guide/getting-started/frontmatter-config) documentation.

:::

::: zh-CN

每个特殊页面都可以通过添加额外的 frontmatter 属性进行自定义。常见的属性包括：

- `title`：页面标题
- `icon`：显示的图标（使用 Iconify 格式）
- `nav`：是否在导航中显示该页面
- `cover`：页面的封面图片
- `comment`：是否在页面上启用评论

有关更详细的自定义选项，请参阅 [frontmatter 配置](/guide/getting-started/frontmatter-config) 文档。

:::
