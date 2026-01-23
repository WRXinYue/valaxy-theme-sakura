<script setup lang="ts">
import { useFrontmatter, useLayout } from 'valaxy'
import { computed } from 'vue'
import { useThemeConfig } from '../composables'

const frontmatter = useFrontmatter()
const themeConfig = useThemeConfig()
const layout = useLayout()

const layoutConfig = computed(() => {
  const currentLayout = layout.value
  return themeConfig.value.layout?.[currentLayout as string] || themeConfig.value.layout?.general
})

const layoutMode = computed(() => {
  return layoutConfig.value?.layout || 'one-column'
})
</script>

<template>
  <ClientOnly>
    <Teleport to="#sakura-main-layout-before">
      <slot name="header">
        <SakuraPageHeader :fm="frontmatter" />
      </slot>
    </Teleport>
  </ClientOnly>

  <article class="sakura-page" :class="{ 'sakura-card': layoutMode === 'triple-columns' }" flex="~ col">
    <slot />
  </article>
</template>

<style lang="scss" scoped>
.sakura-page {
  min-height: 100%;
}
</style>
