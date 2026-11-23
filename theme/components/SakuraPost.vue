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
        <SakuraOutline
          v-if="frontmatter.toc !== false && frontmatter.outline !== false"
          class="sakura-post-inline-toc"
          collapsible
          view-scroll
        />
        <slot />
      </div>
    </div>
  </SakuraPage>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-post {
  padding-block: 24px;
  min-width: 0;
}

.sakura-post-content {
  max-width: var(--sakura-article-width, 800px);
  margin-inline: auto;
}

.sakura-post-content :deep(.markdown-body) {
  overflow-wrap: anywhere;
}

.sakura-post-content :deep(.markdown-body > .prose) {
  max-width: none;
}

.sakura-post-content :deep(.markdown-body .table-container) {
  overflow-x: auto;
}

.sakura-post-inline-toc {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--sakura-color-divider);
  border-radius: var(--sakura-radius);
}

@include screen('lg') {
  :global(.sakura-triple-columns-layout .sakura-post-inline-toc) {
    display: none;
  }
}

@include screen('xl') {
  :global(.sakura-two-columns-right-layout .sakura-post-inline-toc) {
    display: none;
  }
}
</style>
