<script setup lang="ts">
import type { ResponsiveBreakpoints } from 'valaxy-theme-sakura/types'
import { postList } from '../../data/posts'

const responsive: Partial<ResponsiveBreakpoints> = {
  'xl': 2,
  '2xl': 3,
}
</script>

<template>
  <div class="not-prose">
    <SakuraPostList :posts="postList" :responsive />
  </div>
</template>
