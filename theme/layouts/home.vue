<script setup>
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
    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      <SakuraHeader />

      <slot>
        <RouterView />
      </slot>
    </div>
  </Layout>
</template>
