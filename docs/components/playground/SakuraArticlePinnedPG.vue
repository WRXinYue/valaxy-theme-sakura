<script setup lang="ts">
import { ref } from 'vue'

const config = ref({
  articlePinned: [
    {
      title: 'Valaxy Theme Sakura',
      desc: '本站使用的 valaxy sakura 主题',
      img: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-d6mryl.jpg',
    },
    {
      title: 'Valaxy sakura theme docs',
      desc: '主题文档',
      img: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-gpxyed.jpg',
      link: 'https://sakura-docs.wrxinyue.org/',
    },
    {
      title: '示例站点',
      desc: '(暂无)',
      img: 'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-jxqgjw.jpg',
    },
  ],
})

function configUpdate(newConfig: any) {
  config.value = newConfig
}
</script>

<template>
  <ArticlePinnedThemeStartDash :article-pinned="config.articlePinned" />
  <CodeEditor :config="config" @update:config="configUpdate" />
</template>
