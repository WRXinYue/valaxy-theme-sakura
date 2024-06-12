<script setup lang="ts">
import { computed } from 'vue'
import { useSiteConfig } from 'valaxy'
import { useSakuraAppStore } from '../../stores/app'
import type { Banner } from '../../types/index'
import { useThemeConfig } from '../../composables'

const props = withDefaults(defineProps<{
  banner?: Banner
  wallpaperKey?: string
}>(), {
  wallpaperKey: 'banner',
})
const storageKey = `wallpaperKey-${props.wallpaperKey}`
const siteConfig = useSiteConfig()
const sakura = useSakuraAppStore()
const themeConfig = useThemeConfig()

const banner = computed(() => props.banner || themeConfig.value.banner)

function prevMedia() {
  sakura.wallpaperIndex[storageKey] = (sakura.wallpaperIndex[storageKey] - 1 + sakura.wallpaperLength[storageKey]) % sakura.wallpaperLength[storageKey]
}

function nextMedia() {
  sakura.wallpaperIndex[storageKey] = (sakura.wallpaperIndex[storageKey] + 1) % sakura.wallpaperLength[storageKey]
}
</script>

<template>
  <div class="info z-4">
    <SakuraGlitchText :text="banner.title" />
    <div class="w-full h-full rounded-2xl px-4 py-3" style="background-color: rgba(0, 0, 0, 0.5);">
      <SakuraMottoDisplay :motto="banner.motto" />
      <div class="flex justify-between mx-5 mt-4">
        <img class="icon" cursor-pointer rotate-180 src="../../assets/next-b.svg" alt="Previous media" @click="prevMedia">
        <a v-for="s in siteConfig.social" :key="s.name" :style="{ '--st-c-icon': s.color }" class="icon" :href="s.link" aria-label="icon" target="_blank">
          <div :class="[s.icon]" />
        </a>
        <img class="icon" cursor-pointer src="../../assets/next-b.svg" alt="Next media" @click="nextMedia">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  height: 22px;
  width: 22px;
  color: var(--st-c-icon);
}
</style>
