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
        <slot>
          <RouterView />
        </slot>
      </div>
    </div>
  </Layout>
</template>
