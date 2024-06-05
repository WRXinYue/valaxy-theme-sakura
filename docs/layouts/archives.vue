<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const theme = route.query.theme || 'sakura'
</script>

<template>
  <Layout>
    <ArchivesThemeSakura v-if="theme === 'sakura'" />
  </Layout>
</template>
