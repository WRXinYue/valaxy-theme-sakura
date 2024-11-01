<script lang="ts" setup>
import type { PostFrontMatter } from 'valaxy'

defineProps<{
  fm: PostFrontMatter
}>()
</script>

<template>
  <SakuraPageHeader :fm class="sakura-post-header">
    <div class="flex flex-col">
      <SakuraPostMeta :fm />
    </div>
  </SakuraPageHeader>
</template>
