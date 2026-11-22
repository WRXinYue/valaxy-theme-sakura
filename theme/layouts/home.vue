<script lang="ts" setup>
import { computed, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useSakuraAppStore } from '../stores'

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
    <SakuraIntro />
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
          <div class="sakura-home-layout sakura-site-content sakura-safe-padding w-full">
            <div id="sakura-home" class="sakura-home-anchor" />

            <div id="sakura-home-discovery" class="sakura-home-anchor">
              <slot name="post-list">
                <SakuraPostList show-categories />
              </slot>
            </div>
          </div>

          <slot name="pagination">
            <SakuraPagination />
          </slot>
        </div>
      </template>
    </component>
  </RouterView>
</template>

<style lang="scss" scoped>
.sakura-home {
  padding-top: var(--sakura-navbar-height);
}

.sakura-home-anchor {
  min-height: 1px;
  scroll-margin-top: calc(var(--sakura-navbar-height) + 16px);
}

#sakura-home-discovery {
  max-width: 1120px;
  margin-inline: auto;
}
</style>
