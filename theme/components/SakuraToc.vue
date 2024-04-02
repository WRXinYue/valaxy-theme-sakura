<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
const { t } = useI18n()
</script>

<template>
  <h2 v-if="frontmatter.toc !== false" font="serif black">
    {{ t('sidebar.toc') }}
  </h2>
  <SakuraOutline v-if="frontmatter.toc !== false" />
  <div v-if="$slots.default" class="custom-container">
    <slot />
  </div>
</template>

<style lang="scss">
.toc-btn {
  color: var(--va-c-primary);
  background-color: white;
  z-index: var(--yun-z-toc-btn);
}
</style>
