<script lang="ts" setup>
import { useSakuraAppStore } from '../../stores'
import { useThemeConfig } from '../../composables'

const sakuraAppStore = useSakuraAppStore()
const themeConfig = useThemeConfig()
</script>

<template>
  <!-- NOTE: Avoid placing sakura-sidebar-offset at the top; it affects absolute positioning -->
  <div
    class="app-container custom-background antialiased"
    :style="sakuraAppStore.sidebar.isOpen ? (
      themeConfig.sidebarOptions?.position === 'left'
        ? '--sakura-private-sidebar-offset: var(--st-c-sidebar-offset)'
        : '--sakura-private-sidebar-offset: calc(var(--st-c-sidebar-offset) * -1)'
    ) : ''"
  >
    <slot name="nav-bar">
      <SakuraNavbarCustom class="sakura-sidebar-offset" />
    </slot>

    <main class="sakura-sidebar-offset sakura-main">
      <slot>
        <RouterView v-slot="{ Component }">
          <component :is="Component">
            <template #main-header>
              <slot name="main-header" />
            </template>

            <template #main-header-after>
              <slot name="main-header-after" />
            </template>
            <template #main>
              <slot name="main" />
            </template>
            <template #main-content>
              <slot name="main-content" />
            </template>
            <template #main-content-after>
              <slot name="main-content-after" />
            </template>
            <template #main-nav-before>
              <slot name="main-nav-before" />
            </template>
            <template #main-nav-after>
              <slot name="main-nav-after" />
            </template>
            <template #aside-custom>
              <slot name="aside-custom" />
            </template>
            <template #footer>
              <slot name="footer" />
            </template>
          </component>
        </RouterView>
      </slot>
    </main>

    <slot name="to-top">
      <SakuraToTop />
    </slot>

    <slot name="footer">
      <SakuraFooterCustom class="sakura-sidebar-offset" />
    </slot>
  </div>
</template>
