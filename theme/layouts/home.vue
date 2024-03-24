<script lang="ts" setup>
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { useSakuraAppStore } from '../stores/app'

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
  <Layout>
    <div>
      <SakuraBannerCustom />

      <div class="md:w-800px m-auto min-w-300px">
        <slot name="article-pinned">
          <SakuraArticlePinnedCustom />
        </slot>

        <slot name="article-list">
          <SakuraArticleListCustom />
        </slot>

        <SakuraPaginationCustom />

        <RouterView />
      </div>
    </div>
  </Layout>
</template>
