<script lang="ts" setup>
import { useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <div class="antialiased custom-background">
    <main class="mx-auto">
      <SakuraNavbar />
      <div class="md:hidden">
        <SakuraSidebar :show-hamburger="true" />
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
