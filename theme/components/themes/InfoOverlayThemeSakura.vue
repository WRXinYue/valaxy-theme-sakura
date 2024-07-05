<script setup lang="ts">
import { computed } from 'vue'
import { useSiteConfig } from 'valaxy'
import { HitokotoType, useAddonHitokoto } from 'valaxy-addon-hitokoto'
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
const { hitokoto, fetchHitokoto } = useAddonHitokoto()

const banner = computed(() => props.banner || themeConfig.value.banner)

function prevMedia() {
  sakura.wallpaperIndex[storageKey] = (sakura.wallpaperIndex[storageKey] - 1 + sakura.wallpaperLength[storageKey]) % sakura.wallpaperLength[storageKey]
}

function nextMedia() {
  sakura.wallpaperIndex[storageKey] = (sakura.wallpaperIndex[storageKey] + 1) % sakura.wallpaperLength[storageKey]
}
</script>

<template>
  <div class="info-overlay-theme-sakura">
    <slot name="highlighted-text">
      <SakuraGlitchText :text="banner.title" />
    </slot>

    <div class="card-wrapper">
      <slot name="muted-text">
        <span class="inline-block" i-fa6-solid-quote-left />
        <span class="px-2 text-lg">
          <!-- banner.motto -->
          <SakuraTypewriter v-if="hitokoto.hitokoto" :type-string="hitokoto.hitokoto" loop :delay="100" :pause-for="10000" :delete-all="100" @typing-finished="fetchHitokoto()" />
        </span>
        <span class="inline-block" i-fa6-solid-quote-right />
      </slot>

      <slot name="social">
        <div class="flex justify-between mx-5 mt-4">
          <img class="icon" cursor-pointer rotate-180 src="../../assets/next-b.svg" alt="Previous media" @click="prevMedia">
          <a v-for="s in siteConfig.social" :key="s.name" :style="{ '--st-c-icon': s.color }" class="icon" :href="s.link" aria-label="icon" target="_blank">
            <div :class="[s.icon]" />
          </a>
          <img class="icon" cursor-pointer src="../../assets/next-b.svg" alt="Next media" @click="nextMedia">
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.info-overlay-theme-sakura {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;

  .card-wrapper {
    color: white;
    border-radius: 1rem;
    padding: 1rem 0.75rem;
    background: hsla(0, 0% , 0%, 0.3);
  }

  .icon {
    height: 22px;
    width: 22px;
    color: var(--st-c-icon);
  }
}

.sakura-background-display .default-wallpaper{
  background: linear-gradient(45deg, var(--st-c-brand), var(--st-c-secondary));
  background-size: 600% 600%;
  animation: GradientBackground 10s ease infinite;
}

@keyframes GradientBackground {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
};
</style>
