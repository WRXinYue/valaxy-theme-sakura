<script lang="ts" setup>
import type { PostFrontMatter } from 'valaxy'
import type { SakuraImageCardProps } from '../types'

defineProps<{
  fm: PostFrontMatter
  imageCard?: SakuraImageCardProps
}>()
</script>

<template>
  <SakuraPageHeader :fm class="sakura-post-header" :image-card="imageCard">
    <SakuraPostHeaderMeta :fm />
  </SakuraPageHeader>
</template>
