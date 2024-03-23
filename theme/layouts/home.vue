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
          <div class="<md:hidden">
            <div class="pt-24px px-20px flex items-center text-$st-c-text">
              <div i-fa6-solid:anchor class="mr-1" /> START:DASH!!
            </div>
            <hr>
            <SakuraArticlePinnedCustom />
          </div>
        </slot>

        <slot name="article-list">
          <div class="pt-24px px-20px flex items-center text-$st-c-text">
            <div i-fa6-solid:water class="mr-1" /> 文章列表
          </div>
          <hr>
          <SakuraArticleListCustom />
        </slot>

        <SakuraPaginationCustom />

        <RouterView />
      </div>
    </div>
  </Layout>
</template>
