<script lang="ts" setup>
import { useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <div v-if="themeConfig.startDash" class="<md:hidden">
    <div class="pt-24px px-20px flex items-center text-$st-c-text">
      <div i-fa6-solid:anchor class="mr-1" /> START:DASH!!
    </div>
    <hr>
    <SakuraArticleShowcase />
  </div>

  <div class="pt-24px px-20px flex items-center text-$st-c-text">
    <div i-fa6-solid:water class="mr-1" /> 文章列表
  </div>
  <hr>
  <SakuraPostList />
</template>

<route lang="yaml">
meta:
  layout: home
</route>
