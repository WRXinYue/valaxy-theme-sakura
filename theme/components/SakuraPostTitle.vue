<script setup lang="ts">
defineProps<{
  title: string
  to?: string
}>()
</script>

<template>
  <h2 text-2xl font-bold class="sakura-post-title">
    <RouterLink :to="to || ''" :aria-label="`Read more about ${title}`">
      {{ title }}
    </RouterLink>
  </h2>
</template>

<style lang="scss" scoped>
.sakura-post-title {
  color: var(--sakura-color-text-deep);

  &:hover {
    color: var(--sakura-color-action);
  }

  a {
    color: inherit;
  }
}
</style>
