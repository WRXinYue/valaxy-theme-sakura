<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const theme = route.query.theme || 'sakura'
</script>

<template>
  <Layout>
    <PostThemeSakura v-if="theme === 'sakura'" />
  </Layout>
</template>
