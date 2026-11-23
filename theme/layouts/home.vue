<script lang="ts" setup>
import { defineWebPage, useSchemaOrg } from '@unhead/schema-org/vue'
import { useSiteConfig, useValaxyI18n } from 'valaxy'
import { computed, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { homeCategoryLink } from '../composables'
import { useSakuraAppStore } from '../stores'

const route = useRoute()
const router = useRouter()
const sakura = useSakuraAppStore()
const siteConfig = useSiteConfig()
const { $t } = useValaxyI18n()
const heading = computed(() => sakura.homeCategory === 'All'
  ? $t(siteConfig.value.title)
  : `${sakura.homeCategory} · ${$t(siteConfig.value.title)}`)

useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage' }),
])

const pageIndex = computed(() => Number.parseInt((route.params as { page: string }).page))

watch(() => route.query.category, (category) => {
  if (typeof category === 'string')
    sakura.homeCategory = category || 'All'
}, { immediate: true })

function selectCategory(category: string) {
  sakura.homeCategory = category
  router.replace({
    ...homeCategoryLink(category),
    query: { ...route.query, category },
  })
}

onBeforeRouteLeave(() => {
  const currentScroll = document.documentElement.scrollTop
  sakura.setScrollPosition(route.path, currentScroll)
})

watch(pageIndex, (value) => {
  sakura.curPage = value || 1
}, { immediate: true })
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
            <h1 id="sakura-home" class="sakura-home-anchor">
              <span class="sr-only">{{ heading }}</span>
            </h1>

            <div id="sakura-home-discovery" class="sakura-home-anchor">
              <slot name="post-list">
                <SakuraPostList :category="sakura.homeCategory" show-categories @update:category="selectCategory" />
              </slot>
            </div>
          </div>

          <slot name="pagination">
            <SakuraPagination v-if="sakura.homeCategory === 'All'" />
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
