<template>
  <div class="container mx-auto">
    <AppLink class="item background-display hvr-grow btn" draggable="true" to="/components/background-display">
      BackgroundDisplay 背景显示
    </AppLink>
    <AppLink class="item banner-overlay-bar hvr-grow btn" draggable="true" to="/components/banner-overlay-bar">
      BannerOverlayBar 横幅覆盖条
    </AppLink>
    <AppLink class="item info-overlay hvr-grow btn" draggable="true" to="/components/info-overlay">
      InfoOverlay 信息覆盖层
    </AppLink>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  max-width: 750px;
  height: 600px;
  grid-gap: 1rem;
  grid-template-columns:
    [content-start] 1fr
    [content-end main-end];
  grid-template-rows:
    [row1-start] 1fr
    [row2-start] 1fr
    [row3-start] 1fr
    [row4-start] 1fr
    [row5-start] 1fr
    [row5-end];

}

.background-display {
  grid-column: content-start / content-end;
  grid-row: row2-start / row3-start;
}

.banner-overlay-bar {
  grid-column: content-start / content-end;
  grid-row: row3-start / row4-start;
}

.info-overlay {
  grid-column: content-start / content-end;
  grid-row: row4-start / row5-start;
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
