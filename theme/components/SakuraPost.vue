<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <SakuraPage>
    <template #header>
      <SakuraPostHeader :fm="frontmatter" />
    </template>

    <div class="sakura-post sakura-safe-padding">
      <div class="sakura-post-content">
        <slot />
      </div>
    </div>
  </SakuraPage>
</template>

<style scoped>
.sakura-post {
  padding-block: 24px;
  min-width: 0;
}

.sakura-post-content {
  max-width: 800px;
  margin-inline: auto;
}

.sakura-post-content :deep(.markdown-body > .prose) {
  max-width: none;
}
</style>
