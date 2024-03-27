<script setup lang="ts">
import { useThemeConfig } from '../../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <div v-if="themeConfig.articlePinned" class="<md:hidden">
    <div class="pt-24px px-20px flex items-center text-$st-c-text">
      <div i-fa6-solid:anchor class="mr-1" /> START:DASH!!
    </div>
    <hr>
    <ArticlePinnedThemeStartDash />
  </div>
</template>
