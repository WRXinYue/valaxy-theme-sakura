<script lang="ts" setup>
import { useAppStore } from 'valaxy'
import { computed } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'

const route = useRoute()
const app = useAppStore()
const themeConfig = useThemeConfig()

const layoutClass = computed(() => {
  if (!app.isSidebarOpen)
    return

  let isCurrentRouter = false
  if (themeConfig.value.sidebarPushMode === true) {
    isCurrentRouter = true
  }
  else if (typeof themeConfig.value.sidebarPushMode === 'string') {
    isCurrentRouter = checkCurrentRouter(route, themeConfig.value.sidebarPushMode)
  }
  else if (Array.isArray(themeConfig.value.sidebarPushMode)) {
    for (const entry of themeConfig.value.sidebarPushMode) {
      isCurrentRouter = checkCurrentRouter(route, entry)
      if (isCurrentRouter)
        break
    }
  }

  if (themeConfig.value.sidebarPushMode && isCurrentRouter) {
    if (!themeConfig.value.sidebarShowOnPC)
      return '<md:pl-$va-sidebar-width'
    return 'pl-$va-sidebar-width'
  }
  else { return 'pl-0' }
})

function checkCurrentRouter(route: RouteLocationNormalizedLoaded, path: string) {
  if (path === 'home')
    return route.path.replace(/index.html$/, '') === '/'
  return route.path.includes(`/${path}`)
}
</script>

<template>
  <div class="sakura-main custom-background antialiased" :class="layoutClass">
    <main class="mx-auto">
      <SakuraNavbar />
      <div :class="!themeConfig.sidebarShowOnPC && 'md:hidden'">
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
