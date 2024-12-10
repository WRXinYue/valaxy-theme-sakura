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
  <SakuraHomeLayout />
</template>
