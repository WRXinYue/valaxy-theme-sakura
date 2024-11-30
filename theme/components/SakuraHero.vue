<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useMounted } from '@vueuse/core'
import { useSakuraAppStore } from '../stores'
import { useThemeConfig } from '../composables'
import type { Hero } from '../types/index'

const props = defineProps<{
  hero?: Hero
}>()

const themeConfig = useThemeConfig()
const appStore = useSakuraAppStore()
const isMounted = useMounted()

const banner = computed(() => props.hero || themeConfig.value.hero)
const overlayBarClass = computed(() => appStore.wallpaperIsPlaying ? 'animation-fade-out-down' : 'animation-fade-in-up')

watch(() => appStore.wallpaperIsPlaying, (isPlaying) => {
  const navbarElement = document.querySelector('.sakura-navbar')

  navbarElement?.classList.toggle('animation-fade-in-down', !isPlaying)
  navbarElement?.classList.toggle('animation-fade-out-up', isPlaying)

  const live2dToolQuitElement = document.querySelector('#live2d-tool-quit')
  const live2dToolElement = document.querySelector('#live2d-tools')

  const shouldClickQuit = (isPlaying && live2dToolElement?.className === 'show')
    || (!isPlaying && live2dToolElement?.className === 'hide')

  if (shouldClickQuit && live2dToolQuitElement instanceof HTMLElement)
    live2dToolQuitElement.click()
})
</script>

<template>
  <header class="sakura-hero <md:px-5">
    <template v-if="isMounted">
      <div class="absolute inset-0 overflow-hidden" :class="[!appStore.wallpaperIsPlaying && banner.style && 'banner-style', banner.style]">
        <slot name="background">
          <SakuraHeroBackground />
        </slot>

        <div :class="overlayBarClass">
          <slot name="overlay-bar">
            <SakuraWaveFish v-if="banner.waveTheme === 'fish'" />
            <SakuraWaveHorizontal v-else-if="banner.waveTheme === 'horizontal'" />
            <SakuraWaveRipple v-else-if="banner.waveTheme === 'ripple'" />
          </slot>
        </div>
      </div>

      <div z-4>
        <slot name="info-overlay">
          <SakuraHeroInfoOverlay />
        </slot>
      </div>

      <slot name="player">
        <SakuraPlayer v-if="banner.playerUrl" class="absolute bottom-2 right-2 z-4 h-8 w-8" />
      </slot>

      <div :class="overlayBarClass" class="absolute bottom-12 right-50% z-4">
        <slot name="scroll-down">
          <SakuraScrollDown v-if="themeConfig.scrollDown.enable" />
        </slot>
      </div>
    </template>
  </header>
</template>

<style lang="scss">
.sakura-hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .banner-style::before {
    content: '';
    position: absolute;
    inset: 0;
    background-attachment: fixed;
  }

  .banner-style.filter-dim::before {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .banner-style.filter-grid::before {
    background-image: url('https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/grid.png');
  }

  .banner-style.filter-dot::before {
    background-image: url('https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/other/dot.gif');
  }
}
</style>
