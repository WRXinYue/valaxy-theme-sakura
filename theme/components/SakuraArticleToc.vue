<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useAppStore, useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
const { t } = useI18n()
const app = useAppStore()
</script>

<template>
  <button
    class="xl:hidden toc-btn shadow fixed yun-icon-btn"
    opacity="75" right="2" bottom="19"
    @click="app.toggleRightSidebar()"
  >
    <div i-ri-file-list-line />
  </button>

  <ValaxyOverlay :show="app.isRightSidebarOpen" @click="app.toggleRightSidebar()" />

  <aside :class="{ open: app.isRightSidebarOpen }" text="center" class="w-$st-c-aside-width">
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

<style lang="scss" scoped>
aside {
  position: sticky;
  top: 120px;
  // need fixed width
  // width: var(--va-sidebar-width, 300px);
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
