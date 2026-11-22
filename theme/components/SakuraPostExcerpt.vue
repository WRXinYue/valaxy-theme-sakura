<script setup lang="ts">
defineProps<{
  excerpt: string
}>()
</script>

<template>
  <div text-base class="sakura-post-excerpt" v-html="excerpt" />
</template>

<style lang="scss" scoped>
.sakura-post-excerpt {
  display: -webkit-box;
  overflow: hidden;
  margin-bottom: 9px;
  color: var(--sakura-color-text);
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
