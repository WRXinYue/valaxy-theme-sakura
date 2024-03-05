<script lang="ts" setup>
import { useAppStore } from 'valaxy'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'
import { checkRouteAgainstConditions } from '../utils'

const route = useRoute()
const app = useAppStore()
const themeConfig = useThemeConfig()

const sidebarPushModeClass = computed(() => {
  if (!app.isSidebarOpen)
    return
  const isSidebarPushMode = checkRouteAgainstConditions(route, themeConfig.value.sidebarPushMode)
  return isSidebarPushMode ? 'pl-$va-sidebar-width' : '<md:pl-$va-sidebar-width'
})

const layoutClass = computed(() => {
  const isSidebarShowOnPC = checkRouteAgainstConditions(route, themeConfig.value.sidebarShowOnPC)
  return isSidebarShowOnPC
})
</script>

<template>
  <div class="sakura-main custom-background antialiased" :class="sidebarPushModeClass">
    <main class="mx-auto">
      <SakuraNavbar />
      <div v-if="layoutClass" :class="!themeConfig.sidebarShowOnPC && 'md:hidden'">
        <slot name="side-bar">
          <SakuraSidebar :show-hamburger="true" />
        </slot>
      </div>
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

    <template v-if="themeConfig.showBackToTop">
      <SakuraToTop class="<md:hidden" />
    </template>

    <SakuraFooter>
      <slot name="footer" />
    </SakuraFooter>
  </div>
</template>
