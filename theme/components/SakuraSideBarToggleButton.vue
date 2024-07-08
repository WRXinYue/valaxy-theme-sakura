<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { useSakuraAppStore } from '../stores'

const { persistence, defaultOpen } = withDefaults(defineProps<{
  persistence?: boolean
  defaultOpen?: boolean
}>(), {
  persistence: false,
  defaultOpen: false,
})

const sakuraAppStore = useSakuraAppStore()

const sidebarOpen = useStorage('sidebarOpen', defaultOpen)

onMounted(() => {
  if (persistence)
    sakuraAppStore.rightSidebar.isOpen = sidebarOpen.value

  sidebarOpen.value = sakuraAppStore.rightSidebar.isOpen
})

watch(() => sakuraAppStore.rightSidebar.isOpen, (open) => {
  sidebarOpen.value = open
})
</script>

<template>
  <div class="sidebar-toggle" @click="sakuraAppStore.rightSidebar.toggle()">
    <slot :active="sakuraAppStore.rightSidebar.isOpen" />
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
