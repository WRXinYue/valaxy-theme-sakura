<script setup lang="ts">
import type { ResponsiveBreakpoints } from 'valaxy-theme-sakura/types'
import { postList } from '../../data/posts'

defineProps<{
  responsive?: Partial<ResponsiveBreakpoints>
}>()
</script>

<template>
  <div class="not-prose">
    <div class="mb-4 max-h-50vh overflow-y-scroll border border-$oceanus-c-border-line p-4">
      <SakuraPostList :posts="postList" :responsive />
    </div>
  </div>
</template>
