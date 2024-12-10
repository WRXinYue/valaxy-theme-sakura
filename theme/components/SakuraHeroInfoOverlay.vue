<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { useAddonHitokoto } from 'valaxy-addon-hitokoto'
import { computed } from 'vue'
import type { Hero, HeroSocialLink } from '../types/index'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'

const props = withDefaults(defineProps<{
  banner?: Hero
  wallpaperKey?: string
}>(), {
  wallpaperKey: 'banner',
})

const storageKey = `wallpaperKey-${props.wallpaperKey}`
const siteConfig = useSiteConfig()
const sakura = useSakuraAppStore()
const themeConfig = useThemeConfig()
const { hitokoto, fetchHitokoto } = useAddonHitokoto(themeConfig.value.hero.hitokoto)

const banner = computed(() => props.banner || themeConfig.value.hero)
const socials = computed(() => (banner.value.socials || siteConfig.value.social) as HeroSocialLink[])

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

    <div class="sakura-info-card" :class="sakura.wallpaperIsPlaying ? 'animation-slit-out-horizontal' : 'animation-slit-in-horizontal'">
      <div :class="themeConfig.hero.socialStyle === 'merge' && 'sakura-social-card'">
        <slot name="muted-text">
          <div class="flex justify-center" :class="themeConfig.hero.socialStyle === 'separate' && 'sakura-social-card'">
            <span class="inline-block" i-fa6-solid-quote-left />
            <span class="px-2 text-lg">
              <template v-if="themeConfig.hero.typewriter">
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

        <slot v-if="themeConfig.hero.socialStyle === 'merge'" name="social">
          <div class="mx-5 mt-4 flex justify-between">
            <img class="sakura-icon" rotate-180 cursor-pointer src="../assets/next-b.svg" alt="Previous media" @click="prevMedia">
            <a v-for="social in socials" :key="social?.name" :style="{ '--sakura-icon-color': social?.color }" :href="social?.link" aria-label="icon" target="_blank">
              <div v-if="social?.icon" :class="[social.icon]" class="sakura-icon" />
              <img v-else-if="social?.img" :src="social.img" class="sakura-icon">
            </a>
            <img class="sakura-icon" cursor-pointer src="../assets/next-b.svg" alt="Next media" @click="nextMedia">
          </div>
        </slot>
      </div>
    </div>

    <slot v-if="themeConfig.hero.socialStyle === 'separate' || themeConfig.hero.socialStyle === 'single'" name="social">
      <div class="sakura-info-card" :class="themeConfig.hero.socialStyle === 'separate' && 'sakura-social-card'">
        <div class="mx-5 justify-between" flex="~ center">
          <img class="sakura-icon" rotate-180 cursor-pointer src="../assets/next-b.svg" alt="Previous media" @click="prevMedia">
          <a
            v-for="social in socials"
            :key="social?.name"
            flex="~ center" :class="themeConfig.hero.socialStyle === 'single' && 'sakura-social-card'" :style="{ '--sakura-icon-color': social?.color }" :href="social?.link" aria-label="icon" target="_blank"
          >
            <div v-if="social?.icon" :class="[social.icon]" class="sakura-icon" />
            <img v-else-if="social?.img" :src="social.img" class="sakura-icon">
          </a>
          <img class="sakura-icon" cursor-pointer src="../assets/next-b.svg" alt="Next media" @click="nextMedia">
        </div>
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-hero-info-overlay {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;

  .sakura-social-card {
    padding: 15px 16px;
    border-radius: 1rem;
    background: hsla(0deg, 0%, 0%, 0.3);

    &-style-merge {
      padding: 1rem 0.75rem;
    }
  }

  .sakura-info-card {
    margin-top: 30px;
    color: white;

    @include screen('md') {
      min-width: 500px;
      max-width: 800px;
    }
  }

  .sakura-icon {
    height: 22px;
    width: 22px;
    color: var(--sakura-icon-color);
  }

  .card-wrapper {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }

  .card-wrapper::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 20%;
    margin-left: -15px;
    border-width: 15px;
    border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, 0.5);
  }
}
</style>
