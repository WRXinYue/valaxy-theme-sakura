<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
const { t } = useI18n()
</script>

<template>
  <aside text="center" class="sakura-aside">
    <div class="aside-container">
      <h2 v-if="frontmatter.toc !== false" font="serif black">
        {{ t('sidebar.toc') }}
      </h2>
      <SakuraOutline v-if="frontmatter.toc !== false" />
      <div v-if="$slots.default" class="custom-container">
        <slot />
      </div>
    </div>
  </aside>
</template>

<style lang="scss">
.sakura-aside {
  position: sticky;
  top: 120px;
  width: var(--st-c-aside-width);
  transition: box-shadow var(--va-transition-duration),
  background-color var(--va-transition-duration), opacity 0.25s,
  transform var(--va-transition-duration) cubic-bezier(0.19, 1, 0.22, 1),
  top var(--va-transition-duration);
}

.toc-btn {
  color: var(--va-c-primary);
  background-color: white;
  z-index: var(--yun-z-toc-btn);
}
</style>
