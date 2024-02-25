<script lang="ts" setup>
import { useAppStore, useLayout } from 'valaxy'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useSakuraAppStore } from '../stores/app'

const app = useAppStore()
const route = useRoute()
const isHome = useLayout('home')

onBeforeRouteLeave(() => {
  const currentScroll = document.documentElement.scrollTop
  const sakura = useSakuraAppStore()
  sakura.setScrollPosition(route.path, currentScroll)
})
</script>

<template>
  <Layout class="sakura-main" :class="(isHome && !app.isSidebarOpen) ? 'pl-0' : '<md:pl-$va-sidebar-width'">
    <div>
      <SakuraBanner />

      <slot>
        <RouterView />
      </slot>
    </div>
  </Layout>
</template>
