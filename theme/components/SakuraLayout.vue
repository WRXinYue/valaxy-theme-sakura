<script setup lang="ts">
import type { SakuraLayoutSidebarItem, SidebarComponent } from '../types'
import { useFrontmatter, useLayout } from 'valaxy'
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
const frontmatter = useFrontmatter()
const showPostToc = computed(() => layout.value === 'post' && frontmatter.value.toc !== false && frontmatter.value.outline !== false)

const componentMap: Record<string, any> = {
  SakuraSidebarSiteInfo,
  SakuraSidebarCategories,
  SakuraSidebarTags,
  SakuraSidebarLinks,
  SakuraSidebarMusic,
  SakuraSidebarLatestPosts,
  SakuraSidebarLatestComments,
  SakuraSidebarToc: SakuraToc,
  SakuraToc,
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
  return layoutConfig.value?.layout || (showPostToc.value ? 'two-columns-right' : 'one-column')
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
          v-animate-on-view
          :style="{ 'animation-delay': `${index * 0.1}s`, 'animation-fill-mode': 'both' }"
        />
      </slot>
    </template>

    <template #default>
      <slot />
    </template>

    <template v-if="showRight" #right>
      <slot name="right">
        <template v-if="showPostToc">
          <SakuraAside>
            <SakuraToc class="sakura-fade-in-up" style="animation-fill-mode: both;" />
          </SakuraAside>
        </template>
        <component
          :is="item.component"
          v-for="(item, index) in rightSidebar"
          :key="index"
          v-bind="item.props"
          v-animate-on-view
          :style="{ 'animation-delay': `${index * 0.1}s`, 'animation-fill-mode': 'both' }"
        />
      </slot>
    </template>
  </SakuraMultiColumns>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-layout,
.sakura-post-header > .sakura-header-grid {
  display: grid;
  grid-template-columns: var(--sakura-article-columns, minmax(0, 1fr));
  gap: var(--sakura-article-column-gap, 0);
  width: 100%;
  max-width: 1536px;
  margin: 0 auto;
}

@include screen('lg') {
  .sakura-main:has(> .sakura-two-columns-right-layout),
  .sakura-two-columns-right-layout {
    --sakura-article-columns: minmax(0, 1fr) 280px;
  }

  .sakura-main:has(> .sakura-triple-columns-layout),
  .sakura-triple-columns-layout {
    --sakura-article-columns: 240px minmax(0, 1fr) 240px;
    --sakura-article-column: 2;
  }

  .sakura-main:has(> :is(.sakura-two-columns-right-layout, .sakura-triple-columns-layout)),
  .sakura-layout:is(.sakura-two-columns-right-layout, .sakura-triple-columns-layout) {
    --sakura-article-column-gap: var(--sakura-layout-mt);
  }
}

@include screen('xl') {
  .sakura-main:has(> .sakura-two-columns-right-layout),
  .sakura-two-columns-right-layout {
    --sakura-article-columns: minmax(0, 1fr) 300px;
  }

  .sakura-main:has(> .sakura-triple-columns-layout),
  .sakura-triple-columns-layout {
    --sakura-article-columns: 280px minmax(0, 1fr) 280px;
  }
}

.sakura-layout {
  transition:
    grid-template-columns 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    gap 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  > div {
    min-width: 0;
  }

  aside {
    align-self: start;
    position: sticky;
    top: calc(var(--sakura-navbar-height, 64px) + var(--sakura-layout-mt));
    transition: top 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    gap: var(--sakura-layout-mt);
  }

  &.sakura-triple-columns-layout {
    gap: var(--sakura-layout-mt);
    margin-top: var(--sakura-layout-mt);

    aside {
      display: none;
    }

    @include screen('lg') {
      aside {
        display: flex;
      }
    }
  }

  &.sakura-two-columns-right-layout {
    gap: var(--sakura-layout-mt);

    aside {
      display: none;
    }

    @include screen('lg') {
      aside {
        display: flex;
      }
    }

    @include mobile {
      gap: 0;
    }
  }
}

.has-post-layout {
  .sakura-main:has(> .sakura-two-columns-right-layout),
  .sakura-layout.sakura-two-columns-right-layout {
    --sakura-article-columns: minmax(0, 1fr);
    --sakura-article-column-gap: 0px;
  }

  .sakura-layout.sakura-two-columns-right-layout {
    gap: 0;

    > aside {
      display: none;
    }

    @include screen('xl') {
      > div,
      > aside {
        grid-area: 1 / 1;
      }

      > aside {
        display: flex;
        justify-self: end;
        width: max(0px, calc((100% - var(--sakura-article-width, 800px)) / 2 - var(--sakura-layout-mt) - 20px));
        min-width: 0;
        margin-inline-end: 20px;
      }
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
