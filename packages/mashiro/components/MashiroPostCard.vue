<script setup lang="ts">
import SakuraPostCard from 'valaxy-theme-sakura/components/SakuraPostCard.vue'
import MashiroDots from './MashiroDots.vue'
</script>

<template>
  <SakuraPostCard>
    <template #content-extend>
      <div class="mashiro-dots-container absolute!">
        <MashiroDots />
      </div>
    </template>
  </SakuraPostCard>
</template>

<style lang="scss">
.sakura-post-card {
  .mashiro-dots-container {
    bottom: var(--sakura-post-card-content-px);
  }

  &.flex-row-reverse {
    .mashiro-dots-container {
      left: var(--sakura-post-card-content-px);
    }
  }

  &:not(.flex-row-reverse) {
    .mashiro-dots-container {
      right: var(--sakura-post-card-content-px);
    }
  }

  .sakura-post-card-title {
    padding: 10px 0;
  }

  .sakura-post-card-meta {
    order: 2;
    padding-bottom: 10px;
  }
}
</style>
