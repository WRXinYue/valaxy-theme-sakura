<script lang="ts" setup>
import { useAppStore } from 'valaxy'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'
import { checkRouteAgainstConditions } from '../utils'

const route = useRoute()
const app = useAppStore()
const themeConfig = useThemeConfig()

const isSidebarPushMode = ref(false)
const isSidebarShowOnPC = ref(false)

const sidebarPushModeClass = computed(() => {
  if (!app.isSidebarOpen)
    return
  if (isSidebarPushMode.value)
    return isSidebarShowOnPC.value ? 'pl-$va-sidebar-width' : '<md:pl-$va-sidebar-width'
  return ''
})

onMounted(() => {
  isSidebarPushMode.value = checkRouteAgainstConditions(route, themeConfig.value.sidebarPCOptions.pushMode)
  isSidebarShowOnPC.value = checkRouteAgainstConditions(route, themeConfig.value.sidebarPCOptions.enable)
})
</script>

<template>
  <div class="main-content-transition custom-background antialiased" :class="themeConfig.layout.nav === 'left-top' && sidebarPushModeClass">
    <slot name="nav-bar">
      <SakuraNavbar />
    </slot>

    <slot name="side-bar">
      <SakuraSidebar :show-hamburger="true" :class="!isSidebarShowOnPC && 'md:hidden'" />
    </slot>

    <main class="main-content-transition mx-auto" :class="themeConfig.layout.nav === 'top-left' && sidebarPushModeClass">
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

    <SakuraFooter :class="sidebarPushModeClass">
      <slot name="footer" />
    </SakuraFooter>
  </div>
</template>
