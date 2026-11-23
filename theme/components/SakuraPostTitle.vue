<script setup lang="ts">
import type { Post } from 'valaxy'
import { useValaxyI18n } from 'valaxy'
import { computed } from 'vue'

const props = defineProps<{
  title?: Post['title']
  to?: string
}>()

const { $tO } = useValaxyI18n()
const title = computed(() => $tO(props.title))
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
