<script setup lang="ts">
import type { Post } from 'valaxy'
import { useValaxyI18n } from 'valaxy'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { preloadPostRoute } from '../core/utils/postCoverTransition'

const props = defineProps<{
  title?: Post['title']
  to?: string
}>()

const router = useRouter()
const { $tO } = useValaxyI18n()
const title = computed(() => $tO(props.title))
</script>

<template>
  <h2 text-2xl font-bold class="sakura-post-title">
    <RouterLink data-post-title inline-block :to="to || ''" :aria-label="`Read more about ${title}`" @pointerenter="preloadPostRoute(router, to)" @focus="preloadPostRoute(router, to)">
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
