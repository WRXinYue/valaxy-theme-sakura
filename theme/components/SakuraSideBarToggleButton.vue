<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { useSakuraAppStore } from '../stores'

const { persistence, initialState } = withDefaults(defineProps<{
  persistence?: boolean
  initialState?: boolean
}>(), {
  persistence: false,
  initialState: false,
})

const sakuraAppStore = useSakuraAppStore()

const sidebarOpen = useStorage('sidebarOpen', initialState)

onMounted(() => {
  if (persistence)
    sakuraAppStore.sidebar.isOpen = sidebarOpen.value

  sidebarOpen.value = sakuraAppStore.sidebar.isOpen
})

watch(() => sakuraAppStore.sidebar.isOpen, (open) => {
  sidebarOpen.value = open
})
</script>

<template>
  <div class="sidebar-toggle" @click="sakuraAppStore.sidebar.toggle()">
    <slot :active="sakuraAppStore.sidebar.isOpen" />
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
