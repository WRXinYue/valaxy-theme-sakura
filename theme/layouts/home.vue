<script lang="ts" setup>
import { computed, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useThemeConfig } from '../composables'
import { useSakuraAppStore } from '../stores'

const themeConfig = useThemeConfig()
const route = useRoute()
const sakura = useSakuraAppStore()
const pageIndex = computed(() => Number.parseInt((route.params as { page: string }).page))

onBeforeRouteLeave(() => {
  const currentScroll = document.documentElement.scrollTop
  sakura.setScrollPosition(route.path, currentScroll)
})

watch(() => pageIndex.value, async (value) => {
  sakura.curPage = value
})
</script>

<template>
  <ClientOnly>
    <Teleport to="#sakura-main-layout-before">
      <slot name="hero">
        <SakuraHero />
      </slot>
    </Teleport>
  </ClientOnly>
  <RouterView v-slot="{ Component }">
    <component :is="Component">
      <template #main-content>
        <div class="sakura-home" flex="~ col center">
          <div class="sakura-safe-padding sakura-home-layout sakura-site-content" base>
            <slot name="notice-board">
              <SakuraNoticeBoard />
            </slot>

            <slot name="post-pinned">
              <SakuraPinnedPost v-if="themeConfig.pinnedPost" />
            </slot>

            <slot name="post-list">
              <SakuraPostList />
            </slot>
          </div>

          <slot name="pagination">
            <SakuraPagination />
          </slot>
        </div>
      </template>
    </component>
  </RouterView>
</template>
