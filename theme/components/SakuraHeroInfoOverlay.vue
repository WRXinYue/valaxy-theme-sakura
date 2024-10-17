<script setup lang="ts">
import { computed } from 'vue'
import { useSiteConfig } from 'valaxy'
import { useAddonHitokoto } from 'valaxy-addon-hitokoto'
import { useSakuraAppStore } from '../stores'
import type { Banner, BannerSocialLink } from '../types/index'
import { useThemeConfig } from '../composables'

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
const { hitokoto, fetchHitokoto } = useAddonHitokoto(themeConfig.value.banner.hitokoto)

const banner = computed(() => props.banner || themeConfig.value.banner)
const socials = computed(() => (banner.value.socials || siteConfig.value.social) as BannerSocialLink[])

function prevMedia() {
  sakura.wallpaperOperation = 'prevMedia'
  sakura.wallpaperIndex[storageKey] = (sakura.wallpaperIndex[storageKey] - 1 + sakura.wallpaperLength[storageKey]) % sakura.wallpaperLength[storageKey]
  setTimeout(() => {
    sakura.wallpaperOperation = ''
  }, 0)
}

function nextMedia() {
  sakura.wallpaperOperation = 'nextMedia'
  sakura.wallpaperIndex[storageKey] = (sakura.wallpaperIndex[storageKey] + 1) % sakura.wallpaperLength[storageKey]
  setTimeout(() => {
    sakura.wallpaperOperation = ''
  }, 0)
}
</script>

<template>
  <div class="sakura-hero-info-overlay">
    <slot name="highlighted-text">
      <SakuraGlitchText :class="sakura.wallpaperIsPlaying ? 'animation-fade-out-up' : 'animation-fade-in-down'" :text="banner.title" />
    </slot>

    <div class="card-wrapper" :class="sakura.wallpaperIsPlaying ? 'animation-slit-out-horizontal' : 'animation-slit-in-horizontal'">
      <slot name="muted-text">
        <div class="flex justify-center">
          <span class="inline-block" i-fa6-solid-quote-left />
          <span class="px-2 text-lg">
            <template v-if="themeConfig.banner.typewriter">
              <SakuraTypewriter v-if="!banner.enableHitokoto" :type-string="banner.motto" loop :delay="100" :pause-for="10000" :delete-all="100" />
              <SakuraTypewriter v-else :type-string="hitokoto.hitokoto" loop :delay="100" :pause-for="10000" :delete-all="100" @all-typing-finished="fetchHitokoto()" />
            </template>
            <template v-else>
              {{ banner.enableHitokoto ? hitokoto.hitokoto : banner.motto }}
            </template>
          </span>
          <span class="inline-block" i-fa6-solid-quote-right />
        </div>
      </slot>

      <slot name="social">
        <div class="mx-5 mt-4 flex justify-between">
          <img class="icon" rotate-180 cursor-pointer src="../assets/next-b.svg" alt="Previous media" @click="prevMedia">
          <a v-for="social in socials" :key="social?.name" :style="{ '--sakura-icon-color': social?.color }" class="icon" :href="social?.link" aria-label="icon" target="_blank">
            <div v-if="social?.icon" :class="[social.icon]" />
            <img v-else-if="social?.img" :src="social.img">
          </a>
          <img class="icon" cursor-pointer src="../assets/next-b.svg" alt="Next media" @click="nextMedia">
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-hero-info-overlay {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;

  .card-wrapper {
    margin-top: 30px;
    color: white;
    border-radius: 1rem;
    padding: 1rem 0.75rem;
    background: hsla(0deg, 0%, 0%, 0.3);

    @include screen('md') {
      min-width: 500px;
      max-width: 800px;
    }
  }

  .icon {
    height: 22px;
    width: 22px;
    color: var(--sakura-icon-color);
  }
}
</style>
