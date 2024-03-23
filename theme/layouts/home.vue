<script lang="ts" setup>
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useSakuraAppStore } from '../stores/app'

const route = useRoute()
const sakura = useSakuraAppStore()

onBeforeRouteLeave(() => {
  const currentScroll = document.documentElement.scrollTop
  sakura.setScrollPosition(route.path, currentScroll)
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

        <RouterView />
      </div>
    </div>
  </Layout>
</template>
