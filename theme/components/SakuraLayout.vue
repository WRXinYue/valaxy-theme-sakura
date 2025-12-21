<script setup lang="ts">
import type { SakuraLayoutSidebarItem, SidebarComponent } from '../types'
import { useLayout } from 'valaxy'
import { computed } from 'vue'
import { useThemeConfig } from '../composables'

import SakuraAside from './SakuraAside.vue'
import SakuraSidebarCategories from './SakuraSidebarCategories.vue'
import SakuraSidebarLatestComments from './SakuraSidebarLatestComments.vue'
import SakuraSidebarLatestPosts from './SakuraSidebarLatestPosts.vue'
import SakuraSidebarLinks from './SakuraSidebarLinks.vue'
import SakuraSidebarMusic from './SakuraSidebarMusic.vue'
// Import sidebar components for dynamic resolution
import SakuraSidebarSiteInfo from './SakuraSidebarSiteInfo.vue'
import SakuraSidebarTags from './SakuraSidebarTags.vue'
import SakuraToc from './SakuraToc.vue'

const props = defineProps<{ class?: string, base?: boolean }>()

const themeConfig = useThemeConfig()
const layout = useLayout()

const componentMap: Record<string, any> = {
  SakuraSidebarSiteInfo,
  SakuraSidebarCategories,
  SakuraSidebarTags,
  SakuraSidebarLinks,
  SakuraSidebarMusic,
  SakuraSidebarLatestPosts,
  SakuraSidebarLatestComments,
}

function normalize(item: SidebarComponent | SakuraLayoutSidebarItem): SakuraLayoutSidebarItem {
  if (typeof item === 'string') {
    return { component: componentMap[item] || item }
  }
  if (typeof item === 'object' && !('component' in item)) {
    return { component: item as SidebarComponent }
  }
  if (typeof item === 'object' && 'component' in item) {
    if (typeof item.component === 'string' && componentMap[item.component]) {
      return { ...item, component: componentMap[item.component] }
    }
  }
  return item as SakuraLayoutSidebarItem
}

const layoutConfig = computed(() => {
  const currentLayout = layout.value
  return themeConfig.value.layout?.[currentLayout as string] || themeConfig.value.layout?.general
})

const layoutMode = computed(() => {
  return layoutConfig.value?.layout || 'one-column'
})

const leftSidebar = computed(() => {
  const config = layoutConfig.value?.sidebar?.left
  return (config || []).map(normalize).filter((i: SakuraLayoutSidebarItem) => i.enable !== false)
})

const rightSidebar = computed(() => {
  const config = layoutConfig.value?.sidebar?.right
  return (config || []).map(normalize).filter((i: SakuraLayoutSidebarItem) => i.enable !== false)
})

const showLeft = computed(() => {
  if (layoutMode.value === 'triple-columns' || layoutMode.value === 'two-columns-left')
    return true
  if (layoutMode.value === 'two-columns-right' || layoutMode.value === 'one-column')
    return false
  return leftSidebar.value.length > 0
})

const showRight = computed(() => {
  if (layoutMode.value === 'triple-columns' || layoutMode.value === 'two-columns-right')
    return true
  if (layoutMode.value === 'two-columns-left' || layoutMode.value === 'one-column')
    return false
  return rightSidebar.value.length > 0
})
</script>

<template>
  <SakuraMultiColumns
    class="sakura-layout"
    :class="[
      props.class,
      `sakura-${layoutMode}-layout`,
    ]"
    :base="props.base"
  >
    <template v-if="showLeft" #left>
      <slot name="left">
        <component
          :is="item.component"
          v-for="(item, index) in leftSidebar"
          :key="index"
          v-bind="item.props"
        />
      </slot>
    </template>

    <template #default>
      <slot />
    </template>

    <template v-if="showRight" #right>
      <slot name="right">
        <template v-if="layout === 'post'">
          <SakuraAside>
            <SakuraToc />
          </SakuraAside>
        </template>
        <component
          :is="item.component"
          v-for="(item, index) in rightSidebar"
          :key="index"
          v-bind="item.props"
        />
      </slot>
    </template>
  </SakuraMultiColumns>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-layout {
  display: grid;
  width: 100%;
  max-width: 1536px;
  margin: 0 auto;
  transition:
    grid-template-columns 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    gap 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  aside {
    align-self: start;
    position: sticky;
    top: calc(var(--sakura-navbar-height, 64px) + 1.5rem);
    transition: top 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &.sakura-triple-columns-layout {
    grid-template-columns: 100%;
    gap: 1.5rem;

    aside {
      display: none;
    }

    @include screen('md') {
      grid-template-columns: 1fr;
    }

    @include screen('lg') {
      grid-template-columns: 240px 1fr 240px;

      aside {
        display: block;
      }
    }

    @include screen('xl') {
      grid-template-columns: 280px 1fr 280px;
    }
  }

  &.sakura-two-columns-right-layout {
    gap: 1.5rem;

    aside {
      display: none;
    }

    @include screen('md') {
      grid-template-columns: 1fr;
    }

    @include screen('lg') {
      grid-template-columns: 1fr 280px;

      aside {
        display: block;
      }
    }

    @include screen('xl') {
      grid-template-columns: 1fr 300px;
    }

    @include mobile {
      gap: 0;
    }
  }
}

// .sakura-post-layout {
//   &.sakura-triple-columns {
//     @include screen('md') {
//       grid-template-columns: 150px minmax(0, 800px) 150px !important;
//     }

//     @include screen('lg') {
//       grid-template-columns: 250px minmax(0, 800px) 250px !important;
//     }
//   }
// }
</style>
