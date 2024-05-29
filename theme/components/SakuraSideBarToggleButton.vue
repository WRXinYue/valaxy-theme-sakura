<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useAppStore } from 'valaxy'
import { useStorage } from '@vueuse/core'

const { persistence, defaultOpen } = withDefaults(defineProps<{
  persistence?: boolean
  defaultOpen?: boolean
}>(), {
  persistence: false,
  defaultOpen: false,
})

const app = useAppStore()

const sidebarOpen = useStorage('sidebarOpen', defaultOpen)

onMounted(() => {
  if (persistence)
    app.isSidebarOpen = sidebarOpen.value

  sidebarOpen.value = app.isSidebarOpen
})

watch(() => app.isSidebarOpen, (open) => {
  sidebarOpen.value = open
})
</script>

<template>
  <div class="sidebar-toggle" @click="app.toggleSidebar()">
    <slot :active="app.isSidebarOpen" />
  </div>
</template>

<style lang="scss">
.sidebar.open {
  grid-template-columns: 250px 1fr 250px !important;
}

.sidebar {
  grid-template-columns: 0 1fr 250px !important;
}
</style>
