<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const theme = route.query.theme || 'sakura'
</script>

<template>
  <TagsThemeSakura v-if="theme === 'sakura'" />
  <TagsThemeYun v-if="theme === 'yun'" />
  <TagsThemeFlaribbit v-if="theme === 'flaribbit'" />
</template>
