<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'

const siteConfig = useSiteConfig()
</script>

<template>
  <div class="links-of-author">
    <a v-for="item, i in siteConfig.social" :key="i" class="sakura-icon-btn links-of-author-item" rel="noopener" :href="item.link" :title="item.name" target="_blank" :style="`color:${item.color}`">
      <div class="icon" :class="item.icon" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.links-of-author {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .icon {
    width: 1.2rem;
    height: 1.2rem;
  }

  &-item {
    line-height: 1;
    font-size: 0.9rem;
  }
}
</style>
