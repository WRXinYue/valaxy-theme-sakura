---
title: 404 page
title_zh-CN: 404 页面
categories:
  - theme-config
top: 0
---

<strike>一般情况下遇到不存在的页面会自动重定向到首页，除非您取消了重定向</strike> (新版 Valaxy 貌似更改了此行为)

## 自定义

在 `pages` 文件夹中创建一个 `[...path].md` 文件，内容填写如下：

```markdown
---
title: 404
comment: false
layout: 404
---
```

**原理:** 这个文件的作用是捕获所有未匹配到的路径，并展示默认的404页面。你可以根据需要修改 `404` 布局和样式。如果想要了解`[...path].md`的原理，请参见[Unplugin Vue Router](https://uvr.esm.is/guide/file-based-routing.html)文档
