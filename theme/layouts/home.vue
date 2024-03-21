<script lang="ts" setup>
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useSakuraAppStore } from '../stores/app'
import { useThemeConfig } from '../composables'

const route = useRoute()
const sakura = useSakuraAppStore()
const themeConfig = useThemeConfig()

onBeforeRouteLeave(() => {
  const currentScroll = document.documentElement.scrollTop
  sakura.setScrollPosition(route.path, currentScroll)
})
</script>

<template>
  <Layout>
    <div>
      <SakuraBanner :banner="themeConfig.banner" />
      <div class="md:w-800px m-auto min-w-300px">
        <slot>
          <RouterView />
        </slot>
      </div>
    </div>
  </Layout>
</template>
