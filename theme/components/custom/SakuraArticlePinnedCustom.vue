<script setup lang="ts">
import { useThemeConfig } from '../../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <div v-if="themeConfig.articlePinned" class="<md:hidden">
    <SakuraIconTextDivider icon="i-fa6-solid:anchor" text="START:DASH!!" />
    <ArticlePinnedThemeStartDash />
  </div>
</template>
