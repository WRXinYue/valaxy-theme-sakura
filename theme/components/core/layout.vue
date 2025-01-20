<script lang="ts" setup>
import { useLayout } from 'valaxy'
import { useThemeConfig } from '../../composables'
import { useSakuraAppStore } from '../../stores'

const sakuraAppStore = useSakuraAppStore()
const themeConfig = useThemeConfig()
const layout = useLayout()
</script>

<template>
  <!-- NOTE: Avoid placing sakura-sidebar-offset at the top; it affects absolute positioning -->
  <div
    class="app-container custom-background antialiased"
    :class="`has-${layout}-layout`"
    :style="sakuraAppStore.sidebar.isOpen ? (
      themeConfig.sidebarOptions?.position === 'left'
        ? '--sakura-private-sidebar-offset: var(--sakura-sidebar-offset)'
        : '--sakura-private-sidebar-offset: calc(var(--sakura-sidebar-offset) * -1)'
    ) : ''"
  >
    <slot name="scroll-indicator">
      <SakuraScrollIndicator v-if="themeConfig.scrollIndicator" />
    </slot>

    <slot name="navbar">
      <SakuraNavbar class="sakura-sidebar-offset" />
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
      <SakuraScrollToTop v-if="themeConfig.scrollToTop && (themeConfig.scrollToTop === 'cord' || themeConfig.scrollToTop === true)" />
    </slot>

    <slot name="footer">
      <SakuraFooter class="sakura-sidebar-offset" />
    </slot>

    <!-- <SakuraChangSkin /> -->
  </div>
</template>

<style lang="scss" scoped>
// translation navbar
.sakura-sidebar-offset {
  transform: translateX(var(--sakura-private-sidebar-offset));
  transition: transform var(--va-transition-duration)
    cubic-bezier(0.19, 1, 0.22, 1);
}
</style>
