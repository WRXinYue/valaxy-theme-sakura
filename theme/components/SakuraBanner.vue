<script lang="ts" setup>
import { computed } from 'vue'
import { useMounted } from '@vueuse/core'
import { useSakuraAppStore } from '../stores'
import { useThemeConfig } from '../composables'
import type { Banner } from '../types/index'

const props = defineProps<{
  banner?: Banner
}>()

const themeConfig = useThemeConfig()
const appStore = useSakuraAppStore()
const isMounted = useMounted()

const banner = computed(() => props.banner || themeConfig.value.banner)
const overlayBarClass = computed(() => appStore.wallpaperIsPlaying ? 'animation-fade-out-down' : 'animation-fade-in-up')
</script>

<template>
  <header class="sakura-banner <md:px-5">
    <template v-if="isMounted">
      <div class="absolute inset-0 overflow-hidden" :class="[!appStore.wallpaperIsPlaying && banner.style && 'banner-style', banner.style]">
        <slot name="background-display">
          <SakuraBackgroundDisplay />
        </slot>

        <div :class="overlayBarClass">
          <slot name="overlay-bar">
            <WaveThemeFish v-if="banner.waveTheme === 'fish'" />
            <WaveThemeHorizontal v-if="banner.waveTheme === 'horizontal'" />
            <WaveThemeRipple v-if="banner.waveTheme === 'ripple'" />
          </slot>
        </div>
      </div>

      <div z-4>
        <slot name="info-overlay">
          <InfoOverlayThemeSakura />
        </slot>
      </div>

      <SakuraPlayer v-if="banner.playerUrl" class="absolute bottom-2 right-2 z-4 h-8 w-8" />
      <SakuraScrollDown class="absolute bottom-12 right-50% z-4" />
    </template>
  </header>
</template>

<style lang="scss">
.sakura-banner {
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
