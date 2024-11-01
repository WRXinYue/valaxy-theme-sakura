<script setup lang="ts">
import { useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <SakuraPaginationInfiniteScroll v-if="themeConfig.pagination!.type === 'infinite-scroll'" />
  <SakuraPaginationStandard v-if="themeConfig.pagination!.type === 'standard'" />
</template>
