<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const theme = route.query.theme || 'sakura'
</script>

<template>
  <CategoriesThemeSakura v-if="theme === 'sakura'" />
  <CategoriesThemeYun v-if="theme === 'yun'" />
</template>
