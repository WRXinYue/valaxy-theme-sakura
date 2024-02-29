<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useThemeConfig } from '../composables'
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorage'

const storageKey = 'headerMediaIndex'

const themeConfig = useThemeConfig()
const currentIndex = ref()
const loading = ref(true)

watch(currentIndex, (newIndex) => {
  setLocalStorageItem(storageKey, newIndex!)
})

const currentWallpaperUrl = computed(() => {
  return themeConfig.value.headerWallpaper.urls[currentIndex.value!] || ''
})

function updateIndex(newIndex: number) {
  currentIndex.value = newIndex
}

onMounted(() => {
  loading.value = false
  currentIndex.value = getLocalStorageItem(storageKey, 0)
})
</script>

<template>
  <header v-if="!loading" class="relative flex <md:px-5 justify-center flex-items-center w-full h-100vh" :class="themeConfig.animation && 'element-slide-down'">
    <div class="headertop absolute h-full w-full top-0 overflow-hidden" :class="themeConfig.headerWallpaper.backgroundStyle">
      <template v-if="true">
        <SakuraBackgroundDisplay :url="currentWallpaperUrl" />
      </template>
      <template v-if="true">
        <SakuraWaveDecoration />
      </template>
    </div>
    <template v-if="true">
      <SakuraInfoOverlay :current-index="currentIndex" @update-index="updateIndex" />
    </template>
  </header>
</template>

<style lang="scss" scoped>
.headertop::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-attachment: fixed
}

.headertop.filter-dim::before {
  background-color: rgba(0, 0, 0, 0.3)
}

.headertop.filter-grid::before {
  background-image: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/grid.png)
}

.filter-dot.filter-dot::before {
  background-image: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/dot.gif);
}
</style>
