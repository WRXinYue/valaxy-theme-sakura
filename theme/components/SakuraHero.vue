<script lang="ts" setup>
import type { Hero } from '../types/index'
import { useMounted } from '@vueuse/core'
import { computed, watch } from 'vue'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'

const props = defineProps<{
  hero?: Hero
}>()

const themeConfig = useThemeConfig()
const appStore = useSakuraAppStore()
const isMounted = useMounted()

const hero = computed(() => props.hero || themeConfig.value.hero)
const overlayBarClass = computed(() => appStore.wallpaperIsPlaying ? 'sakura-fade-out-down' : 'sakura-fade-in-up')

watch(() => appStore.wallpaperIsPlaying, (isPlaying) => {
  const navbarElement = document.querySelector('.sakura-navbar')

  navbarElement?.classList.toggle('sakura-fade-in-down', !isPlaying)
  navbarElement?.classList.toggle('sakura-fade-out-up', isPlaying)

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
      <div class="absolute inset-0 overflow-hidden" :class="[!appStore.wallpaperIsPlaying && hero.style && 'hero-style', hero.style]">
        <slot name="background">
          <SakuraHeroBackground :urls="hero?.urls" />
        </slot>

        <div v-if="hero?.waveTheme" :class="overlayBarClass">
          <slot name="overlay-bar">
            <SakuraWaveFish v-if="hero.waveTheme === 'fish'" />
            <SakuraWaveHorizontal v-else-if="hero.waveTheme === 'horizontal'" />
            <SakuraWaveRipple v-else-if="hero.waveTheme === 'ripple'" />
          </slot>
        </div>
      </div>

      <div z-4 class="info-overlay">
        <slot name="info-overlay">
          <SakuraHeroInfoOverlay :hero />
        </slot>
      </div>

      <slot name="player">
        <SakuraPlayer v-if="hero?.playerUrl" class="absolute bottom-2 right-2 z-4 h-8 w-8" />
      </slot>

      <div :class="overlayBarClass" class="absolute bottom-12 right-50% z-4">
        <slot name="scroll-down">
          <SakuraScrollDown v-if="themeConfig.scrollDown?.enable" />
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
  height: 100dvh;

  .sakura-glitch-text {
    font-family: Ubuntu, sans-serif;
  }
}
</style>
