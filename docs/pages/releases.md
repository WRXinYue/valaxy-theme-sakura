---
title: Releases
title_zh-CN: 发布版本
toc: true
categories:
  - releases
codeHeightLimit: 300
---

# Release Notes

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.3] - 2024-06-20

### Fixed

- 紧急修复分页组件丢失问题

## [0.6.2] - 2024-06-20

### Added

- 新增 Sakura 主题文件更多主题化样式, 如 prose 和 animation

### Fixed

- 修复 `valaxy.config.ts` favicon 选项配置失效问题
- 修复 typewriter-effect 依赖加载问题 [Issue #6](https://github.com/WRXinYue/valaxy-theme-sakura/issues/6)
- 修复开启 SakuraArticlePinnedCustom 组件导致自适应问题

### Changed

- 部分默认样式迁移至 sakura 主题样式文件(主题化)

### Removed

- 弃用 `valaxy.config.ts` animation 选项，改为引入主题化 animation 样式文件

## [0.6.1] - 2024-06-19

### Added

- 新增侧边栏导航支持
- 新增 CSS3 Animation 动画效果，轻松应用于自己的元素
- 新增打字效果 SakuraTypewriter 组件
- 新增 InfoOverlayThemeSakura 横幅 overlay-bar 主题组件

### Fixed

- 重构上一篇/下一篇文章导航，并重新排列导航组 [Issue #5](https://github.com/WRXinYue/valaxy-theme-sakura/issues/5)
- 修复 TagsThemeSakura 组件移动端自适应问题
- 修复首页(home)组件在某些情况下会闪烁问题

### Changed

- SakuraInfoOverlay 组件重名为 InfoOverlayThemeSakura 主题组件
- SakuraBanner 组件 banner-overlay-bar 插槽 重命名为 overlay-bar
- 更改默认主题色为 #0078E7 ，原主题色已经迁移至 sakura styles
- ArticleNavigation 系列组件从系统组件迁移至主题组件

### Removed

- SakuraHomeLayout 组件去除 content 插槽

## [0.6.0] - 2024-06-10

### Added

- 重构主页及其他页面为多栏布局
- 新增文章d3-force网络图功能(BATE)
- 增加博客友链和RSS支持
- 新增首页布局组件
- 优化和调整细节样式
- 侧边栏改为三栏布局，提升性能并支持左右侧边栏和侧边栏状态持久化
- 实现布局(layout)主题化

### Fixed

- 修复标签(tags)页面文章列表数据问题
- 修复版本更新导致的日期格式化问题
- 修复目录(toc)视图滚动问题 [Issue #3](https://github.com/WRXinYue/valaxy-theme-sakura/issues/3)

## [0.5.5] - 2024-04-19

### Added

- 新增公告栏配置选项
- 新增替换默认404图片配置选项

### Fixed

- 修复标签(tags)页面宽度样式问题
- 修复导航栏动画反转在加载页面时候出现闪烁问题
- 修复代码块高度限制(codeHeightLimit)无法展开代码块问题

## [0.5.0] - 2024-04-06

### Added

- 新增首页组件替换功能
- 引入更多 Wane 组件
- 对导航栏的样式和性能进行了优化
- 将 SakuraArticle 的布局从 flex 改为 grid，并允许在 grid 布局的左右 aside 区域添加自定义组件
- 支持瀑布流文章列表布局自动预加载

### Fixed

- 随着 SakuraArticle 布局的调整，解决了在一些设备上，文章目录(toc)会阻止页面滚动到底部的问题

## [0.4.4] - 2024-03-21

### Added

- 支持 social 彩色图标
- 添加了文章目录（ArticleToc）支持
- 添加进入页面时执行的锚点定位功能
- 新增多种 categories 和 tags 的布局样式
- 添加组件化配置支持

### Fixed

- 修复 ThemeUserConfig 导入问题
- 修复 Banner urls 配置为 string 不生效问题
- 修复默认 tags 布局内容不展示问题
- 修复从其他页面跳转回来文章列表预加载失效问题
- 修正页脚栏版本号

### Added

- 添加新的文章Navigation组件并替换默认组件

### Fixed

- 修复文章标题页面没有图片会显示undefined问题

## [0.3.2] - 2024-03-14

### Added

- 添加默认赞助及版权声明组件

## [0.3.1] - 2024-03-13

### Added

- 网站背景设置为图片时，对文章卡片和文章页面进行样式优化

## [0.3.0] - 2024-03-12

### Added

- 添加侧边栏是否默认启动配置选项
- 添加START:DASH组件页面
- 添加图片特效封装组件
- 调整了部分样式、全局CSS变量以及图标添加
- 调整了侧边栏配置，防止潜在问题
- 调整导航栏标题配置方式

## [0.2.2] - 2024-03-05

### Fixed

- 修复在归档页面点击排序按钮时，直接修改响应式状态会导致最大递归更新超出

## [0.2.1] - 2024-03-05

### Fixed

- 修复导航栏Logo在pc模式下无法点击问题

## [0.2.0] - 2024-03-04

### Added

- 添加滚动分页、首页、文章页、标签页、分类页可配置动画(animation)
- 添加导航栏二级菜单支持
- 新增ToTop组件
- 优化各个组件插槽
- 优化最高Lighthouse评分为满分
- 添加滚动分页预加载支持
- 更新壁纸配置方式
- 新增归档页面
- 添加**加载更多**按钮的样式
- 添加侧边栏是否显示在PC和侧边栏展示方式配置项

## [0.1.3] - 2024-02-26

### Fixed

- 修复valaxy 0.18.5版本post布局问题

## [0.1.2] - 2024-02-26

### Added

- 新增了分页功能及加载更多的支持，具体为valaxy的分页功能和Sakura的加载更多功能（样式待完成）。默认配置为启用Sakura加载更多模式
- 添加了滑动阻尼Demo效果
- 优化aplayer和live2d操作和细节上问题

### Fixed

- 修复了文章页面返回主页无法通过点击“回到顶部”按钮返回顶部的问题

## [0.1.1] - 2024-02-19

### Added

- 修改了主页壁纸配置方式，降低了复杂度
- 添加主页壁纸切换
- 添加valaxy-addon-meting音乐播放器示例
- 创建valaxy-addon-live2d看板娘组件
- 考虑到文章的更新，移除对pwa的支持

## [0.1.0] - 2024-02-17

### Added

- 调整侧边栏

## [0.0.9] - 2024-02-1

### Added

- 添加评论页面

## [0.0.8] - 2024-02-1

### Added

- 添加小云的文章分类页面

### Fixed

- 修复动画细节问题

## [0.0.7] - 2024-01-26

### Added

- 添加桌面端导航动画
- 添加桌面端导航图标
- 添加主页介绍图标
- 新增文章标签页面

## [0.0.6] - 2024-01-24

### Added

- 添加文章列表图片展示
- 添加文章页无图片情况下文字样式展示
- 添加移动端文章列表样式
- 添加桌面端文章列表左右布局
- 移动端隐藏ToTop

## [0.0.5] - 2024-01-22

### Fixed

- 紧急修复用户npm包部署博客布局问题

## [0.0.4] - 2024-01-22

### Added

- 添加用于移动端的侧边栏切换按钮和侧边栏菜单列表

### Fixed

- 修复导航栏重叠问题
- 修复手机端首页过宽

## [0.0.3] - 2024-01-21

### Added

- 在首页添加视频壁纸加载功能
- 导航栏新增下划线效果
- 添加首页标题、壁纸配置项

### Fixed

- 修复了文章页面导航栏不加载的问题
- 修复了RSS链接无法正确跳转的问题

## [0.0.2] - 2024-01-16

### Added

- 链接大图地址修改
- 手机端适配
- 解决文章显示问题

### Fixed

- 解决导航丢失问题

## [0.0.1] - 2024-01-16

### Added

- 恢复夜间模式切换
- 初始的 Sakura 主题启动

### Fixed

- 修复 eslint 错误

## [0.0.0] - 2024-01-10

- 初始提交
