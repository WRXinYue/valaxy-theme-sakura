<template>
  <div class="container mx-auto">
    <AppLink class="item header hvr-grow btn" draggable="true" to="/components/navbar">
      Navbar 导航栏
    </AppLink>
    <AppLink class="item sidebar hvr-grow btn" draggable="true" to="/components/sidebar">
      Sidebar 侧边栏
    </AppLink>
    <AppLink class="item banner hvr-grow btn" draggable="true" to="/components/banner">
      Banner 横幅
    </AppLink>
    <AppLink class="item article-pinned hvr-grow btn" draggable="true">
      ArticlePinned 固定文章
    </AppLink>
    <AppLink class="item article-list hvr-grow btn" draggable="true">
      ArticleList 文章列表
    </AppLink>
    <AppLink class="item footer hvr-grow btn" draggable="true" to="/components/footer">
      footer 页脚
    </AppLink>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  width: 750px;
  height: 600px;
  grid-gap: 1rem;
  grid-template-columns:
    [main-start sidebar-start] 120px
    [sidebar-end content-start] 1fr
    [column3-start] 1fr
    [content-end main-end];
  grid-template-rows:
    [row1-start] 1fr
    [row2-start] 1fr
    [row3-start] 1fr
    [row4-start] 1fr
    [row5-start] 1fr
    [row5-end];

}

.header {
  grid-column: main-start / main-end;
  grid-row: row1-start / row2-start;
}

.sidebar {
  grid-column: sidebar-start / sidebar-end;
  grid-row: row2-start / row5-start;
}

.banner {
  grid-column: content-start / content-end;
  grid-row: row2-start / row3-start;
}

.article-pinned {
  grid-column: content-start / content-end;
  grid-row: row3-start / row4-start;
}

.article-list {
  grid-column: content-start / content-end;
  grid-row: row4-start / row5-start;
}

.footer {
  grid-column: main-start / main-end;
  grid-row: row5-start / row5-end;
}

/* OTHER STYLES */

.item {
  background-color: #1EAAFC;
  background-image: linear-gradient(130deg, #6C52D9 0%, #1EAAFC 85%, #3EDFD7 100%);
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  color: #ffffff;
  border-radius: 4px;
  border: 6px solid #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

.header {
  background-color: #1EAAFC;
  background-image: linear-gradient(160deg, #6C52D9 0%, #9B8AE6 127%);
}

.sidebar {
  background-image: linear-gradient(203deg, #3EDFD7 0%, #29A49D 90%)
}

.content-1,
.content-2,
.content-3 {
  background-image: linear-gradient(130deg, #6C52D9 0%, #1EAAFC 85%, #3EDFD7 100%);
}

.footer {
  background-color: #6C52D9;
  background-image: linear-gradient(160deg, #6C52D9 0%, #9B8AE6 127%);
}
</style>
