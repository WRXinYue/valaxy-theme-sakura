<script setup lang="ts">
import { useThemeConfig } from '../../composables'

const themeConfig = useThemeConfig()

const { banner } = themeConfig.value
</script>

<template>
  <SakuraBanner>
    <template #background-display>
      <SakuraBackgroundDisplay />
    </template>
    <template #overlay-bar>
      <WaveThemeFish v-if="banner.waveTheme === 'fish'" />
      <WaveThemeHorizontal v-if="banner.waveTheme === 'horizontal'" />
      <WaveThemeRipple v-if="banner.waveTheme === 'ripple'" />
    </template>
    <template #info-overlay>
      <InfoOverlayThemeSakura />
      <!-- <InfoOverlayThemeHero /> -->
    </template>
  </SakuraBanner>
</template>
