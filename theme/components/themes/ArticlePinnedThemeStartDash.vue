<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useThemeConfig } from '../../composables'

defineProps<{
  articlePinned?: {
    title?: string
    desc?: string
    img?: string
    link?: string
  }[]
}>()
const router = useRouter()
const themeConfig = useThemeConfig()

function toPath(path: string) {
  if (/^https?:\/\//.test(path))
    window.location.href = path
  else
    router.push({ path })
}
</script>

<template>
  <div class="image-row flex">
    <SakuraImageCard
      v-for="(startDash, i) in articlePinned || themeConfig.articlePinned" :key="i" :to="startDash.link"
      :data-title="startDash.title" :data-desc="startDash.desc" :overlay="true" :src="startDash.img"
      class="image-card" :class="startDash.link ? 'cursor-pointer' : ''" @click="toPath(startDash.link || '')"
    />
  </div>
</template>

<style lang="scss" scoped>
.image-row {
  justify-content: space-between;
  height: 160px;
}

.image-card {
  position: relative;
  flex: 1;
  margin: 0 3px;
  border-radius: var(--st-c-article-card-rd);
  width: 288px;
  overflow: hidden;

  &::before,
  &::after {
    position: absolute;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    transition: right 0.35s ease, left 0.5s ease;
    z-index: 1;
  }

  &::before {
    content: attr(data-title);
    top: 30px;
    right: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }

  &::after {
    content: attr(data-desc);
    top: 70px;
    left: 100%;
    font-size: 12px;
  }

  &:hover {
    &::before {
      right: 0;
    }
    &::after {
      left: 0;
    }
  }
}
</style>
